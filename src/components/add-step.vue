<template>
  <fieldset class="add-step">
    <button @click.prevent="$emit('delete')">slett</button>
    <model-select
      :options="[
        { text: 'Steg', value: 'step' },
        { text: 'Heving', value: 'rest' },
      ]"
      class="add-step__type"
      name="type"
      v-model="type" />
    <text-input
      placeholder="f.eks. Legg til Hvetemel, vann, og salt"
      type="text" />
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ModelSelect } from 'vue-search-select';

import TextInput from '@/components/text-input.vue';
import { StepType } from '@/types';

const props = defineProps<{ text: string; type: StepType }>();

const emit = defineEmits<{
  text: [text: string];
  type: [type: StepType];
  delete: void;
}>();

const type = ref<StepType>(props.type);

watch(type, (u) => emit('type', u));
</script>

<style lang="css" scoped>
.add-step {
  border: 0;
  display: flex;
  padding: 0;
  gap: 0.5rem;
}

.add-step__type {
  width: 6.25rem !important;
}
</style>
