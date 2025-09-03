<template>
  <div id="app">
    <Header />
    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Hero from "./components/Hero.vue";

export default {
  components: { Header, Hero }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
}

/* quick, minimal styling for the nav area */
.top-nav {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.top-nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
.site-main {
  padding: 16px;
}

:root {
  --header-height: 72px;
}

html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex; 
}

</style>