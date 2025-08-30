import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guides from '../views/Guides.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/guides', name: 'Guides', component: Guides },
  // example child pages the big buttons could link to:
  { path: '/guides/digital-tips', component: { template: '<div class="page">Digital Tips Page</div>' }},
  { path: '/guides/learn-stay-safe', component: { template: '<div class="page">Learn / Stay Safe Page</div>' }},
  { path: '/guides/tutorial', component: { template: '<div class="page">Tutorial Page</div>' }},
  { path: '/guides/quiz-game', component: { template: '<div class="page">Quiz Game Page</div>' }},
  { path: '/guides/information', component: { template: '<div class="page">Information Page</div>' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
