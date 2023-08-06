<template>
  <section class="file-upload">
    <h2>Start here</h2>
    <label for="file-upload" class="custom-file-upload">file upload</label>
    <input ref="fileInput" id="file-upload" type="file" accept="image/*" @change="handleFile()"/>
  </section>

  <template v-if="uploadImage">
    <section>
      <h2>Uploaded Image</h2>
      <canvas ref="uploadCanvas" class="canvas" id="upload-canvas"/>
    </section>

    <canvas-information :canvas-size="canvasSize" :brush-size="brushSize"/>

    <section>
      <h2>Choose pixel size</h2>
      <input type="range" v-model.number="brushSize" min="1" max="250"/> <div>size: {{ brushSize }}</div>
    </section>

    <section>
      <h2>Choose which official lego brick colors to use</h2>
      <lego-color-selector />
    </section>

    <section class="draw-canvas">
      <h2>Generate image in Lego</h2>
      <button @click="generateImage">Generate</button>
      <canvas ref="drawCanvas" class="canvas" id="draw-canvas"/>
    </section>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LegoColorSelector from '@/components/LegoColorSelector.vue';
import { calculateAverageColorFromClampedArray, findClosestMatchingColor } from '@/utils/ColorCalculations';
import { useColorStore } from '@/stores/colors';
import { drawCircleOnCanvas } from '@/utils/DrawOnCanvas';
import CanvasInformation from './CanvasInformation.vue';

const fileInput = ref<null | HTMLInputElement>(null)
const uploadImage = ref();
const canvasImage = ref(new Image());
const uploadCanvas = ref<HTMLCanvasElement>();
const drawCanvas = ref<HTMLCanvasElement>();
const brushSize = ref(10);
const canvasSize = ref({x: 0, y:0});

const colorStore = useColorStore();

const handleFile = () => {
  uploadImage.value = fileInput.value?.files;
  extractInformation();
}

const setCanvasSize = (canvas: HTMLCanvasElement, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;
}

const extractInformation = () => {
  canvasImage.value.src = URL.createObjectURL(uploadImage.value[0]);

  canvasImage.value.onload = () => {
    const context = uploadCanvas.value!.getContext('2d');
    const { width, height } = canvasImage.value;
    canvasSize.value = {x: width, y: height};

    setCanvasSize(uploadCanvas.value!, width, height);

    context!.drawImage(canvasImage.value, 0, 0);
  }
}

const generateImage = () => {
  const ogContext = uploadCanvas.value!.getContext('2d');
  const context = drawCanvas.value!.getContext('2d');

  const height = uploadCanvas.value?.height! - (uploadCanvas.value!.height! % brushSize.value);
  const width = uploadCanvas.value?.width! - (uploadCanvas.value!.width! % brushSize.value);

  setCanvasSize(drawCanvas.value!, width, height);

  const extractSelectedColors = Object.entries(colorStore.colors!)
    .filter(([, colorObj]) => colorObj.selected)
    .map(([, colorObj]) => colorObj.rgb);

  for (let x = 0; x < width; x += brushSize.value) {  
    for (let y = 0; y < height; y += brushSize.value) {

      const colorsFromCoordinates = ogContext?.getImageData(x,y,brushSize.value,brushSize.value).data;
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

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  &:hover {
    background: white;
    color: black;
  }
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