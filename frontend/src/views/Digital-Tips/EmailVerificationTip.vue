<template>
  <div class="tip-root">
    <header class="intro">
      <h3>Email Verification Tip</h3>
      <p>Verification messages don’t always hit the Inbox. Use folders or search to find the <em>latest</em> code, then verify.</p>
      <ul class="practice-tips">
        <li>In real life it can take up to a minute for the email to arrive—check again and try <strong>Resend</strong> if needed.</li>
        <li>Look in <strong>Promotions</strong> or <strong>Spam</strong> if it isn’t in Inbox; move it to Inbox once found.</li>
        <li>Use search terms like: <code>verify</code>, <code>code</code>, or your site’s name.</li>
      </ul>
    </header>

    <section class="controls">
      <label class="input-wrap">
        <span class="help">Search your mail</span>
        <input v-model="query" class="input" type="text" placeholder="e.g., verify, code, YourShop" />
      </label>

      <div class="btns">
        <button class="btn" @click="resend" :disabled="cooldown>0">
          Resend code <span v-if="cooldown">({{ cooldown }}s)</span>
        </button>
        <button class="btn ghost" @click="resetPractice">Reset practice</button>
      </div>

      <label class="tog">
        <input type="checkbox" v-model="showAllMail" />
        Show “All Mail”
      </label>
    </section>

    <nav class="tabs">
      <button v-for="t in displayTabs" :key="t.key" class="tab" :class="{active: tab===t.key}" @click="tab=t.key">
        {{ t.label }}
      </button>
    </nav>

    <section class="list">
      <div v-for="m in filteredMessages" :key="m.id" class="msg" @click="open(m)">
        <div class="left">
          <div class="from">{{ m.from }}</div>
          <div class="subject">
            {{ m.subject }}
            <span v-if="m.isVerification && m.expired" class="chip expired">Expired</span>
            <span v-else-if="m.isVerification" class="chip new">Verify</span>
          </div>
          <div class="preview">{{ m.preview }}</div>
        </div>
        <div class="right">
          <div class="folder" :class="m.folder.toLowerCase()">{{ m.folder }}</div>
        </div>
      </div>
      <p v-if="filteredMessages.length===0" class="empty">No messages found here.</p>
    </section>

    <section v-if="opened" class="opened">
      <header class="opened-head">
        <h4>{{ opened.subject }}</h4>
        <small>From {{ opened.from }} · {{ opened.folder }}</small>
      </header>

      <template v-if="opened.isVerification">
        <p>Thanks for signing up! Your verification code is:</p>
        <p class="code">
          {{ opened.code }}
          <button class="btn-link" @click="copy(opened.code)">Copy</button>
          <span v-if="opened.expired" class="note">This code is expired. Use the most recent email.</span>
        </p>
      </template>
      <template v-else>
        <p>{{ opened.body }}</p>
      </template>

      <div class="actions">
        <button v-if="opened.folder!=='Inbox'" class="btn" @click="moveToInbox(opened)">Move to Inbox</button>
        <button class="btn" @click="closeOpened">Close</button>
      </div>

      <div class="verify">
        <input v-model="entered" class="input" placeholder="Enter latest code" />
        <button class="btn primary" @click="check">Verify</button>
        <p v-if="ok" class="ok">✅ Verified! You found the latest email and entered the correct code.</p>
        <p v-else-if="entered && okTried && !ok" class="err">That code didn’t match the latest email. Try again or resend.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Tabs
const BASE_TABS = [
  { key: 'Inbox', label: 'Inbox' },
  { key: 'Promotions', label: 'Promotions' },
  { key: 'Spam', label: 'Spam' },
  { key: 'All', label: 'All Mail' },
]

// Weighted folder distribution
const FOLDER_WEIGHTS = [
  { key: 'Inbox', w: 0.55 },
  { key: 'Promotions', w: 0.25 },
  { key: 'Spam', w: 0.20 },
]

const RESEND_COOLDOWN_SECS = 20

// State
const tab = ref('Inbox')
const query = ref('')
const showAllMail = ref(false)

const cooldown = ref(0)
let tick = null

const messages = ref([])
const opened = ref(null)

const latestCode = ref(generateCode())
const entered = ref('')
const ok = ref(false)
const okTried = ref(false)

// Helpers
function generateCode() {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return (buf[0] % 1_000_000).toString().padStart(6, '0')
}

function pickFolderWeighted() {
  const r = Math.random()
  let acc = 0
  for (const { key, w } of FOLDER_WEIGHTS) {
    acc += w
    if (r <= acc) return key
  }
  return 'Inbox'
}

function seedMailbox() {
  messages.value = [
    { id: 1, from: 'Receipts', subject: 'Your April statement', preview: 'Statement is ready', folder: 'Inbox', body: 'Statement details...' },
    { id: 2, from: 'Deals Today', subject: 'Flash sale ends tonight', preview: 'Save 30% on…', folder: 'Promotions', body: 'Hot deals…' },
    { id: 3, from: 'News', subject: 'Weekly digest', preview: 'This week in…', folder: 'Inbox', body: 'News content…' },
  ]
  injectVerificationEmail('Verify your email to finish signup', latestCode.value, true)
}

function injectVerificationEmail(subject, code, newEmail = false) {
  if (newEmail) {
    messages.value.forEach(m => { if (m.isVerification) m.expired = true })
  }
  const folder = pickFolderWeighted()
  const id = Date.now() + Math.floor(Math.random() * 1000)
  messages.value.push({
    id,
    from: 'YourShop',
    subject,
    preview: `Use code ${code}`,
    folder,
    isVerification: true,
    expired: false,
    code,
  })
}

function open(m) { opened.value = m }
function closeOpened() { opened.value = null }
function moveToInbox(m) { m.folder = 'Inbox' }
function copy(text) { navigator.clipboard?.writeText(text) }

function check() {
  okTried.value = true
  ok.value = entered.value.trim() === latestCode.value
}

function resend() {
  if (cooldown.value > 0) return
  cooldown.value = RESEND_COOLDOWN_SECS
  latestCode.value = generateCode()
  injectVerificationEmail('Verify your email (new code)', latestCode.value, true)
}

function resetPractice() {
  // clear timers
  if (tick) { clearInterval(tick); tick = null }
  // reset state
  tab.value = 'Inbox'
  showAllMail.value = false
  query.value = ''
  opened.value = null
  entered.value = ''
  ok.value = false
  okTried.value = false
  cooldown.value = 0
  latestCode.value = generateCode()
  seedMailbox()
  // restart cooldown ticker
  tick = setInterval(() => { if (cooldown.value > 0) cooldown.value -= 1 }, 1000)
}

// Derived
const displayTabs = computed(() => showAllMail.value ? BASE_TABS : BASE_TABS.filter(t => t.key !== 'All'))

const filteredMessages = computed(() => {
  let list = messages.value
  if (tab.value !== 'All') list = list.filter(m => m.folder === tab.value)
  if (query.value.trim()) {
    const q = query.value.trim().toLowerCase()
    list = list.filter(m =>
      (m.subject + ' ' + m.from + ' ' + (m.preview || '')).toLowerCase().includes(q)
    )
  }
  return list.slice().reverse()
})

// Lifecycle
onMounted(() => {
  seedMailbox()
  tick = setInterval(() => { if (cooldown.value > 0) cooldown.value -= 1 }, 1000)
})
onBeforeUnmount(() => { if (tick) clearInterval(tick) })
</script>

<style scoped>
.tip-root { display: grid; gap: 16px; }

.intro h3 { margin: 0 0 4px; }
.practice-tips { margin: 6px 0 0; padding-left: 18px; color:#374151; }
.practice-tips li { margin: 2px 0; }

.controls {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: end;
}
.input-wrap { width: clamp(280px, 34%, 560px); display: grid; gap: 6px; }
.help { font-size: 12px; color: #6b7280; }
.input { padding:10px 12px; border:1px solid #e5e7eb; border-radius:10px; width:100%; }
.input::placeholder { font-size: 12px; color:#9ca3af; }
.btns { display:flex; gap:8px; }
.btn { border:0; padding:10px 12px; border-radius:10px; background:#e0e7ff; cursor:pointer; }
.btn.ghost { background:#f3f4f6; }
.btn[disabled] { opacity:.5; cursor:not-allowed; }
.tog { display:flex; align-items:center; gap:8px; font-size:14px; color:#374151; }

.tabs { display:flex; gap:6px; flex-wrap: wrap; }
.tab { border:0; padding:8px 10px; border-radius:999px; background:#f3f4f6; cursor:pointer; }
.tab.active { background:#dbeafe; }

.list { display:grid; gap:8px; }
.msg { padding:10px; border:1px solid #e5e7eb; border-radius:12px; cursor:pointer; background:#fff; display:flex; align-items:flex-start; justify-content:space-between; gap:8px; }
.left { display:grid; gap:4px; }
.from { font-weight:600; }
.subject { display:flex; align-items:center; gap:8px; }
.preview { color:#6b7280; }
.right { display:flex; align-items:flex-start; }
.folder { font-size:12px; padding:4px 8px; border-radius:999px; background:#f1f5f9; }
.folder.spam { background:#fee2e2; }
.folder.promotions { background:#fef3c7; }
.folder.inbox { background:#e0f2fe; }

.chip { font-size:11px; padding:2px 6px; border-radius:999px; }
.chip.new { background:#dcfce7; color:#166534; }
.chip.expired { background:#fee2e2; color:#991b1b; }

.opened { padding:12px; border:1px solid #e5e7eb; border-radius:14px; background:#fff; }
.opened-head { display:flex; flex-direction:column; gap:2px; margin-bottom:8px; }
.code { font: 700 22px/1.2 ui-sans-serif, system-ui; display:flex; align-items:center; gap:8px; }
.note { margin-left:6px; font-size:12px; color:#b45309; }

.actions { display:flex; gap:8px; margin:8px 0; }
.verify { display:flex; gap:8px; align-items:center; flex-wrap: wrap; margin-top:10px; }
.ok { color:#065f46; }
.err { color:#b91c1c; }
.primary { background:#c7d2fe; }
.empty { color:#6b7280; }

/* Responsive: stack controls nicely on small screens */
@media (max-width: 720px) {
  .controls {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .btns { order: 2; }
  .tog { order: 3; }
}
</style>
