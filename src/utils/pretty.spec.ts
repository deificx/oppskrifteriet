import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

import { Recipe } from '@/types';
import { parse, pretty } from '@/utils/pretty';

const recipe: Recipe = {
  title: 'Delicious Bread',
  description: 'A simple and delicious bread recipe.',
  ingredients: [
    { name: 'Flour', amount: 500, unit: 'g' },
    { name: 'Water', amount: 300, unit: 'ml' },
    { name: 'Yeast', amount: 10, unit: 'g' },
  ],
  steps: [
    {
      text: 'Mix ingredients',
      type: 'step',
      duration: { min: 90, max: 180 },
    },
    {
      text: 'Rest dough',
      type: 'rest',
      duration: { min: 3600, max: 3600 },
    },
    {
      text: 'Bake bread',
      type: 'step',
      duration: { min: 1200, max: 1500 },
    },
  ],
};

describe('pretty', () => {
  it('should format recipe as github flavored markdown', () => {
    const result = pretty(recipe);
    return expect(result).toMatchFileSnapshot('pretty.ingredients.md');
  });
  it('should parse recipe from markdown', async () => {
    const markdown = await readFile('src/utils/pretty.ingredients.md', 'utf-8');
    const result = parse(markdown);
    expect(result).toEqual(recipe);
  });
});
