import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guides from '../views/Guides.vue'
import DigitalTips from '../views/DigitalTips.vue'
import TipShell from '../views/digital-tips/TipShell.vue'  // Don't delete tipshell despite the red underline. It doesn't work if its gone


import Square from '../views/Square.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/guides', name: 'Guides', component: Guides },
  
  // Digital tips. Overlay if on guides, direct takes to new page
  { path: '/guides/digital-tips', name: 'DigitalTipsOverlay', component: DigitalTips, props: { overlay: true } },
  { path: '/guides/digital-tips/full', name: 'DigitalTipsFull', component: DigitalTips, props: { overlay: false } },

  // Detail pages for sub tiles under digital tips
  { path: '/guides/digital-tips/:slug',       name: 'TipOverlay', component: TipShell, props: route => ({ overlay: true, slug: route.params.slug }) },
  { path: '/guides/digital-tips/:slug/full',  name: 'TipFull',    component: TipShell, props: route => ({ overlay: false, slug: route.params.slug }) },

  // Child Pages
  { path: '/guides/learn-stay-safe', component: { template: '<div class="page">Learn / Stay Safe Page</div>' }},
  { path: '/guides/Tutorialdata', name: 'Tutorialdata', component: () => import('../views/Tutorialdata.vue') },
  { path: '/guides/Tutorialdata/TutorialSearch', name: 'TutorialSearch', component: () => import('../views/TutorialSearch.vue') },
  { path: '/guides/quiz-game', component: { template: '<div class="page">Quiz Game Page</div>' }},
  { path: '/guides/information', component: { template: '<div class="page">Information Page</div>' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
