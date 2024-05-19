<script setup lang="ts">
import { ref } from 'vue'
const date = ref<string>('')

</script>
<template>
  <DateInput v-model="date" />
</template>
