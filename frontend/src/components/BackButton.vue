<template>
  <button @click="goBack" class="back-button">
    <img src="@/assets/back-icon.png" alt="Back" class="back-icon" />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()


const goBack = () => {
  router.back()
}
</script>

<style scoped>
.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 999; 
}

.back-icon {
  width: 50px;
  height: 50px;
}
</style>
