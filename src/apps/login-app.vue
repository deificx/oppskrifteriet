<template>Loading</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { tokenExchange } from '@/utils/user';

const router = useRouter();

onMounted(async () => {
  const success = await tokenExchange();
  if (success) {
    router.replace('/');
  }
});
</script>
