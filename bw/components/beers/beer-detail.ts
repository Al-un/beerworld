import { Beer } from '@bw/types';

export const buildBeerDetail = (beer: Beer): HTMLElement => {
  const root = document.createElement('div');

  root.textContent = `TODO beer detail: ${beer}`;

  return root;
};
