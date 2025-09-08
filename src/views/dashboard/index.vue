<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useAuthStore from '@/stores/auth'
  onMounted(() => {
    console.log(useAuthStore().isLogin)
  })
</script>

<template>dashboard</template>

<style scoped lang="scss"></style>
