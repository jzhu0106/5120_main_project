<template>
  <header>
    <div class="logo">Placeholder Title</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">Guides</a>
      <a href="#">About</a>
      <a href="#">Help</a>
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