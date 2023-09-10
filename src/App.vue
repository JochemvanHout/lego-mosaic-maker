<template>
  <section class="main-view-wrapper">
    <section-wrapper>
      <template #title>Lego Mosaic Maker</template>
      <template #helper>Upload any image to turn it into a mosaic which you are able to build in real life!</template>
      <image-uploader/>
    </section-wrapper>

    <template v-if="hasImage">

      <section-wrapper>
        <template #title>Information about your image</template>
        <template #helper>This table will show you how many bricks your final creation will take, how big it will be, and how expensive it will be.</template>
        <canvas-information />
      </section-wrapper>

      <section-wrapper>
        <template #title>Control size</template>
        <template #helper>Select how many pixels of your uploaded image will translate to 1 lego piece. For example: a size of 10 would correlate to every 10x10 pixels being 1 lego brick</template>
        <brush-slider />
      </section-wrapper>

      <section-wrapper>
        <template #title>Colors</template>
        <template #helper>What colors do you want your creation to be? Every color available or just a few? Experiment!</template>
        <lego-color-selector />
      </section-wrapper>

      <section-wrapper>
        <template #title>Generate your final image</template>
        <template #helper>Happy with your settings? You can try as many different combinations as you want.</template>
        <image-generator/>
      </section-wrapper>

      <section-wrapper v-if="hasgeneratedImage">
        <template #title>Shopping list</template>
        <template #helper>Here's what you need to buy. Pro tip: if your creation has a large solid color background, you can substitute a lot of plates with a solid color backplate and save some money!</template>
        <shopping-list />
      </section-wrapper>

    </template>
  </section>
</template>

<script setup lang="ts">
import SectionWrapper from '@/components/SectionWrapper.vue';
import ImageUploader from '@/components/ImageUploader.vue';
import CanvasInformation from '@/components/CanvasInformation.vue';
import BrushSlider from '@/components/BrushSlider.vue';
import LegoColorSelector from '@/components/LegoColorSelector.vue';
import ImageGenerator from '@/components/ImageGenerator.vue';
import { usePropertiesStore } from '@/stores/properties';
import { storeToRefs } from 'pinia';
import ShoppingList from './components/ShoppingList.vue';

const { hasImage, hasgeneratedImage } = storeToRefs(usePropertiesStore());
</script>

<style scoped lang="scss">
.main-view-wrapper {
  width: 100%;
  padding: 16px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    margin-bottom: 24px;
  }
}
</style>
