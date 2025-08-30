<template>
  <div class="card custom-card">
    <img :src="image" class="card-img-top" alt="Card image" />
    
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.custom-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.card-img-top {
  width: 100%;
  height: 33.33%;
  object-fit: cover;
}

.card-body {
  background-color: #f5f5f5;
  color: #333;
  padding: 20px;
  height: 66.67%;
}

.card-title {
  font-size: 1.25rem;
  color: #f28d84;
}

.card-text {
  font-size: 1rem;
  color: #6b6b6b;
}
</style>