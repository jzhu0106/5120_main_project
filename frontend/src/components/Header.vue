<template>
  <header class="site-header">
    <!-- logo link to home -->
    <RouterLink class="brand" to="/">Placeholder Title</RouterLink> 
    <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/guides">Guides</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/help">Help</RouterLink>
    </nav>
    <div class="icons">
      <a href="#"><img src="@/assets/placeholder-icon1.png" alt="Icon 1" /></a>
      <a href="#"><img src="@/assets/placeholder-icon2.png" alt="Icon 2" /></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
}
.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: #0077ff;
}
nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #0077ff;
  font-weight: 500;
}
nav a:hover {
  text-decoration: underline;
}
.icons {
  display: flex;
  gap: 15px;
}
.icons img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>