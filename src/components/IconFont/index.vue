<template>
  <i
    class="iconfont"
    :class="name"
    :style="{ fontSize: size + 'px', color: color }"
  >
    <slot></slot>
  </i>
</template>
<script setup lang="ts">
  type Props = {
    name: string
    size?: number
    color?: string
  }
  const { name, size = 16, color = '#333' } = defineProps<Props>()
</script>
<style scoped>
  @import url(https://at.alicdn.com/t/c/font_4995238_wpxejjnv37f.css);
</style>
