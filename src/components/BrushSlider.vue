<template>
  <section>
    <input type="range" v-model.number="brushSize" min="5" max="100"/> <div>size: {{ brushSize }}</div>
  </section>
</template>

<script lang="ts" setup >
import { usePropertiesStore } from '@/stores/properties';
import { storeToRefs } from "pinia";

const { brushSize } = storeToRefs(usePropertiesStore());
</script>

<style lang="scss">
</style>