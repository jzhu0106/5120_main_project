<template>
  <!-- Overlay mode -->
  <div v-if="overlay" class="modal-root" @keydown.esc="onClose" tabindex="-1">
    <div class="modal-backdrop" @click="onClose" />
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="tipsTitle">
        <!-- Header Bar -->
      <div class="modal-header">
      <button class="back-button" @click="toGuides" aria-label="Go back">
        <img :src="backIcon" alt="Back" />
        <span>Back</span>
      </button>
      <h2 id="tipsTitle" class="modal-title">Digital Tips</h2>
      <button class="modal-close" @click="onClose" aria-label="Close overlay">×</button>
    </div>

      <p class="modal-sub">Choose a topic to explore practical, confidence-building tips.</p>

      <!-- Tiles Grids -->
      <div class="tiles-grid tips-grid">
        <RouterLink v-for="t in tips" :key="t.to" class="tile tips-tile" :to="t.to">
          <div class="tile-content">
            <div class="tile-text">
              <h3 class="tile-title">{{ t.title }}</h3>
              <p class="tile-sub">{{ t.desc }}</p>
              <span class="tile-cta">Open</span>
            </div>
            <div class="tile-badge" :style="{ backgroundColor: t.badgeBg }">
              <img :alt="t.alt" :src="t.img" />
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Full page fallback -->
  <section v-else class="container">
    <h1 class="page-title">Digital Tips</h1>
    <p class="page-sub">Choose a topic to explore practical, confidence-building tips.</p>

    <div class="tiles-grid tips-grid">
      <RouterLink v-for="t in tips" :key="t.to" class="tile tips-tile" :to="t.to">
        <div class="tile-content">
          <div class="tile-text">
            <h3 class="tile-title">{{ t.title }}</h3>
            <p class="tile-sub">{{ t.desc }}</p>
            <span class="tile-cta">Open</span>
          </div>
          <div class="tile-badge" :style="{ backgroundColor: t.badgeBg }">
            <img :alt="t.alt" :src="t.img" />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import backIcon from '@/assets/back-icon.png'

// route prop from router/index.js
const props = defineProps({ overlay: { type: Boolean, default: true } })

const router = useRouter()
const onClose = () => {
  // If there is history, go back; otherwise push to /guides
  if (window.history.state?.back) router.back()
  else router.push('/guides')
}

const toGuides = () => {
  router.replace({ name: 'Guides' }) 
}

// lock body scroll while modal open
onMounted(() => {
  if (props.overlay) document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})



// Digital Tips Content Starts Here
// Digital Tips Content Starts Here
// Digital Tips Content Starts Here
// Digital Tips Content Starts Here

// Images to be used for tiles to be imported here
import img1 from '@/assets/placeholder-icon1.png'
import img2 from '@/assets/placeholder-icon2.png'
import img_password from '@/assets/lock.png'
import img_mail from '@/assets/mail.png'
import img_settings from '@/assets/settings.png'

const tips = [
  // {
  //   title: 'Banking Basics',
  //   desc: 'Learn how to check your balance, transfer money between accounts, and make secure payments like direct transfers and BPAY.',
  //   img: img1,
  //   alt: 'Banking',
  //   badgeBg: '#fde68a',
  //   to: '/guides/digital-tips/banking'
  // }, commenting out as this page not working / functioning as i'd like
  { 
    title: 'Setting Strong Passwords',
    desc: 'Tips for setting up strong passwords for your accounts',
    img: img_password,
    alt: 'Strong Password',
    badgeBg: '#FF5F15',
    to: '/guides/digital-tips/strong-password'
  },
  {
    title: 'Find a Verification Email',
    desc: 'Practice searching Inbox/Spam and using Resend to get a code.',
    img: img_mail,
    alt: 'Verify Email',
    badge: '#C7F9CC',
    to: '/guides/digital-tips/email-verification-tip'
  },
  {
    title: 'Find It in Settings',
    desc: 'Practice navigating to 2FA, notifications, cards, and addresses.',
    img: img_settings,
    alt: 'Find Settings',
    badge: '#E0E7FF',
    to: '/guides/digital-tips/settings-navigator-tip'
  },
  {
    title: 'Customising App Settings',
    desc: 'Navigate app settings, review account details, adjust privacy preferences, and explore handy customisation options.',
    img: img2,
    alt: 'Settings menu',
    badgeBg: '#ddd6fe',
    to: '/guides/digital-tips/settings'
  },
]
</script>

<style scoped>
/* Modal shell */
.modal-root { position: fixed; inset: 0; z-index: 40; }
.modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.35); }
.modal-panel {
  position: absolute; inset: 4% 6%;
  background: #fff; border-radius: 20px; padding: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,.2); overflow: auto;
}
.modal-close {
  position: absolute; top: 10px; right: 12px;
  border: 0; background: transparent; font-size: 28px; cursor: pointer;
}
.modal-title { margin: 6px 0 6px; font-size: 28px; }
.modal-sub { margin: 0 0 18px; color: #4b5563; }

/* Grid tweaks for the tips list */
.tips-grid { grid-auto-rows: 220px; }
.tips-tile .tile-title { font-size: 22px; }
.tips-tile .tile-sub { font-size: 14px; }
</style>
