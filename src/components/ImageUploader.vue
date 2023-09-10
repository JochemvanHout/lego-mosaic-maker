<template>
  <section class="file-upload">
    <label for="file-upload" class="custom-file-upload">Upload image</label>
    <input ref="fileInput" id="file-upload" type="file" accept="image/*" @change="handleFile()"/>
    
    <template v-if="uploadImage">
        <canvas ref="uploadCanvas" class="canvas" id="upload-canvas"/>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePropertiesStore } from '@/stores/properties';

const fileInput = ref<null | HTMLInputElement>(null)
const uploadImage = ref();
const canvasImage = ref(new Image());
const uploadCanvas = ref<HTMLCanvasElement>();

const propertiesStore = usePropertiesStore();

defineExpose({
  uploadCanvas,
});

const handleFile = () => {
  uploadImage.value = fileInput.value?.files;
  extractInformation();
  propertiesStore.hasImage = true;
}

const setCanvasSize = (canvas: HTMLCanvasElement, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;
}

const extractInformation = () => {
  canvasImage.value.src = URL.createObjectURL(uploadImage.value[0]);

  canvasImage.value.onload = () => {
    const context = uploadCanvas.value!.getContext('2d');
    propertiesStore.uploadContext = context;

    const { width, height } = canvasImage.value;
    propertiesStore.canvasSize = { width, height };

    propertiesStore.canvasSize = { width: canvasImage.value.width, height: canvasImage.value.height };

    setCanvasSize(uploadCanvas.value!, width, height);

    context!.drawImage(canvasImage.value, 0, 0);
  }
}

</script>

<style scoped lang="scss">
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type=file] {
    display: none;
  }

  .custom-file-upload {
    background: #ccc;
    color: black;
    display: inline-block;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 12px;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>