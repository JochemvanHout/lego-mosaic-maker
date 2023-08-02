<template>
    <section class="canvas-information">
      <h2>Image information</h2>
      <table>
        <thead>
          <th></th>
          <th>Width</th>
          <th>Height</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr>
            <td>Image size</td>
            <td>{{ canvasSize.x }} px</td>
            <td>{{ canvasSize.y }} px</td>
            <td>{{ canvasSize.x * canvasSize.y }} px</td>
          </tr>
          <tr>
            <td>Lego bricks</td>
            <td>{{ bricksWidth }} bricks</td>
            <td>{{ bricksHeight }} bricks</td>
            <td>{{ bricksTotal }} bricks</td>
          </tr>
          <tr>
            <td>Real size</td>
            <td>{{ (bricksWidth * 0.8).toFixed(2) }} cm</td>
            <td>{{ (bricksHeight * 0.8).toFixed(2) }} cm</td>
            <td>{{ ((bricksHeight * 0.8) * (bricksWidth)).toFixed(2) }} cm²</td>
          </tr>
        </tbody>
      </table>
      <!-- <p>Image width: {{ canvasSize.x }} px</p>
      <p>Image height: {{ canvasSize.y }} px</p>
      <p>Using a pixel size of {{ brushSize }}, your lego creation will be {{ bricksWidth }} bricks wide and {{ bricksHeight }} bricks tall.</p>
      <p>{{ (bricksWidth * 0.8).toFixed(2) }} cm by {{ (bricksHeight * 0.8).toFixed(2) }} cm</p> -->
      <!-- <p>Total lego bricks needed: {{ bricksTotal }}</p> -->
      <p>Estimated cost: €{{ (bricksTotal * 0.04).toFixed(2) }}</p>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  canvasSize: {x: number, y: number},
  brushSize: number,
}>();

const bricksWidth = computed(() => Math.floor(props.canvasSize.x / props.brushSize));
const bricksHeight = computed(() => Math.floor(props.canvasSize.y / props.brushSize));
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