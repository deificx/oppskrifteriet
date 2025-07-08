<template>
  <form>
    <textarea
      v-model="description"
      placeholder="f.eks. Nydelige hveteboller med surdeig"
    >
    </textarea>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Ingredient, Step } from '@/types';

const description = ref<string>('');
const ingredients: Ingredient[] = [];
const steps: Step[] = [];
</script>
