<template>
  <div class="tutorial-page">
    <BackButton />
    <h1>Online Service Tutorials</h1>

    <div class="search-box">
      <div class="dropdown-group">
        <label>Service Type:</label>
        <select v-model="selectedService" @change="loadFunctions">
          <option value="">Select Service Type</option>
          <option v-for="service in services" :value="service">
            {{ service }}
          </option>
        </select>
      </div>

      <div class="dropdown-group">
        <label>Function Type:</label>
        <select v-model="selectedFunction">
          <option value="">Select Function Type</option>
          <option v-for="func in functions" :value="func">
            {{ func }}
          </option>
        </select>
      </div>

      <div class="button-group">
        <button @click="searchTutorial">
          Search Tutorial
        </button>
      </div>
    </div>

    <div v-if="tutorialTitle" class="tutorial-title">
      <h2>{{ tutorialTitle }}</h2>
    </div>

    <div v-if="steps.length > 0" class="cards-container">
      <div v-for="(step, index) in steps" :key="index" class="card-wrapper">
        <TutorialCard
          :icon="index % 2 === 0 ? tut1 : tut2"
          :title="'Step ' + (index + 1)"
          :description="step"
          :bgColor="getCardColor(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BackButton from '@/components/BackButton.vue'
import TutorialCard from '../components/Tutorialcard.vue'
import tut1 from '../assets/tut1.png'
import tut2 from '../assets/tut2.png'

const API_BASE = 'https://0l3tp81lc5.execute-api.ap-southeast-2.amazonaws.com/tut1/tutorials'

const selectedService = ref('')
const selectedFunction = ref('')
const services = ref([])
const functions = ref([])
const tutorialTitle = ref('')
const steps = ref([])

const colors = ['#FFF5E1', '#EDEBFE', '#D1FAE5', '#FEF9C3', '#FEE2E2', '#DBEAFE']

function loadServices() {
  fetch(API_BASE + '?action=get_services')
    .then(response => response.json())
    .then(data => {
      services.value = data.services
    })
}

function loadFunctions() {
  selectedFunction.value = ''
  tutorialTitle.value = ''
  steps.value = []
  
  if (selectedService.value) {
    fetch(API_BASE + '?action=get_functions&service_type=' + selectedService.value)
      .then(response => response.json())
      .then(data => {
        functions.value = data.functions
      })
  }
}

function searchTutorial() {
  fetch(API_BASE + '?service_type=' + selectedService.value + '&function_type=' + selectedFunction.value)
    .then(response => response.json())
    .then(data => {
      tutorialTitle.value = data.tutorial_title
      steps.value = data.tutorial_steps.split('\n')
    })
}

function getCardColor(index) {
  return colors[index % colors.length]
}

onMounted(() => {
  loadServices()
})
</script>

<style scoped>
.tutorial-page {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.search-box {
  background: #c7d2fe;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.dropdown-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #c7d2fe;
}


.dropdown-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.dropdown-group select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.button-group {
  display: flex;
  align-items: end;
}

.button-group button {
  padding: 8px 16px;
  background: #6A0DAD;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-group button:hover {
  background: #0056b3;
}

.tutorial-title {
  margin: 20px 0;
}

.tutorial-title h2 {
  color: #333;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.card-wrapper {
  width: 100%;
}
</style>