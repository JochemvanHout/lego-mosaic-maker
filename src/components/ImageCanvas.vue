<template>
  <label for="file-upload" class="custom-file-upload">file upload</label>
  <input ref="fileInput" id="file-upload" type="file" accept="image/*" @change="handleFile()"/>

  <input type="range" v-model.number="blockSize" min="1" max="250"/> <div>size: {{ blockSize }}</div>

  <template v-if="uploadImage">
    <button @click="drawImageOnCanvas">Rerender</button>
    <h2>Original Image</h2>
    <canvas class="canvas" id="upload-canvas"/>

    <h2>Image using lego bricks</h2>
    <canvas class="canvas" id="pixel-canvas"/>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { calculateAverageColorFromClampedArray, findClosestMatchingColor } from '@/utils/ColorCalculations';

const fileInput = ref<null | HTMLInputElement>(null)
const uploadImage = ref();
const blockSize = ref<number>(10);

const handleFile = () => {
  uploadImage.value = fileInput.value?.files;
  drawImageOnCanvas();
}

const setCanvasSize = (canvas: HTMLCanvasElement, image: HTMLImageElement) => {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
}

const drawCircleOnCanvas = (context: CanvasRenderingContext2D, x: number, y: number, color, blockSize: number) => {
  context.beginPath();
  context.arc(x + (blockSize / 2), y + (blockSize / 2), blockSize / 2, 0, 2 * Math.PI);
  context.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  context.fill();
}

const drawImageOnCanvas = () => {
  const canvasImage = new Image();
  canvasImage.src = URL.createObjectURL(uploadImage.value[0]);
  
  canvasImage.onload = () => {
    const canvas = document.querySelector('#upload-canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    setCanvasSize(canvas, canvasImage);

    context!.drawImage(canvasImage, 0, 0);

    const newCanvas = document.querySelector('#pixel-canvas') as HTMLCanvasElement;
    const newContext = newCanvas.getContext('2d');

    setCanvasSize(newCanvas, canvasImage);

    // horizontal ines
    for (let xCoordinate = 0; xCoordinate < canvas.width; xCoordinate += blockSize.value) {
      // vertical ines
      for (let yCoordinate = 0; yCoordinate < canvas.height; yCoordinate += blockSize.value) {
        const tempColorArray = context?.getImageData(xCoordinate,yCoordinate,blockSize.value,blockSize.value).data;

        if(tempColorArray){
          const averageColor = calculateAverageColorFromClampedArray(tempColorArray);
          const legoColor = findClosestMatchingColor(averageColor);

          console.log(typeof blockSize.value );
          
          
          drawCircleOnCanvas(newContext!, xCoordinate, yCoordinate, legoColor, blockSize.value);
        }

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
}

canvas {
  background-color: black;
  max-width: 50%;
  max-height: 50vh;
}
</style>