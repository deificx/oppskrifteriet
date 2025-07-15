<template>
  <div class="top-section">
    <router-link to="/">
      <h1 class="top-section__header">oppskrifteriet.no</h1>
    </router-link>
    <nav class="top-section__nav">
      <router-link to="/create">Create</router-link>
      <img
        v-if="user.avatar"
        :src="user.avatar"
        :alt="user.name"
        :title="user.name"
        class="top-section__avatar" />
      <a
        v-else
        href="https://github.com/login/oauth/authorize?client_id=Ov23liF44XaD6SRpkeEL&scope=public_repo,read:user">
        Login with GitHub
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { user } from '@/utils/user';
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
  align-items: center;
  display: flex;
  gap: 1rem;
}

.top-section__avatar {
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
}
</style>
