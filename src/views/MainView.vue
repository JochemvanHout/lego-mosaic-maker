<template>
  <section class="main-view-wrapper">
    <image-uploader/>

    <template v-if="hasImage">
      <canvas-information />
      
      <brush-slider />
      
      <lego-color-selector />
      
      <image-generator/>
    </template>
  </section>
</template>

<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader.vue';
import CanvasInformation from '@/components/CanvasInformation.vue';
import BrushSlider from '@/components/BrushSlider.vue';
import LegoColorSelector from '@/components/LegoColorSelector.vue';
import ImageGenerator from '@/components/ImageGenerator.vue';
import { usePropertiesStore } from '@/stores/properties';
import { storeToRefs } from 'pinia';

const { hasImage } = storeToRefs(usePropertiesStore());
</script>

<style scoped lang="scss">
.main-view-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  & > * {
    margin-bottom: 24px;
  }
}
</style>
