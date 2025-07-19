<template>
  <fieldset class="add-ingredient">
    <button @click.prevent="$emit('delete')">🚮</button>
    <text-input v-model="name" placeholder="f.eks. Hvetemel" type="text" />
    <text-input v-model="amount" type="number" />
    <model-select
      :options="[
        { text: 'Gram', value: 'gram' },
        { text: 'Desiliter', value: 'desiliter' },
        { text: 'Antall', value: 'antall' },
      ]"
      name="unit"
      v-model="unit" />
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ModelSelect } from 'vue-search-select';

import TextInput from '@/components/text-input.vue';

const props = defineProps<{ amount: number; name: string; unit: string }>();

const emit = defineEmits<{
  amount: [amount: number];
  name: [name: string];
  unit: [unit: string];
  delete: void;
}>();

const amount = ref<number>(props.amount);
const name = ref<string>(props.name);
const unit = ref<string>(props.unit);

watch(amount, (a) => emit('amount', a));
watch(name, (n) => emit('name', n));
watch(unit, (u) => emit('unit', u));
</script>

<style lang="css" scoped>
.add-ingredient {
  border: 0;
  display: flex;
  padding: 0;
  gap: 0.5rem;
}
</style>
