import { BeerShortInfo } from '@bw/types';
import { buildBeerGrid } from './beer-grid';

export const buildBeerDisplay = (
  {
    title,
    description,
    empty,
  }: { title: string; description: string; empty: string },
  beers: BeerShortInfo[] = []
): HTMLElement => {
  const root = document.createElement('div');
  root.classList.add('bw-beer-display');

  // Optional title
  if (title) {
    const elTitle = document.createElement('div');
    elTitle.textContent = title;
    elTitle.classList.add('title');
    root.appendChild(elTitle);
  }

  // Optional description
  if (description) {
    const elDesc = document.createElement('div');
    elDesc.textContent = description;
    elDesc.classList.add('desc');
    root.appendChild(elDesc);
  }

  // Generate beers grid
  if (beers.length) {
    const elGrid = buildBeerGrid(beers);
    root.appendChild(elGrid);
  }
  // Or return an empty message
  else {
    const elEmpty = document.createElement('div');
    elEmpty.textContent = empty;
    elEmpty.classList.add('bw-beer-display-empty');
    root.appendChild(elEmpty);
  }

  return root;
};
