<template>
  <section class="hero">
    <div class="hero-text">
      <h1>Welcome to <br />Digital Confidence</h1>
      <p>Simple, safe, and supportive online experiences for everyone.</p>
      <router-link to="/guides">
        <button class="btn-primary">Get Started</button>
      </router-link>
    </div>
    <div class="hero-image">
      <img src="@/assets/Homeimage.png" alt="Hero Image" />
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
  min-height: calc(100vh - var(--header-height, 72px));
  display: grid;                  
  grid-template-columns: 0.7fr 1.3fr;
  align-items: center;
  background: linear-gradient(180deg, #ffffff, #f7f9fc);
  gap: clamp(24px, 4vw, 48px);
  padding: clamp(24px, 4vw, 48px) 0;
}

.hero-text h1 {
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 12px 0;
  color: #0a66ff;
}

.hero-text p {
  font-size: clamp(1rem, 1.6vw, 1.25rem);
  color: #4a5568;
  margin: 0 0 20px 0;
  max-width: 56ch;
}

.btn-primary {
  background-color: #0a66ff;
  color: #fff;
  padding: 14px 24px;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(10, 102, 255, 0.25);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
}
.btn-primary:hover {
  background-color: #084fd0;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(10, 102, 255, 0.3);
}

.hero-image {
  border-radius: 16px;
  overflow: hidden;
  background: #e7ecf3;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  aspect-ratio: 3 / 2;       
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;        
}

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-text {
    order: 1;
  }
  .hero-image {
    order: 2;
  }
}
</style>