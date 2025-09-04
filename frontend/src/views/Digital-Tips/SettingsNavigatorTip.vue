<template>
  <div class="tip-root">
    <header class="intro">
      <h3>Practice: Find it in Settings</h3>
      <p>Complete the task by navigating the mock settings and toggling the correct option.</p>
      <p class="task">Task: <strong>{{ task.text }}</strong></p>
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
          <label class="row">Email <input class="input" placeholder="name@example.com" /></label>
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

    <footer class="result" v-if="completed">
      ✅ Nice! You completed the task: <strong>{{ task.text }}</strong>
      <button class="btn" @click="nextTask">Try another task</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const items = [
  { key: 'profile', label: 'Profile' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'payments', label: 'Payments' },
  { key: 'addresses', label: 'Addresses' },
  { key: 'security', label: 'Security' },
]
const active = ref('profile')

const TASKS = [
  { key: 'twoFA', text: 'Enable Two-Factor Authentication', check: (s)=>s.twoFA },
  { key: 'emailNotifs', text: 'Turn on Email Order Updates', check: (s)=>s.emailNotifs },
  { key: 'defaultCard', text: 'Set a Default Card', check: (s)=>!!s.defaultCard },
  { key: 'defaultAddress', text: 'Update your Default Address', check: (s)=>s.defaultAddress.trim().length>0 },
  { key: 'pushNotifs', text: 'Enable Push Notifications', check: (s)=>s.pushNotifs },
]

const state = ref({
  emailNotifs: false,
  pushNotifs: false,
  defaultCard: '',
  defaultAddress: '',
  twoFA: false,
  biometric: false,
})

const task = ref(TASKS[0])
const completed = computed(() => task.value.check(state.value))

function nextTask() {
  const idx = (TASKS.indexOf(task.value)+1) % TASKS.length
  task.value = TASKS[idx]
}

watch(state, ()=>{}, { deep: true })
</script>

<style scoped>
.tip-root { display:grid; gap: 16px; }
.intro h3 { margin:0 0 4px; }
.task { margin: 0; color:#374151; }

.layout { display:grid; grid-template-columns: 200px 1fr; gap: 12px; }
.sidebar { display:grid; gap:6px; align-content:start; }
.sidebtn { text-align:left; padding:10px 12px; border:1px solid #e5e7eb; border-radius:10px; background:#fff; cursor:pointer; }
.sidebtn.active { background:#eef2ff; border-color:#c7d2fe; }

.panel { padding:12px; border:1px solid #e5e7eb; border-radius:12px; background:#fff; }
h4 { margin:0 0 8px; }
.row { display:flex; align-items:center; gap:10px; margin:8px 0; }
.input { padding:8px 10px; border:1px solid #e5e7eb; border-radius:10px; min-width: 260px; }

.result { display:flex; gap:8px; align-items:center; }
.btn { border:0; padding:10px 12px; border-radius:10px; background:#e0e7ff; cursor:pointer; }
</style>
