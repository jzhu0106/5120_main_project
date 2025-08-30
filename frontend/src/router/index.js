import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guides from '../views/Guides.vue'
import DigitalTips from '../views/DigitalTips.vue'
import Square from '../views/Square.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/guides', name: 'Guides', component: Guides },
  
  // Digital tips. Overlay if on guides, direct takes to new page
  { path: '/guides/digital-tips', name: 'DigitalTipsOverlay', component: DigitalTips, props: { overlay: true } },
  { path: '/guides/digital-tips/full', name: 'DigitalTipsFull', component: DigitalTips, props: { overlay: false } },

  // Child Pages
  { path: '/guides/learn-stay-safe', component: { template: '<div class="page">Learn / Stay Safe Page</div>' }},
  // { path: '/guides/tutorial', component: { template: '<div class="page">Tutorial Page</div>' }},
    { path: '/guides/tutorial', name: 'Tutorial', component: Square },
  { path: '/guides/quiz-game', component: { template: '<div class="page">Quiz Game Page</div>' }},
  { path: '/guides/information', component: { template: '<div class="page">Information Page</div>' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
