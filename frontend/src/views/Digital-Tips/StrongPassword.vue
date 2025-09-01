<template>
  <!-- Overlay view -->
  <div v-if="overlay" class="modal-root" @keydown.esc="onClose" tabindex="-1">
    <div class="modal-backdrop" @click="onClose" />
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="spTitle">
      <!-- header -->
      <div class="modal-header">
        <button class="back-button" @click="onClose" aria-label="Go back">
          <img :src="backIcon" alt="Back" />
          <span>Back</span>
        </button>
        <h2 id="spTitle" class="modal-title">Setting Strong Passwords</h2>
        <button class="modal-close" @click="onClose" aria-label="Close overlay">×</button>
      </div>

      <!-- content -->
      <section class="page" style="padding:16px;">
        <h3 style="margin-top:0;">Build a stronger password</h3>
        <ul>
          <li>
            <strong>Length matters:</strong> many sites require 8–12 characters. Aim for
            <strong>14+ characters</strong> for everyday accounts—longer is harder to brute-force.
          </li>
          <li>
            <strong>Mix it up:</strong> use lowercase + UPPERCASE + numbers + symbols (e.g. <code>!</code>, <code>#</code>, <code>@</code>).
            Variety dramatically increases combinations.
          </li>
          <li>
            <strong>Avoid guessable content:</strong> don’t use obvious words/names or keyboard sequences like
            <code>qwerty</code> / <code>123456</code>.
          </li>
          <li>
            <strong>Don’t reuse</strong> the same password across sites; one breach can expose others.
          </li>
          <li>
            <strong>Safer habits:</strong> never share passwords; if you write a hint, keep it securely and away from what it protects.
          </li>
        </ul>
      </section>

      <!-- checker -->
      <section class="page" style="margin-top:16px;">
        <h3 style="margin-top:0;">Password checker (runs only on your device)</h3>
        <p style="margin:6px 0 12px;">No data is sent or stored. Score is based on length and character mix.</p>

        <label for="pw" class="sr-only">Enter password</label>
        <input
          id="pw"
          type="password"
          v-model="pass"
          autocomplete="off"
          spellcheck="false"
          style="width:100%; padding:12px 14px; border-radius:10px; border:1px solid #e5e7eb; font-size:16px;"
          placeholder="Try a long passphrase with symbols"
        />

        <div style="margin:10px 0 6px; height:10px; background:#f1f5f9; border-radius:8px; overflow:hidden;">
          <div :style="{ width: strengthBar.pct + '%', height: '100%', background: strengthBar.color, transition: 'width .2s ease' }"></div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:14px; color:#374151;">
          <div><strong>Score:</strong> {{ score.score }} / 5</div>
          <div><strong>Rating:</strong> {{ score.label }}</div>
        </div>

        <ul style="margin-top:12px; font-size:14px; color:#374151;">
          <li>Length: <strong>{{ checks.len }}</strong> characters</li>
          <li>Upper & Lower present: <strong>{{ checks.hasUpper && checks.hasLower ? 'Yes' : 'No' }}</strong></li>
          <li>Numbers present: <strong>{{ checks.hasNum ? 'Yes' : 'No' }}</strong></li>
          <li>Symbols present: <strong>{{ checks.hasSym ? 'Yes' : 'No' }}</strong></li>
        </ul>
      </section>
    </div>
  </div>

  <!-- Full-page fallback -->
  <section v-else class="container page">
    <div class="modal-header" style="position: static; border: 0; padding: 0 0 8px;">
      <button class="back-button" @click="goBack" aria-label="Go back">
        <img :src="backIcon" alt="Back" />
        <span>Back</span>
      </button>
      <h1 class="modal-title" style="font-size:28px;">Setting Strong Passwords</h1>
      <span style="width:34px;"></span>
    </div>

    <div style="margin-top:8px;">
      <p>Use at least 14 characters, mix character types, and avoid obvious patterns. Try the checker below.</p>
      <div class="page" style="padding:16px;">
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import backIcon from '@/assets/back-icon.png'

const props = defineProps({
  overlay: { type: Boolean, default: true },
})

const router = useRouter()
const onClose = () => {
  if (window.history.state?.back) router.back()
  else router.push('/guides/digital-tips')
}
const goBack = () => router.push('/guides/digital-tips/full')

/* -------- Password checker logic (client-only) -------- */
const pass = ref('')

const checks = computed(() => {
  const p = String(pass.value || '')
  const len = p.length
  const hasLower = /[a-z]/.test(p)
  const hasUpper = /[A-Z]/.test(p)
  const hasNum   = /\d/.test(p)
  const hasSym   = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(p)
  return { len, hasLower, hasUpper, hasNum, hasSym }
})

// scoring rules (max 5)
const score = computed(() => {
  const c = checks.value
  let s = 0

  // 1) Length buckets (immediate Weak if < 8)
  if (c.len < 8) return { score: 0, label: 'Weak' }
  if (c.len >= 14) s += 2
  else if (c.len >= 9 && c.len <= 13) s += 1

  // 2) Upper + Lower
  if (c.hasLower && c.hasUpper) s += 1

  // 3) Numbers
  if (c.hasNum) s += 1

  // 4) Symbols
  if (c.hasSym) s += 1

  // Map score to label
  let label = 'Weak'
  if (s >= 5) label = 'Strong'
  else if (s >= 3) label = 'Medium'

  return { score: s, label }
})

const strengthBar = computed(() => {
  const s = score.value.score
  const pct = Math.round((s / 5) * 100)
  // red (weak), yellow (medium), green (strong)
  let color = '#ef4444'         // red
  if (s >= 5) color = '#16a34a' // green
  else if (s >= 3) color = '#eab308' // yellow
  return { pct, color }
})

onMounted(() => { if (props.overlay) document.body.style.overflow = 'hidden' })
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<style scoped>
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>
