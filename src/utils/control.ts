import type { Ingredient, Recipe } from '@/types';

interface Control {
  unused: Ingredient[];
}

function checkIngredients(recipe: Recipe): Control {
  const control: Control = {
    unused: [],
  };

  const usedIds = new Set(
    recipe.steps.flatMap(
      (step) => step.ingredients?.map((ing) => ing.id) || [],
    ),
  );

  control.unused = recipe.ingredients.filter(
    (ingredient) => !usedIds.has(ingredient.id),
  );

  return control;
}
