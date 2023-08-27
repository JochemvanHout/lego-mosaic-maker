<template>
    <section class="canvas-information">
      <table>
        <thead>
          <th></th>
          <th>Width</th>
          <th>Height</th>
        </thead>
        <tbody>
          <tr>
            <td>Image size</td>
            <td>{{ canvasSize.width }} px</td>
            <td>{{ canvasSize.height }} px</td>
          </tr>
          <tr>
            <td>Lego bricks</td>
            <td>{{ bricksWidth }} bricks</td>
            <td>{{ bricksHeight }} bricks</td>
          </tr>
          <tr>
            <td>Real size</td>
            <td>{{ (bricksWidth * 0.8).toFixed(2) }} cm</td>
            <td>{{ (bricksHeight * 0.8).toFixed(2) }} cm</td>
          </tr>
        </tbody>
      </table>
      <p>Total bricks needed: {{ bricksTotal }}</p>
      <p>Estimated cost: €{{ (bricksTotal * 0.04).toFixed(2) }}</p>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePropertiesStore } from '@/stores/properties';
import { storeToRefs } from "pinia";

const { canvasSize, brushSize } = storeToRefs(usePropertiesStore());

const bricksWidth = computed(() => Math.floor(canvasSize.value.width / brushSize.value));
const bricksHeight = computed(() => Math.floor(canvasSize.value.height / brushSize.value));
const bricksTotal = computed(() => bricksHeight.value * bricksWidth.value);

</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>