<template>
  <section class="draw-canvas">
    <button @click="generateImage">Generate</button>
    <canvas ref="drawCanvas" class="canvas" id="draw-canvas"/>
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

const colorStore = useColorStore();
const propertiesStore = usePropertiesStore();

const { canvasSize, brushSize, uploadContext } = storeToRefs(usePropertiesStore());

const setCanvasSize = (canvas: HTMLCanvasElement, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;
}

const generateImage = () => {
  const context = drawCanvas.value!.getContext('2d');

  const height = canvasSize.value.height! - (canvasSize.value.height! % brushSize.value);
  const width = canvasSize.value.width! - (canvasSize.value.width! % brushSize.value);
  console.log(height, width);

  setCanvasSize(drawCanvas.value!, width, height);

  const extractSelectedColors = Object.entries(colorStore.colors!)
    .filter(([, colorObj]) => colorObj.selected)
    .map(([, colorObj]) => colorObj.rgb);

  for (let x = 0; x < width; x += propertiesStore.brushSize) {  
    for (let y = 0; y < height; y += propertiesStore.brushSize) {

      const colorsFromCoordinates = uploadContext.value?.getImageData(x,y, brushSize.value, brushSize.value).data;
      const averageColor = calculateAverageColorFromClampedArray(colorsFromCoordinates!);
      const legoColor = findClosestMatchingColor(averageColor, extractSelectedColors);
          
      drawCircleOnCanvas(context!, x, y, legoColor, brushSize.value);
    }
  }
}
</script>

<style scoped lang="scss">
input[type=file] {
  display: none;
}

canvas {
  background-color: black;
  max-width: 50vw;
  max-height: 100vh;
}

.draw-canvas {
  display: flex;
  flex-direction: column;
}
</style>