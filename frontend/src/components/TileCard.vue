<template>
  <RouterLink class="tile" :to="to" :style="tileStyle" @keydown.enter.prevent="go">
    <div class="tile-content">
      <div class="tile-text">
        <h2 class="tile-title" v-html="formattedTitle"></h2>
        <p class="tile-sub">{{ subtitle }}</p>
        <button class="tile-cta" type="button" @click.prevent="go">{{ cta }}</button>
      </div>

      <div class="tile-badge" :style="{ backgroundColor: accent }" aria-hidden="true">
        <img :alt="imgAlt" :src="imgSrc" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  cta: { type: String, default: 'Open' },
  to: { type: [String, Object], required: true },
  bg: { type: String, default: '#ffffff' },
  accent: { type: String, default: '#eeeeee' },
  imgSrc: { type: String, default: '' },
  imgAlt: { type: String, default: 'Artwork' },
  tall: { type: Boolean, default: false },
})

const router = useRouter()
const go = () => router.push(props.to)

const tileStyle = computed(() => ({
  backgroundColor: props.bg,
  gridRow: props.tall ? 'span 2' : 'auto'
}))

const formattedTitle = computed(() => props.title.replace(/\n/g, '<br/>'))
</script>
