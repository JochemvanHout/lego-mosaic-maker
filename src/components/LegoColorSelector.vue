<template>
  <section class="lego-color-selector">
    <div class="button-wrapper">
      <button :style="{background: 'green', 'margin-right': '16px'}" @click="selectAllColors">select all colors</button>
      <button :style="{background: 'red'}" @click="deselectAllColors">unselect all colors</button>
    </div>
    <section class="lego-color-grid">
      <lego-color-block v-for="(value, index) in colorStore.colors" :key="index" 
                        :name="(index as string)" :color="value.color"
                        v-model="value.selected"/>
    </section>
  </section>
</template>

<script setup lang="ts">
import LegoColorBlock from './LegoColorBlock.vue';
import { useColorStore } from '@/stores/colors';

const colorStore = useColorStore();

const selectAllColors = () => { colorStore.selectAllColors() }
const deselectAllColors = () => { colorStore.unselectAllColors() }

</script>

<style scoped lang="scss">
.lego-color-selector {

  button {

  }
  
  .lego-color-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(7, 1fr); 
    grid-column-gap: 16px;
    grid-row-gap: 16px;

    margin: 16px;
  }
}
</style>