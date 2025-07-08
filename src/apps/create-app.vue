<template>
  <form>
    <textarea v-model="description" />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const description = ref<string>("");
</script>
