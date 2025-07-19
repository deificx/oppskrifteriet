import { Recipe } from '@/types';

export function pretty(recipe: Recipe) {
  const ingredients = recipe.ingredients
    .map((ing) => `| ${ing.name} | ${ing.amount} ${ing.unit} |`)
    .join('\n');

  const title = `# ${recipe.title}`;
  const description = `> ${recipe.description}`;
  const steps = recipe.steps
    .map(
      (step, index) =>
        `${index + 1}. ${step.text}\n\t- time: ${step.duration} seconds\n\t- type: ${step.type}`,
    )
    .join('\n');

  return `${title}\n\n${description}\n\n| Ingrediens | Mengde |\n| --- | --- |\n${ingredients}\n\n## Steps\n\n${steps}\n`;
}

export function parse(recipe: string): Recipe {
  const lines = recipe.split('\n');
  const title = lines[0].replace(/^#\s+/, '');
  const description = lines[1].replace(/^>\s+/, '');
  const ingredients: { name: string; amount: number; unit: string }[] = [];
  const steps: { text: string; type: 'step' | 'rest'; duration: number }[] = [];

  let inIngredients = false;
  let inSteps = false;

  for (const line of lines.slice(2)) {
    if (line.startsWith('|')) {
      if (!inIngredients) {
        inIngredients = true;
        continue;
      }
      if (inSteps) continue; // Skip if already in steps
      if (line.trim() === '| Ingrediens | Mengde |') continue; // Skip header
      if (line.trim() === '| --- | --- |') continue; // Skip separator
      const parts = line
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
      // parse ingredient
      if (parts.length === 2) {
        const [name, amountUnit] = parts;
        const [amount, unit] = amountUnit.split(' ');
        ingredients.push({ name, amount: parseFloat(amount), unit });
      }
    } else if (line.startsWith('## Steps')) {
      inSteps = true;
      continue;
    } else if (inSteps) {
      const stepMatch = line.match(/^\d+\.\s+(.*)$/);
      if (stepMatch) {
        steps.push({ text: stepMatch[1], type: 'step', duration: 0 });
      }
    }
  }

  return { title, description, ingredients, steps };
}
