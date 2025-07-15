<template>
  <form action="#" class="create-app">
    <text-input v-model="recipe.title" placeholder="Navn" type="text" />
    <textarea
      v-model="recipe.description"
      placeholder="f.eks. Nydelige hveteboller med surdeig"></textarea>
    <template v-for="(ingredient, idx) of recipe.ingredients" :key="idx">
      <component
        :is="AddIngredient"
        :amount="ingredient.amount"
        :name="ingredient.name"
        :unit="ingredient.unit"
        @amount="(amount: number) => updateIngredient(idx, { amount })"
        @name="(name: string) => updateIngredient(idx, { name })"
        @unit="(unit: string) => updateIngredient(idx, { unit })"
        @delete="() => deleteIngredient(idx)"></component>
    </template>
    <button @click.prevent="addIngredient">Legg til ingrediens</button>
    <template v-for="(step, idx) of recipe.steps" :key="idx">
      <component
        :is="AddStep"
        :duration="step.duration"
        :text="step.text"
        :type="step.type"
        @text="(text: string) => updateStep(idx, { text })"
        @type="(type: StepType) => updateStep(idx, { type })"
        @delete="() => deleteStep(idx)"></component>
    </template>
    <button @click.prevent="addStep">Legg til steg</button>
    <button @click.prevent="submit">Send inn</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import 'vue-search-select/dist/VueSearchSelect.css';

import AddIngredient from '@/components/add-ingredient.vue';
import AddStep from '@/components/add-step.vue';
import TextInput from '@/components/text-input.vue';
import { Ingredient, Recipe, Step, StepType } from '@/types';
import { createIssue } from '@/utils/user';

const recipe = reactive<Recipe>({
  description: '',
  ingredients: [],
  steps: [],
  title: '',
});

function addIngredient() {
  recipe.ingredients.push({ amount: 0, name: '', unit: 'gram' });
}

function updateIngredient(idx: number, patch: Partial<Ingredient>) {
  const ingredient = recipe.ingredients.at(idx);
  if (ingredient) {
    Object.assign(ingredient, patch);
  }
}

function deleteIngredient(idx: number) {
  recipe.ingredients.splice(idx, 1);
}

function addStep() {
  recipe.steps.push({ duration: 0, text: '', type: 'step' });
}

function updateStep(idx: number, patch: Partial<Step>) {
  const step = recipe.steps.at(idx);
  if (step) {
    Object.assign(step, patch);
  }
}

function deleteStep(idx: number) {
  recipe.steps.splice(idx, 1);
}

function save() {
  try {
    window.localStorage.setItem(
      'oppskrifteriet.no:oppskrift',
      JSON.stringify(recipe),
    );
  } catch (reason: unknown) {
    console.error(`failed to save recipe: ${JSON.stringify(reason)}`);
  }
}

function submit() {
  createIssue(recipe.title, JSON.stringify(recipe, null, 2));
}

watch(recipe, save, { deep: true });

onMounted(() => {
  try {
    const loadedRecipe = JSON.parse(
      window.localStorage.getItem('oppskrifteriet.no:oppskrift') ?? '{}',
    );
    if (typeof loadedRecipe !== 'object' || loadedRecipe === null) {
      return;
    }
    Object.assign(recipe, loadedRecipe);
  } catch (reason: unknown) {
    console.error(`failed to load recipe: ${JSON.stringify(reason)}`);
  }
});
</script>

<style lang="css" scoped>
.create-app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>
