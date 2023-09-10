<template>
  <label class="lego-color-block">
    <input type="checkbox" v-model="value"/>
    <span>{{ props.name }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBlackorWhiteContrast } from '@/utils/BlackOrWhiteContrast'; 

const props = defineProps<{
  modelValue: boolean,
  name: string,
  color: string,
}>();

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emits('update:modelValue', newValue)
  }
})

const backgroundColor = computed(() => props.color);
const textColor = computed(() => getBlackorWhiteContrast(props.color));

</script>

<style scoped lang="scss">
.lego-color-block {
  // height: 40px;
  padding: 8px 16px;

  display: grid;
  align-items: center;
  text-align: right;
  grid-template-columns: 20% 80%;

  background: v-bind(backgroundColor);
  border-radius: 5px;

  color: v-bind(textColor);

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>
