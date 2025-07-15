export type StepType = 'step' | 'rest';

export interface Step {
  duration:
    | {
        min: number;
        max: number;
      }
    | number;
  text: string;
  type: StepType;
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
  title: string;
}
