<template>
  <fieldset class="add-step">
    <button @click.prevent="$emit('delete')">🚮</button>
    <model-select
      :options="[
        { text: 'Steg', value: 'step' },
        { text: 'Heving', value: 'rest' },
      ]"
      class="add-step__type"
      name="type"
      v-model="type" />
    <text-input placeholder="Instruksjon" type="text" v-model="text" />
    <text-input
      placeholder="minst n sekunder"
      type="number"
      v-model="duration.min" />
    <text-input
      placeholder="toppen n sekunder"
      type="number"
      v-model="duration.max" />
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ModelSelect } from 'vue-search-select';

import TextInput from '@/components/text-input.vue';
import { StepType } from '@/types';

const props = defineProps<{
  duration: { min: number; max: number };
  text: string;
  type: StepType;
}>();

const emit = defineEmits<{
  text: [text: string];
  type: [type: StepType];
  delete: void;
  duration: [duration: { min: number; max: number }];
}>();

const type = ref<StepType>(props.type);
const text = ref<string>(props.text);
const duration = ref<{ min: number; max: number }>(props.duration);

watch(type, (u) => emit('type', u));
watch(text, (t) => emit('text', t));
watch(duration, (d) => emit('duration', d));
</script>

<style lang="css" scoped>
.add-step {
  border: 0;
  display: flex;
  padding: 0;
  gap: 0.5rem;
}

.add-step__type {
  max-width: 6rem;
}
</style>
