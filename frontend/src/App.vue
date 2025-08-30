<template>
  <div id="app">
    <Header />
    <Hero />
    <BottomIcons />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import BottomIcons from './components/BottomIcons.vue'

export default {
  components: {
    Header,
    Hero,
    BottomIcons
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
}
</style>