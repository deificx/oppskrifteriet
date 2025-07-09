<template>
  <fieldset class="add-ingredient">
    <button @click.prevent="$emit('delete')">delete</button>
    <input
      :value="name"
      placeholder="f.eks. Hvetemel"
      type="text"
      name="name"
      @input="$emit('name', $event.target?.value)" />
    <input
      :value="amount"
      type="number"
      name="amount"
      @input="$emit('amount', parseInt($event.target?.value, 10))" />
    <model-select
      :options="[
        { text: 'Gram', value: 'gram' },
        { text: 'Desiliter', value: 'desiliter' },
        { text: 'Antall', value: 'antall' },
      ]"
      name="unit"
      v-model="unit"></model-select>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ModelSelect } from 'vue-search-select';

const props = defineProps<{ amount: number; name: string; unit: string }>();

const emit = defineEmits<{
  amount: [amount: number];
  name: [name: string];
  unit: [unit: string];
  delete: void;
}>();

const unit = ref<string>(props.unit);

watch(unit, (u) => emit('unit', u));
</script>

<style lang="css" scoped>
.add-ingredient {
  display: flex;
  padding: 0;
  gap: 0.5rem;
}
</style>
