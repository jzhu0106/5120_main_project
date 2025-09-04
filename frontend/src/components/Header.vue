<template>
  <header class="site-header">
    <!-- Logo links to home -->
    <RouterLink class="brand" to="/" aria-label="Digital Confidence Home">
      <img
        src="@/assets/digital-confidence-logo.png"
        alt="Digital Confidence"
        class="logo"
      />
    </RouterLink>

    <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/guides">Guides</RouterLink>
<!--       Commenting out about as page not built
      <RouterLink to="/about">About</RouterLink> -->
    </nav>
    
<!--     Commenting out settings icon as page not built
    <div class="icons">
      <a href="#" aria-label="Settings">
        <img src="@/assets/settings.png" alt="Settings" />
      </a>
    </div> -->
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Keep the logo nicely sized and vertically centered */
.brand {
  display: flex;
  align-items: center;
}

/* Readable, neat fit in the bar */
.logo {
  height: 40px;
  width: auto;
  display: block;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.menu a {
  margin: 0 15px;
  text-decoration: none;
  color: #0077ff;
  font-weight: 500;
}
.menu a:hover {
  text-decoration: underline;
}

/* Icons */
.icons {
  display: flex;
  gap: 15px;
}
.icons img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

@media (max-width: 640px) {
  .logo { height: 36px; }
}
</style>
