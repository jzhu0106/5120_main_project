<template>
  <section class="hero">
    <div class="hero-text">
      <h1>Welcome to <br /> Placeholder Title</h1>
      <p>Simple, safe, and supportive online experiences for everyone.</p>
      <button class="btn-primary">Get Started</button>
    </div>
    <div class="hero-image">
      <span>Insert image here</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 10%;
  flex-wrap: wrap;
}
.hero-text {
  max-width: 500px;
}
.hero-text h1 {
  font-size: 2.5rem;
  color: #0077ff;
}
.hero-text p {
  margin: 15px 0;
  font-size: 1rem;
  color: #555;
}
.btn-primary {
  background-color: #0077ff;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.2);
}
.btn-primary:hover {
  background-color: #005fcc;
}
.hero-image {
  width: 400px;
  height: 260px;
  background-color: #e0e0e0;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.hero-image span {
  color: #555;
}
</style>