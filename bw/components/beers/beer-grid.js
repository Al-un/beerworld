import { buildBeerGridItem } from "./beer-grid-item";

export const buildBeerGrid = (beers = []) => {
  const root = document.createElement("div");
  root.classList.add("bw-beer-grid");

  beers.forEach((beer) => {
    const gridItem = buildBeerGridItem(beer);
    root.appendChild(gridItem);
  });

  return root;
};
