<template>
  <div class="top-section">
    <h1 class="top-section__header">oppskrifteriet.no</h1>
    <nav class="top-section__nav">
      <router-link to="/">Home</router-link>
      <router-link to="/create">Create</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style lang="css" scoped>
.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.top-section__header {
  font-size: 100%;
}

.top-section__nav {
  display: flex;
  gap: 1rem;
}
</style>
