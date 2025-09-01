<template>
  <!-- Overlay version -->
  <div v-if="overlay" class="modal-root" @keydown.esc="onClose" tabindex="-1">
  <div class="modal-backdrop" @click="onClose" />
  <div class="modal-panel" role="dialog" aria-modal="true" :aria-labelledby="titleId">

    <!-- Header bar -->
    <div class="modal-header">
      <button class="back-button" @click="onClose" aria-label="Go back">
        <img :src="backIcon" alt="Back" />
        <span>Back</span>
      </button>
      <h2 :id="titleId" class="modal-title">{{ title }}</h2>
      <button class="modal-close" @click="onClose" aria-label="Close overlay">×</button>
    </div>

    <component v-if="Current" :is="Current" />
    <div v-else class="page" style="min-height: 300px; display:flex; align-items:center; justify-content:center;">
        <em>Missing tip for “{{ title }}” (slug: {{ slug }})</em>
    </div>

    
  </div>
</div>

  <!-- Full page fallback -->
  <section v-else class="container page">
    <div class="modal-header" style="position: static; border: 0; padding: 0 0 8px;">
    <button class="back-button" @click="goBack" aria-label="Go back">
      <img :src="backIcon" alt="Back" />
      <span>Back</span>
    </button>
    <h1 class="modal-title" style="font-size:28px;">{{ title }}</h1>
    <span style="width:34px;"></span> <!-- spacer where close would be -->
  </div>

    <component v-if="Current" :is="Current" />
    <p v-else>Missing tip for “{{ title }}” (slug: {{ slug }})</p>

  </section>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import backIcon from '@/assets/back-icon.png'
import BankingTip from './BankingTip.vue'
import StrongPassword from './StrongPassword.vue'

// Map slugs to tip components
const registry = {
  banking: BankingTip,
  bankingtips: BankingTip, // alias; use either slug
  'strong-password': StrongPassword,
  strongpassword: StrongPassword,
}

// Resolve the current tip component from the slug
const Current = computed(() => registry[props.slug] ?? null)

const props = defineProps({
  overlay: { type: Boolean, default: true },
  slug: { type: String, required: true },
})

const router = useRouter()

// Close overlay or returning to digital tips list
const onClose = () => {
  if (window.history.state?.back) router.back()
  else router.push('/guides/digital-tips')
}

// Full-page fall back always goes back to digital tips list
const goBack = () => {
  router.push('/guides/digital-tips/full')
}


const toTitle = s =>
  s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
const title = computed(() => toTitle(props.slug))
const titleId = computed(() => `title-${props.slug}`)

onMounted(() => { if (props.overlay) document.body.style.overflow = 'hidden' })
onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>
