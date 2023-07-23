<template>
  <section class="file-upload">
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
      {{  canvasImage }}
      <div>Image height: {{ canvasImage.naturalHeight }} px</div>
      <div>Image width: {{ canvasImage.naturalWidth }} px</div>
    </section>

    <section>
      <lego-color-selector />
    </section>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useColorStore } from '@/stores/colors';
import LegoColorSelector from '@/components/LegoColorSelector.vue';

const fileInput = ref<null | HTMLInputElement>(null)
const uploadImage = ref();
const canvasImage = ref(new Image());
const uploadCanvas = ref<HTMLCanvasElement>();

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

const selectAllColors = () => {
  useColorStore().selectAllColors();
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