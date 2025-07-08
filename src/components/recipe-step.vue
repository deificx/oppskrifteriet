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

<script lang="ts" setup>
import { computed } from "vue";

export interface RecipeStep {
  duration: number;
  text: string;
  type: "step" | "rest";
}

defineEmits<{ (e: "completed", idx: number): void }>();

const props = defineProps<RecipeStep & { disabled: boolean; idx: number }>();

const id = computed(() => `step-${props.idx + 1}`);
</script>
