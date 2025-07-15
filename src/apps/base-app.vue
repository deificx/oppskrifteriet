<template>
  <top-section />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import TopSection from '@/components/top-section.vue';
import { init } from '@/utils/user';

onMounted(init);
</script>
