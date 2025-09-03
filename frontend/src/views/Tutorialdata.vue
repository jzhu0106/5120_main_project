<template>
  <div>
    <BackButton />
    <h1>Why People Use the Internet - Australia</h1>
    
    <canvas id="myChart" width="600" height="300"></canvas>
    
    <div style="margin-top: 30px;">
      <h3>Digital Index by State</h3>
      <div class="map-container" v-if="data.mapData && data.mapData.length > 0">
        <div 
          v-for="state in data.mapData" 
          :key="state.name"
          class="state-box"
          :style="{ backgroundColor: getColor(state.value) }"
          @mouseover="showTooltip(state.name, state.value, $event)"
          @mouseleave="hideTooltip"
        >
          <div class="state-name">{{ state.name }}</div>
          <div class="state-value">{{ state.value }}</div>
        </div>
      </div>
      <div v-else>
        <p>Loading map data...</p>
      </div>
      
      <div v-if="tooltip.show" class="tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        {{ tooltip.state }}: {{ tooltip.value }}
      </div>
      
      <div class="legend">
        <span class="legend-item">
          <span class="color-box" style="background: #ffcccc;"></span> Low (69-71)
        </span>
        <span class="legend-item">
          <span class="color-box" style="background: #ff9999;"></span> Medium (72-74)
        </span>
        <span class="legend-item">
          <span class="color-box" style="background: #ff6666;"></span> High (75-78)
        </span>
      </div>
    </div>
    
    <div style="margin-top: 30px;">
      <h3>Data from Database:</h3>
      <p>Electronic Lodgements to Government: {{ data.electronicLodgements }}%</p>
      <p>Access Government Information/Services: {{ data.governmentInfo }}%</p>
      <p>Overall Internet Usage (Australia): {{ data.overallUsage }}%</p>
    </div>
    
    <div style="margin-top: 40px;">
      <router-link :to="'/guides/Tutorialdata/TutorialSearch'">
        <button class="start-btn">Start to Learn</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import BackButton from '@/components/BackButton.vue'

const data = ref({})
const tooltip = ref({ show: false, x: 0, y: 0, state: '', value: 0 })
let chart = null

async function loadData() {
  try {
    const response = await fetch('https://0l3tp81lc5.execute-api.ap-southeast-2.amazonaws.com/tut1/tutorials/datavis', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('API response:', result)
    data.value = result
    
  } catch (error) {
    console.error('Error loading data:', error)
  }
  
  setTimeout(createChart, 200)
}

function getColor(value) {
  if (value <= 71) return '#ffcccc'
  if (value <= 74) return '#ff9999'
  return '#ff6666'
}

function showTooltip(state, value, event) {
  tooltip.value = {
    show: true,
    x: event.pageX + 10,
    y: event.pageY - 10,
    state: state,
    value: value
  }
}

function hideTooltip() {
  tooltip.value.show = false
}

function createChart() {
  const canvas = document.getElementById('myChart')
  
  if (chart) {
    chart.destroy()
  }
  
  chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: [
        'Electronic Lodgements to Government',
        'Access Government Info/Services', 
        'Overall Internet Usage'
      ],
      datasets: [{
        label: 'Percentage (%)',
        data: [
          data.value.electronicLodgements,
          data.value.governmentInfo,
          data.value.overallUsage
        ],
        backgroundColor: [
          '#a7f3d0',
          '#e9d5ff',
          '#fef08a'
        ]
      }]
    },
    options: {
      responsive: true,
      interaction: {
        mode: null
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Internet Usage Reasons in Australia'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Percentage (%)'
          }
        }
      }
    },
    plugins: [{
      afterDatasetsDraw: function(chart) {
        const ctx = chart.ctx
        chart.data.datasets.forEach(function(dataset, i) {
          const meta = chart.getDatasetMeta(i)
          meta.data.forEach(function(bar, index) {
            const data = dataset.data[index]
            ctx.fillStyle = 'black'
            ctx.font = 'bold 14px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(data + '%', bar.x, bar.y - 5)
          })
        })
      }
    }]
  })
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
div {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1, h3 {
  color: #333;
  margin-bottom: 20px;
}

canvas {
  margin: 20px 0;
}

.map-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin: 20px auto;
  max-width: 800px;
}

.state-box {
  width: 120px;
  height: 80px;
  border: 2px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.state-box:hover {
  transform: scale(1.1);
  border-color: #000;
}

.state-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
}

.state-value {
  font-size: 14px;
  color: #666;
}

.tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.color-box {
  width: 15px;
  height: 15px;
  border: 1px solid #ccc;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

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