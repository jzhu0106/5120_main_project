<template>
  <section class="bottom-icons">
    <div class="icon">[Placeholder Icon 1]</div>
    <div class="icon">[Placeholder Icon 2]</div>
    <div class="icon">[Placeholder Icon 3]</div>
    <div class="icon">[Placeholder Icon 4]</div>
  </section>
</template>

<script>
export default {
  name: "BottomIcons"
};
</script>

<style scoped>
.bottom-icons {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 40px 0;
}
.bottom-icons .icon {
  border: 1px dashed #aaa;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}
</style>