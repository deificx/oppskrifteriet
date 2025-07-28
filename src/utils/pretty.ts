import { Recipe } from '@/types';
import { parsePrettyTime, time } from '@/utils/time';

function formatDuration(duration: { min: number; max: number }) {
  if (duration.min === 0 && duration.max === 0) {
    return '';
  }
  if (duration.min !== duration.max) {
    const plusMinus = (duration.max - duration.min) / 2;
    const total = duration.min + plusMinus;
    return (
      time(`${total}`).format('pretty') +
      ` ±${time(`${plusMinus}`).format('pretty')}`
    );
  } else {
    return time(`${duration.min}`).format('pretty');
  }
}

export function pretty(recipe: Recipe) {
  const ingredients = recipe.ingredients
    .map((ing) => `| ${ing.name} | ${ing.amount} | ${ing.unit} |`)
    .join('\n');

  const title = `# ${recipe.title}`;
  const description = `> ${recipe.description}`;
  const steps = recipe.steps
    .map(
      (step, index) =>
        `${index + 1}. ${step.text}\n\t- time: ${formatDuration(step.duration)}\n\t- type: ${step.type}`,
    )
    .join('\n');

  return `${title}\n\n${description}\n\n| Ingrediens | Mengde | Enhet |\n| --- | --- |\n${ingredients}\n\n## Oppskrift\n\n${steps}\n`;
}

export function parse(input: string): Recipe {
  const lines = input.split('\n');
  const recipe: Recipe = {
    title: lines.find((line) => line.startsWith('# '))?.replace('# ', '') || '',
    description:
      lines.find((line) => line.startsWith('> '))?.replace('> ', '') || '',
    ingredients: lines
      .filter(
        (line) =>
          line.startsWith('| ') &&
          !line.startsWith('| Ingrediens') &&
          !line.startsWith('| ---'),
      )
      .map((line) => {
        const parts = line.split('|').map((part) => part.trim());
        return {
          name: parts[1] || '',
          amount: parseFloat(parts[2]) || 0,
          unit: parts[3] || '',
        };
      }),
    steps: lines
      .slice(lines.indexOf('## Oppskrift') + 1)
      .filter(Boolean)
      .reduce(
        (acc, line) => {
          const stepMatch = line.match(/^\d+\.\s(.+)/);
          if (stepMatch) {
            acc.push({
              text: stepMatch[1].trim(),
              type: 'step',
              duration: { min: 0, max: 0 },
            });
          }
          if (line.startsWith('\t- time: ')) {
            const timeMatch = line.match(/time:\s(.+?)$/);
            if (timeMatch) {
              acc[acc.length - 1].duration = parsePrettyTime(
                timeMatch[1].trim(),
              );
            }
          }
          if (line.startsWith('\t- type: ')) {
            const typeMatch = line.match(/type:\s(.+)/);
            if (typeMatch) {
              acc[acc.length - 1].type = typeMatch[1].trim() as 'step' | 'rest';
            }
          }
          return acc;
        },
        [] as Recipe['steps'],
      ),
  };

  return recipe;
}
