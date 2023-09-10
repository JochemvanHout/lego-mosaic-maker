<template>
  <section class="section-wrapper">
    <h1 class="title"><slot name="title"></slot></h1>
    <p class="helper-text"><slot name="helper"></slot></p>

    <slot />
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.section-wrapper {
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgb(28, 27, 58);
  border-radius: 20px;

  padding: 16px;

  .title {
    font-size: 36px;
    margin: 8px;
  }

  .helper-text {
    margin: 8px;
    width: 50%;
  }

  hr {
    margin-top: 32px;
  }
}
</style>