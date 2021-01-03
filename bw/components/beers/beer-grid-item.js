import { routes } from "../../constants";

export const buildBeerGridItem = (beer) => {
  const root = document.createElement("a");
  root.classList.add("bw-beer-grid-item");
  root.href = routes.DETAIL.replace("%%BEER_ID%%", beer.id);
  root.id = `beer-${beer.id}`;

  const img = document.createElement("img");
  img.alt = beer.name;
  img.classList.add("beer-main-picture");
  img.src = beer.mainPicture;
  img.title = beer.name;
  root.appendChild(img);

  const name = document.createElement("div");
  name.classList.add("beer-name");
  name.textContent = beer.name;
  root.appendChild(name);

  return root;
};
