<template>
  <section class="information">
    <image-uploader />
  </section>
</template>

<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader.vue';
</script>

<style scoped lang="scss">
.information {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}
</style>
