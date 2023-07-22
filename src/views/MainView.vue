<template>
  <section class="information">
    <image-canvas />
  </section>
  <!-- <lego-color-selector /> -->
</template>

<script setup lang="ts">
import ImageCanvas from '@/components/ImageCanvas.vue';
import LegoColorSelector from '@/components/LegoColorSelector.vue';
</script>

<style scoped lang="scss">
.information {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
