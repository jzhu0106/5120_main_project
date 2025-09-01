<template>
  <div class="practice">
    <div class="bar">
      <label><input type="checkbox" v-model="showGuides" /> Practice mode</label>
      <button class="ghost" @click="reset">Reset</button>
    </div>

    <div class="stage-wrap" @click="onStageClick">
      <img class="stage" :src="imageSrc" alt="Banking screen mock" />
      <div class="overlay" :style="{ pointerEvents: showGuides ? 'auto' : 'none' }">
        <button
          v-for="(h, i) in hotspots"
          :key="i"
          class="hotspot"
          :class="{ correct: h.correct, hidden: !showGuides }"
          :style="boxStyle(h)"
          :title="h.name + ' — ' + h.task"
          @click.stop="onHotspotClick(h)"
        />
      </div>
    </div>

    <p class="note">Click the correct place for each task. Toggle “Practice mode” to show/hide targets.</p>

    <transition name="toast">
      <div v-if="toastText" class="toast" :class="toastOk ? 'ok' : 'bad'">{{ toastText }}</div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  imageSrc: { type: String, required: true },
  hotspots: {
    type: Array,
    required: true,
    // each item: { name, task, msg, x, y, w, h } in percentages
  }
})

const showGuides = ref(true)
const toastText = ref('')
const toastOk = ref(false)
let toastTimer

function toast(text, ok) {
  clearTimeout(toastTimer)
  toastText.value = text
  toastOk.value = ok
  toastTimer = setTimeout(() => (toastText.value = ''), 1700)
}

function boxStyle(h) {
  return {
    left: h.x + '%',
    top: h.y + '%',
    width: h.w + '%',
    height: h.h + '%'
  }
}

function onHotspotClick(h) {
  if (h.correct) return
  h.correct = true
  toast('✓ ' + h.msg, true)
}

function onStageClick(e) {
  // clicks not on a hotspot while in practice
  if (!showGuides.value || e.target.classList.contains('hotspot')) return
  toast('Try another area on the page.', false)
}

function reset() {
  props.hotspots.forEach(h => (h.correct = false))
}
</script>

<style scoped>
.practice { background:#0b1222; border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:14px }
.bar{ display:flex; gap:12px; align-items:center }
.ghost{ margin-left:auto; background:#111827; color:#e5e7eb; border:1px solid rgba(255,255,255,.15);
        border-radius:8px; padding:8px 10px; cursor:pointer }
.note{ margin:10px 2px 0; color:#94a3b8; font-size:13px }

.stage-wrap{ position:relative; background:#0a0f1f; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,.06); margin-top:10px }
.stage{ display:block; width:100%; height:auto }
.overlay{ position:absolute; inset:0 }
.hotspot{
  position:absolute; cursor:pointer; border:2px dashed rgba(37,99,235,.7);
  background:rgba(37,99,235,.18); border-radius:8px;
}
.hotspot.correct::after{
  content:"✓"; position:absolute; right:-8px; top:-10px; background:#16a34a; color:#fff;
  border-radius:999px; padding:2px 6px; font-weight:700; font-size:12px
}
.hotspot.hidden{ display:none }

.toast{ position:fixed; left:50%; transform:translateX(-50%); bottom:18px;
  padding:10px 14px; border-radius:12px; font-weight:700; border:1px solid rgba(255,255,255,.18);
  background:rgba(0,0,0,.75) }
.toast.ok{ color:#bbf7d0 } .toast.bad{ color:#fecaca }
.toast-enter-active, .toast-leave-active { transition: opacity .2s ease }
.toast-enter-from, .toast-leave-to { opacity:0 }
</style>
