<template>
  <h1>Official lego brick colors</h1>
  
  <button @click="selectAllColors">select all colors</button>
  <button @click="deselectAllColors">unselect all colors</button>

  <section class="lego-color-selector">
    <lego-color-block v-for="value in selectedLegoColors" :key="value.colorName" 
                      v-model="value.selected" :name="value.colorName" 
                      :color="value.color"/>
  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import LegoColorBlock from './LegoColorBlock.vue';
import LegoColors from '@/utils/LegoColors';

const selectedLegoColors = ref(LegoColors.map(item => ({ selected: false,...item})));

const selectAllColors = () => selectedLegoColors.value = selectedLegoColors.value.map(item => ({ ...item, selected: true}));
const deselectAllColors = () => selectedLegoColors.value = selectedLegoColors.value.map(item => ({ ...item, selected: false}));

</script>

<style scoped lang="scss">
  .lego-color-selector {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(7, 1fr); 
    grid-column-gap: 16px;
    grid-row-gap: 16px;

    margin: 16px;
  }
</style>