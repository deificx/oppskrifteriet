export type StepType = 'step' | 'rest';

export interface Step {
  duration: {
    min: number;
    max: number;
  };
  ingredients?: { id: string; percentage: number; text: string }[];
  text: string;
  type: StepType;
}

export interface Ingredient {
  amount: number;
  id: string;
  name: string;
  unit: string;
}

export interface Recipe {
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  title: string;
}
