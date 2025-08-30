<template>
  <div class="square-page">


      <BackButton />

      <h1>Welcome to the Tutorial Page</h1>


    <p>This is the Square page where users can explore more about the tutorial.</p>


    <div class="row g-4">
      <div class="col-12 col-md-4">
        <TileCard
          title="Online shopping"
          subtitle="Learn how to manage your accounts, pay bills, and transfer money online with ease."
          cta="Get Started"
          :to="'/guides/Online shopping'"
          bg="#FFA07A"
          accent="#f8c5b8"
          :imgSrc="shopping"
          imgAlt="Confetti icon"
        />
      </div>

      <div class="col-12 col-md-4">
        <TileCard
          title="Banks"
          subtitle="Discover how to select products, add them to your cart, and complete secure payments for a seamless shopping experience."
          cta="Get Safe"
          :to="'/guides/Banks'"
          bg="#FFB6C1"
          accent="#a5b4fc"
          :imgSrc="bank"
          imgAlt="Padlock icon"
        />
      </div>

      <div class="col-12 col-md-4">
        <TileCard
          title="Food delivery"
          subtitle="Explore how to quickly order food, choose restaurants, and enjoy the convenience of delivery to your door."
          cta="Read Now"
          :to="'/guides/Food delivery'"
          bg="#87CEEB"
          accent="#fde047"
          :imgSrc="delivery"
          imgAlt="Info icon"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BackButton from '@/components/BackButton.vue'
import TileCard from '@/components/TileCard.vue'
import shopping from '@/assets/shopping.png'
import bank from '@/assets/bank.png'
import delivery from '@/assets/delivery.png'
</script>

<style scoped>
.square-page {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  margin-bottom: 20px;
}



.square-page :deep(.tile) {
  width: 100%;
  height: 250px;
}

.square-page :deep(.tile-title) {
  color: #065f46;
}


</style>
