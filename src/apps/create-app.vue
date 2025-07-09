<template>
  <form action="#/create">
    <textarea
      v-model="description"
      placeholder="f.eks. Nydelige hveteboller med surdeig" />
    <template v-for="(ingredient, idx) of ingredients">
      <component
        :is="AddIngredient"
        :amount="ingredient.amount"
        :name="ingredient.name"
        :unit="ingredient.unit"
        @amount="(amount: number) => updateIngredient(idx, { amount })"
        @name="(name: string) => updateIngredient(idx, { name })"
        @unit="(unit: string) => updateIngredient(idx, { unit })"
        @delete="() => deleteIngredient(idx)" />
    </template>
    <button @click.prevent="addIngredient">Legg til ingrediens</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import 'vue-search-select/dist/VueSearchSelect.css';

import AddIngredient from '@/components/add-ingredient.vue';
import { Ingredient } from '@/types';

const description = ref<string>('');
const ingredients = ref<Ingredient[]>([]);

function addIngredient() {
  ingredients.value.push({ amount: 0, name: '', unit: 'gram' });
}

function updateIngredient(idx: number, patch: Partial<Ingredient>) {
  const ingredient = ingredients.value.at(idx);
  if (ingredient) {
    Object.assign(ingredient, patch);
    save();
  }
}

function deleteIngredient(idx: number) {
  ingredients.value.splice(idx, 1);
  save();
}

function save() {
  try {
    window.localStorage.setItem(
      'oppskrifteriet.no:oppskrift',
      JSON.stringify({
        description: description.value,
        ingredients: ingredients.value,
      }),
    );
  } catch (reason: unknown) {
    console.error(`failed to save recipe: ${JSON.stringify(reason)}`);
  }
}

watch(description, save);

onMounted(() => {
  try {
    const recipe = JSON.parse(
      window.localStorage.getItem('oppskrifteriet.no:oppskrift') ?? '{}',
    );
    if ('description' in recipe && typeof recipe.description === 'string') {
      description.value = recipe.description;
    }
    if ('ingredients' in recipe && Array.isArray(recipe?.ingredients)) {
      ingredients.value = recipe.ingredients;
    }
  } catch (reason: unknown) {
    console.error(`failed to load recipe: ${JSON.stringify(reason)}`);
  }
});
</script>
