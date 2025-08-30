<template>
  <div class="tutorial-page">
    <BackButton />
    <h1>How to shopping online</h1>

    <div class="card-container">
      <TutorialCard
        :image="tut1"
        title="Step1"
        description="Open the shopping website or app, browse categories, or use the search bar to find the product you need."
      />
      <TutorialCard
        :image="tut2"
        title="Step2"
        description="Click on the product to check details such as images, price, specifications, stock, and customer reviews"
      />
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/BackButton.vue'
import TutorialCard from '../components/Tutorialcard.vue'
import tut1 from '../assets/tut1.png'
import tut2 from '../assets/tut2.png'
</script>

<style scoped>
.tutorial-page {
  text-align: center;
  padding: 20px;
}
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}
</style>
