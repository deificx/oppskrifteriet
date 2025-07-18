import { describe, expect, it } from 'vitest';

import { parse, pretty } from '@/utils/pretty';

describe('pretty', () => {
  it('should format recipe as github flavored markdown', () => {
    const ingredients = [
      { name: 'Flour', amount: 500, unit: 'g' },
      { name: 'Water', amount: 300, unit: 'ml' },
      { name: 'Yeast', amount: 10, unit: 'g' },
    ];
    const result = pretty({
      title: 'Delicious Bread',
      description: 'A simple and delicious bread recipe.',
      ingredients,
      steps: [{ text: 'Mix ingredients', type: 'step', duration: 0 }],
    });
    expect(result).toMatchFileSnapshot('pretty.ingredients.md');
  });
  it('should parse recipe from markdown', () => {
    const markdown = `# Delicious Bread
> A simple and delicious bread recipe.
| Ingrediens | Mengde |
| --- | --- |
| Flour | 500 g |
| Water | 300 ml |
| Yeast | 10 g |
## Steps
1. Mix ingredients
`;
    const result = parse(markdown);
    expect(result).toEqual({
      title: 'Delicious Bread',
      description: 'A simple and delicious bread recipe.',
      ingredients: [
        { name: 'Flour', amount: 500, unit: 'g' },
        { name: 'Water', amount: 300, unit: 'ml' },
        { name: 'Yeast', amount: 10, unit: 'g' },
      ],
      steps: [{ text: 'Mix ingredients', type: 'step', duration: 0 }],
    });
  });
});
