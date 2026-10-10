<script setup lang="ts">
import { NH1, NP } from 'naive-ui'

defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <header class="nia-page-header">
    <NH1>{{ title }}</NH1>
    <NP v-if="subtitle" depth="2">{{ subtitle }}</NP>
  </header>
</template>

<style scoped>
.nia-page-header {
  margin-bottom: 24px;
}
</style>
