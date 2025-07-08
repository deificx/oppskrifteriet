<template>
  <li :class="type">
    <input
      type="checkbox"
      :id="id"
      :disabled="disabled"
      @change="$emit('completed', idx)"
    />
    <label :for="id">{{ text }} ({{ duration }})</label>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { Step } from '@/types';

defineEmits<{ (e: 'completed', idx: number): void }>();

const props = defineProps<Step & { disabled: boolean; idx: number }>();

const id = computed(() => `step-${props.idx + 1}`);
</script>
