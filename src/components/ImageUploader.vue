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

    <section>
      <h2>Image information</h2>
      <div>Image height: {{ canvasImage.naturalHeight }} px</div>
      <div>Image width: {{ canvasImage.naturalWidth }} px</div>
    </section>

    <section>
      <h2>Choose pixel size</h2>
      <input type="range" v-model.number="brushSize" min="1" max="250"/> <div>size: {{ brushSize }}</div>
    </section>

    <section>
      <h2>Choose which official lego brick colors to use</h2>
      <lego-color-selector />
    </section>

    <section>
      <h2>Make the magic happen</h2>
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

const fileInput = ref<null | HTMLInputElement>(null)
const uploadImage = ref();
const canvasImage = ref(new Image());
const uploadCanvas = ref<HTMLCanvasElement>();
const drawCanvas = ref<HTMLCanvasElement>();
const brushSize = ref(10);

const colorStore = useColorStore();

const handleFile = () => {
  uploadImage.value = fileInput.value?.files;
  extractInformation();
}

const setCanvasSize = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
}

const extractInformation = () => {
  canvasImage.value.src = URL.createObjectURL(uploadImage.value[0]);

  canvasImage.value.onload = () => {
    const context = uploadCanvas.value!.getContext('2d');
    setCanvasSize(uploadCanvas.value!, canvasImage.value);
    context!.drawImage(canvasImage.value, 0, 0);
  }
}

const drawCircleOnCanvas = (context: CanvasRenderingContext2D, x: number, y: number, color, blockSize: number) => {
  context.beginPath();
  context.arc(x + (blockSize / 2), y + (blockSize / 2), blockSize / 2, 0, 2 * Math.PI);
  context.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  context.fill();
}

const generateImage = () => {
  const ogContext = uploadCanvas.value!.getContext('2d');
  const context = drawCanvas.value!.getContext('2d');
  setCanvasSize(drawCanvas.value!, canvasImage.value);

  const extractSelectedColors = Object.entries(colorStore.colors)
    .filter(([, colorObj]) => colorObj.selected === true)
    .map(([, colorObj]) => colorObj.rgb);

  for (let xCoordinate = 0; xCoordinate < uploadCanvas.value!.width; xCoordinate += brushSize.value) {
      for (let yCoordinate = 0; yCoordinate < uploadCanvas.value!.height; yCoordinate += brushSize.value) {

        const colorsFromCoordinates = ogContext?.getImageData(xCoordinate,yCoordinate,brushSize.value,brushSize.value).data;

        if(colorsFromCoordinates){
          const averageColor = calculateAverageColorFromClampedArray(colorsFromCoordinates);
          const legoColor = findClosestMatchingColor(averageColor, extractSelectedColors);
              
          drawCircleOnCanvas(context!, xCoordinate, yCoordinate, legoColor, brushSize.value);
        }

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
  max-height: 50vh;
}
</style>