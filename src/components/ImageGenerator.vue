<template>
  <section class="image-generator">
    <button @click="generateImage">Generate</button>
    <canvas ref="drawCanvas" :class="{hidden: !showCanvas}"/>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { calculateAverageColorFromClampedArray } from '@/utils/CalculateAverageColor';
import { findClosestMatchingColor } from '@/utils/FindClosestMatchingColor';
import { useColorStore } from '@/stores/colors';
import { usePropertiesStore } from '@/stores/properties';
import { drawCircleOnCanvas } from '@/utils/DrawOnCanvas';
import { storeToRefs } from 'pinia';

const drawCanvas = ref<HTMLCanvasElement>();
const showCanvas = ref(false);

const colorStore = useColorStore();
const propertiesStore = usePropertiesStore();

const { canvasSize, brushSize, uploadContext } = storeToRefs(usePropertiesStore());

const setCanvasSize = (canvas: HTMLCanvasElement, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;
}

const generateImage = () => {
  propertiesStore.hasgeneratedImage = false;
  showCanvas.value = true;
  colorStore.resetColorCount();
  
  const context = drawCanvas.value!.getContext('2d');

  const height = canvasSize.value.height! - (canvasSize.value.height! % brushSize.value);
  const width = canvasSize.value.width! - (canvasSize.value.width! % brushSize.value);

  setCanvasSize(drawCanvas.value!, width, height);

  const extractSelectedColors = Object.entries(colorStore.colors!)
    .filter(([, colorObj]) => colorObj.selected)
    .map(([, colorObj]) => colorObj.rgb);

  for (let x = 0; x < width; x += propertiesStore.brushSize) {  
    for (let y = 0; y < height; y += propertiesStore.brushSize) {

      const colorsFromCoordinates = uploadContext.value?.getImageData(x,y, brushSize.value, brushSize.value).data;
      const averageColor = calculateAverageColorFromClampedArray(colorsFromCoordinates!);
      const legoColor = findClosestMatchingColor(averageColor, extractSelectedColors);

      // ideally store this all at once in store, performance is poor
      colorStore.addColorCount(legoColor);
          
      drawCircleOnCanvas(context!, x, y, legoColor, brushSize.value);
    }
  }

  propertiesStore.hasgeneratedImage = true;
  
}
</script>

<style scoped lang="scss">

.image-generator {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-bottom: 12px;
  }
  
  .hidden {
    display: none;
  }
}
</style>