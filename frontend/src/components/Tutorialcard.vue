<template>
  <div class="card custom-card">
    <img :src="icon" class="card-icon" alt="Card icon" />

    <div class="card-body" :style="{ backgroundColor: bgColor }">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
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
  bgColor: {
    type: String,
    default: '#f5f5f5',
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
  align-items: center;
  padding-top: 20px;
}

.card-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.card-body {
  color: #333;
  padding: 20px;
  width: 100%;
  flex-grow: 1;
  border-top: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
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
