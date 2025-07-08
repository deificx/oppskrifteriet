export interface Step {
  duration: number;
  text: string;
  type: "step" | "rest";
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
}
