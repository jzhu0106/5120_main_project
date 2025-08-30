<template>
  <section class="container">
    
    <h1 class="page-title">Guides</h1>

    <div class="tiles-grid">
      <TileCard
        title="Digital Tips"
        subtitle="Build skills to confidently use healthcare, banking, and other daily services"
        cta="Get Started"
        :to="'/guides/digital-tips'"
        bg="#e9d5ff"
        accent="#f8c5b8"
        :imgSrc="tipsImg"
        imgAlt="Confetti icon"
      />

      <TileCard
        title="Learn & Stay Safe"
        subtitle="Protect your personal data with simple, safe online habits"
        cta="Get Safe"
        :to="'/guides/learn-stay-safe'"
        bg="#c7d2fe"
        accent="#a5b4fc"
        :imgSrc="lockImg"
        imgAlt="Padlock icon"
      />

      <TileCard
        title="Information"
        subtitle="Discover how digital apps make your life easier, more connected, and more enjoyable"
        cta="Read Now"
        :to="'/guides/information'"
        bg="#fef08a"
        accent="#fde047"
        :imgSrc="infoImg"
        imgAlt="Info icon"
      />

      <TileCard
        title="Tutorial"
        subtitle="Practice your learnings in a space where mistakes mean nothing"
        cta="Learn now"
        :to="'/guides/tutorial'"
        bg="#a7f3d0"
        accent="#6ee7b7"
        :imgSrc="peopleImg"
        imgAlt="People icon"
      />

      <TileCard
        title="Quiz & Games"
        subtitle="Test your knowledge in a fun environment"
        cta="Begin"
        :to="'/guides/quiz-game'"
        bg="#c4b5fd"
        accent="#fda4af"
        :imgSrc="wrenchImg"
        imgAlt="Wrench icon"
      />
    </div>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import TileCard from '@/components/TileCard.vue'

// use your own placeholders in /src/assets
import tipsImg from '@/assets/placeholder-icon1.png'
import lockImg from '@/assets/placeholder-icon2.png'
import infoImg from '@/assets/placeholder-icon1.png'
import peopleImg from '@/assets/placeholder-icon2.png'
import wrenchImg from '@/assets/placeholder-icon1.png'
</script>
