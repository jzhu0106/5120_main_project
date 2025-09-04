<template>
  <div class="tip-root">
    <header class="intro">
      <h3 class="tip-title">Customising Settings</h3>
      <p class="lead">
        Most apps show <strong>Settings</strong> with a <em>gear/cog</em> icon, your <em>profile/avatar</em>, or a
        <em>three-dot</em> menu. From there you can update <strong>security (2FA)</strong>, <strong>notifications</strong>,
        <strong>saved cards</strong>, <strong>addresses</strong>, and your <strong>email</strong>.
      </p>
      <ul class="tips">
        <li><strong>Security/2FA</strong> usually lives under <em>Security</em> or <em>Privacy</em>.</li>
        <li><strong>Payment methods</strong> are under <em>Payments</em> or <em>Wallet</em>.</li>
        <li><strong>Notifications</strong> can be email, SMS, or push — toggle what you need.</li>
      </ul>

      <div class="taskbar">
        <div class="tasktext">
          <span class="label">Task:</span>
          <strong>{{ currentTask.label }}</strong>
          <span v-if="currentTask.help" class="help">— {{ currentTask.help }}</span>
        </div>

        <div class="task-actions">
          <select v-model="pickerKey" class="picker" @change="setTaskByKey(pickerKey)">
            <option disabled value="">Pick a task…</option>
            <option v-for="t in TASKS" :key="t.key" :value="t.key">{{ t.label }}</option>
          </select>
          <button class="btn" @click="nextTask">Next task</button>
          <button class="btn ghost" @click="randomTask">Random task</button>
          <button class="btn clear" @click="clearSettings">Clear settings</button>
        </div>
      </div>

      <p v-if="completed" class="success">✅ Nice! You completed: <strong>{{ currentTask.label }}</strong></p>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <button v-for="item in items" :key="item.key"
                class="sidebtn" :class="{active: active===item.key}"
                @click="active=item.key">
          {{ item.label }}
        </button>
      </aside>

      <main class="panel">
        <section v-if="active==='profile'">
          <h4>Profile</h4>
          <label class="row">Full name <input class="input" placeholder="Jane Appleseed" /></label>
          <label class="row">Email <input class="input" placeholder="name@example.com" v-model="state.email" /></label>
        </section>

        <section v-else-if="active==='notifications'">
          <h4>Notifications</h4>
          <label class="row"><input type="checkbox" v-model="state.emailNotifs" /> Email order updates</label>
          <label class="row"><input type="checkbox" v-model="state.pushNotifs" /> Push notifications</label>
        </section>

        <section v-else-if="active==='payments'">
          <h4>Payments</h4>

          <label class="row">Default card
            <select v-model="state.defaultCard" class="input">
              <option disabled value="">Select a card</option>
              <option>Visa •••• 4242</option>
              <option>Mastercard •••• 4444</option>
            </select>
          </label>

          <div class="divider"></div>

          <h5>Add a new card (practice)</h5>
          <p class="muted">
            For practice only — <strong>do not enter real card details</strong>. Use this dummy card:
            <code>{{ DUMMY.number }}</code>, expiry <code>{{ DUMMY.expiry }}</code>, CVV <code>{{ DUMMY.cvv }}</code>.
          </p>

          <div class="grid">
            <label class="row">Card number
              <input class="input" v-model="card.number" placeholder="1234 5678 9012 3456" />
            </label>
            <label class="row small">Expiry (MM/YY)
              <input class="input" v-model="card.expiry" placeholder="12/34" />
            </label>
            <label class="row small">CVV
              <input class="input" v-model="card.cvv" placeholder="123" />
            </label>
          </div>

          <div class="row">
            <button class="btn" @click="addCard">Add card (practice)</button>
            <span v-if="cardMsg" :class="{'ok': cardOk, 'err': !cardOk}" class="msg">{{ cardMsg }}</span>
          </div>
        </section>

        <section v-else-if="active==='addresses'">
          <h4>Addresses</h4>
          <label class="row">Default address
            <input class="input" v-model="state.defaultAddress" placeholder="Unit 5, 123 Example St" />
          </label>
        </section>

        <section v-else-if="active==='security'">
          <h4>Security</h4>
          <label class="row"><input type="checkbox" v-model="state.twoFA" /> Two-Factor Authentication (2FA)</label>
          <label class="row"><input type="checkbox" v-model="state.biometric" /> Use biometrics on this device</label>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const items = [
  { key: 'profile', label: 'Profile' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'payments', label: 'Payments' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'security', label: 'Security' },
]
const active = ref('profile')

/** Practice-only dummy card */
const DUMMY = Object.freeze({
  number: '4242 4242 4242 4242',
  expiry: '12/34',
  cvv: '123'
})

/** App state the tasks will toggle/edit */
const state = ref({
  email: '',
  emailNotifs: false,
  pushNotifs: false,
  defaultCard: '',
  defaultAddress: '',
  twoFA: false,
  biometric: false,
  newCardAdded: false,
})

/** Form state for practice add card */
const card = ref({ number: '', expiry: '', cvv: '' })
const cardMsg = ref('')
const cardOk = ref(false)

function normalizeDigits(s) { return (s || '').replace(/\D+/g, '') }
function luhnOk(numDigits) {
  let sum = 0, dbl = false
  for (let i = numDigits.length - 1; i >= 0; i--) {
    let n = parseInt(numDigits[i], 10)
    if (dbl) { n *= 2; if (n > 9) n -= 9 }
    sum += n; dbl = !dbl
  }
  return sum % 10 === 0
}
function addCard() {
  cardMsg.value = ''
  cardOk.value = false
  const n = normalizeDigits(card.value.number)
  const e = card.value.expiry.trim()
  const c = card.value.cvv.trim()

  const basicOk = n.length === 16 && luhnOk(n) && /^\d{2}\/\d{2}$/.test(e) && /^\d{3,4}$/.test(c)
  const matchesDummy = normalizeDigits(DUMMY.number) === n && DUMMY.expiry === e && DUMMY.cvv === c

  if (basicOk && matchesDummy) {
    state.value.newCardAdded = true
    cardOk.value = true
    cardMsg.value = 'Card accepted (practice only). Not saved.'
  } else {
    cardMsg.value = 'Enter the dummy test card exactly as shown above.'
  }
}

/** Tasks (shuffled on mount) */
const TASKS = [
  { key: 'twoFA', label: 'Enable Two-Factor Authentication', help: 'Security → turn on 2FA', check: s => s.twoFA },
  { key: 'emailNotifs', label: 'Turn on Email Order Updates', help: 'Notifications → tick email updates', check: s => s.emailNotifs },
  { key: 'defaultCard', label: 'Set a Default Card', help: 'Payments → choose a default card', check: s => !!s.defaultCard },
  { key: 'defaultAddress', label: 'Update your Default Address', help: 'Addresses → enter any text', check: s => s.defaultAddress.trim().length > 0 },
  { key: 'pushNotifs', label: 'Enable Push Notifications', help: 'Notifications → tick push', check: s => s.pushNotifs },
  { key: 'addCard', label: 'Add a New Card (practice)', help: 'Payments → use the dummy card shown', check: s => s.newCardAdded },
]

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const order = ref([])
const idx = ref(0)
const pickerKey = ref('')

const currentTask = computed(() => TASKS[ order.value[idx.value] || 0 ])
const completed = computed(() => currentTask.value.check(state.value))

function resetPerTaskState() {
  state.value.newCardAdded = false
  card.value = { number: '', expiry: '', cvv: '' }
  cardMsg.value = ''
  cardOk.value = false
}

function nextTask() {
  idx.value = (idx.value + 1) % order.value.length
  resetPerTaskState()
}

function randomTask() {
  idx.value = Math.floor(Math.random() * order.value.length)
  resetPerTaskState()
}

function setTaskByKey(key) {
  const i = TASKS.findIndex(t => t.key === key)
  if (i >= 0) {
    const pos = order.value.indexOf(i)
    if (pos >= 0) idx.value = pos
    else { order.value.unshift(i); idx.value = 0 }
    resetPerTaskState()
  }
}

function clearSettings() {
  state.value = {
    email: '',
    emailNotifs: false,
    pushNotifs: false,
    defaultCard: '',
    defaultAddress: '',
    twoFA: false,
    biometric: false,
    newCardAdded: false,
  }
  card.value = { number: '', expiry: '', cvv: '' }
  cardMsg.value = ''
  cardOk.value = false
}

onMounted(() => {
  order.value = shuffle(TASKS.map((_, i) => i))
  idx.value = 0
})
</script>

<style scoped>
/* ===== Unified “Digital Tips” typography ===== */
.tip-root { display:grid; gap:16px; }
.tip-title { margin:0 0 8px; font-weight:800; font-size: clamp(22px, 2.2vw, 28px); line-height:1.15; letter-spacing:-0.01em; color:#1f2937; }
.lead { margin:6px 0 0; color:#374151; font-size: clamp(15px, 1.7vw, 16px); }
.tips { margin:6px 0 0; padding-left:18px; color:#374151; }
.tips li { margin:2px 0; }

/* 🔒 Force bold for <strong>/<b> regardless of global resets/themes */
b, strong,
.tip-root strong,
.lead strong,
.tips strong,
.panel strong { font-weight:800 !important; }

/* Task bar */
.taskbar { display:grid; gap:10px; grid-template-columns: 1fr auto; align-items:center; }
.tasktext .label { color:#6b7280; margin-right:6px; }
.help { color:#6b7280; font-weight:400; margin-left:6px; }
.task-actions { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.picker, .input { padding:10px 12px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; }

/* Layout */
.layout { display:grid; grid-template-columns: 200px 1fr; gap:12px; }
.sidebar { display:grid; gap:6px; align-content:start; }
.sidebtn { text-align:left; padding:10px 12px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; cursor:pointer; }
.sidebtn.active { background:#eef2ff; border-color:#c7d2fe; }

.panel { padding:12px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; }
h4 { margin:0 0 8px; }
h5 { margin:8px 0 4px; }
.row { display:flex; align-items:center; gap:10px; margin:8px 0; }
.row.small .input { max-width: 120px; }
.grid { display:grid; grid-template-columns: 1fr auto auto; gap:8px; align-items:end; }
.divider { height:1px; background:#f1f5f9; margin:10px 0; }

.btn { border:0; padding:10px 12px; border-radius:12px; background:#e0e7ff; cursor:pointer; }
.btn.ghost { background:#f3f4f6; }
.btn.clear { background:#fee2e2; }
.ok { color:#065f46; }
.err { color:#b91c1c; }
.msg { margin-left:8px; color:#374151; }

/* Responsive */
@media (max-width: 760px) {
  .layout { grid-template-columns: 1fr; }
  .grid { grid-template-columns: 1fr; }
  .row.small .input { max-width: unset; }
}
</style>
