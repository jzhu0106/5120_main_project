<script setup>
import BackButton from '@/components/BackButton.vue'
import { useRouter } from 'vue-router'
</script>

<template>
  <BackButton />
  <h1>This is a title. This page is used for data visualization.</h1>
  <div>
    <router-link :to="'/guides/Tutorialdata/TutorialSearch'">
      <button class="start-btn">Start to Learn</button>
    </router-link>
  </div>
</template>

<style scoped>
.start-btn {
  background-color: #e9d5ff;
  border: none;
  border-radius: 20px;
  padding: 16px 32px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-btn:hover {
  background-color: #d4b9ff;
}
</style>
