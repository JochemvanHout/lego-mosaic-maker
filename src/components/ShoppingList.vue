<template>
  <section class="shopping-list-wrapper">
    <ul class="shopping-list">
      <li class="shopping-list-item" v-for="item in shoppingList" :key="item.name">
        <div class="list-item-name">{{ item.name }}</div>
        <div class="list-item-count">{{ item.count }}</div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useColorStore } from '@/stores/colors';
import { storeToRefs } from 'pinia';

const { colors } = storeToRefs(useColorStore());

const shoppingList = computed(() => {
  const result: {name: string, count: number}[] = [];

  for (const colorName in colors.value) {
    const colorItem = colors.value[colorName];
    if (colorItem.count > 0) {
      result.push({ name: colorName, count: colorItem.count});
    }
  }

  return result;
})
</script>

<style lang="scss">
.shopping-list-wrapper {

  .shopping-list {
    padding: 0;

    & :hover {
      background: grey;
      border-radius: 5px;
    }
    .shopping-list-item {
      padding: 4px;
      display: flex;
      justify-content: space-between;
      list-style-type: none;

      .list-item-count {
        margin-left: 20px;
      }
    }
  }
  
}
</style>