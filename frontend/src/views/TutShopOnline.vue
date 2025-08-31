<template>
  <div class="TutShopOnline-page">
    <BackButton />
    <h1>How to shopping online</h1>

    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-4" v-for="(card, index) in cards" :key="index">
        <TileCard
          :title="card.title"
          :subtitle="card.subtitle"
          :cta="card.cta"
          :to="card.to"
          :bg="card.bg"
          :accent="card.accent"
          :imgSrc="card.imgSrc"
          :imgAlt="card.imgAlt"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/BackButton.vue'
import TileCard from '@/components/TileCard.vue'
import tut1 from '@/assets/tut1.png'
import tut2 from '@/assets/tut2.png'

const cards = [
  {
    title: 'Registration',
    subtitle: 'Create your account to start shopping.',
    cta: 'Start',
    to: '/guides/online-shopping/registration',
    bg: '#FFE4B5',
    accent: '#FDBA74',
    imgSrc: tut1,
    imgAlt: 'Registration'
  },
  {
    title: 'Search',
    subtitle: 'Find products quickly with search.',
    cta: 'Search',
    to: '/guides/online-shopping/search',
    bg: '#C7D2FE',
    accent: '#A5B4FC',
    imgSrc: tut2,
    imgAlt: 'Search'
  },
  {
    title: 'Compare',
    subtitle: 'Compare prices & reviews easily.',
    cta: 'Compare',
    to: '/guides/online-shopping/compare',
    bg: '#A7F3D0',
    accent: '#6EE7B7',
    imgSrc: tut1,
    imgAlt: 'Compare'
  },
  {
    title: 'Add to Cart',
    subtitle: 'Keep items in your shopping cart.',
    cta: 'Add',
    to: '/guides/online-shopping/cart',
    bg: '#FDE68A',
    accent: '#FCD34D',
    imgSrc: tut2,
    imgAlt: 'Cart'
  },
  {
    title: 'Payment',
    subtitle: 'Pay securely online.',
    cta: 'Pay',
    to: '/guides/online-shopping/payment',
    bg: '#FCA5A5',
    accent: '#F87171',
    imgSrc: tut1,
    imgAlt: 'Payment'
  },
  {
    title: 'Track Order',
    subtitle: 'Follow your delivery status.',
    cta: 'Track',
    to: '/guides/online-shopping/track',
    bg: '#93C5FD',
    accent: '#60A5FA',
    imgSrc: tut2,
    imgAlt: 'Track'
  },
  {
    title: 'Support',
    subtitle: 'Get help & handle returns.',
    cta: 'Help',
    to: '/guides/online-shopping/support',
    bg: '#D8B4FE',
    accent: '#C084FC',
    imgSrc: tut1,
    imgAlt: 'Support'
  }
]
</script>

<style scoped>
.TutShopOnline-page {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.TutShopOnline-page :deep(.tile) {
  width: 100%;
  height: 240px;
}
</style>
