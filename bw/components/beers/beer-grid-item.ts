import { BeerShortInfo } from '@bw/types';
import { routes } from '../../constants';

/**
 *
 * @param {Event} e
 */
const onCheer = (e: MouseEvent, beer: BeerShortInfo) => {
  e.preventDefault();
  console.log('Cheer!!!', beer);
};

/**
 *
 * @param {Event} e
 */
const onDrink = (e: MouseEvent, beer: BeerShortInfo) => {
  e.preventDefault();
  console.log('Drink!!!');
};

export const buildBeerGridItem = (beer: BeerShortInfo) => {
  const root = document.createElement('a');
  root.classList.add('bw-beer-grid-item');
  root.href = routes.DETAIL.replace('%%BEER_ID%%', beer.id.toString());
  root.id = `beer-${beer.id}`;

  // Beer main picture
  const img = document.createElement('img');
  img.alt = beer.name;
  img.classList.add('beer-main-picture');
  img.src = beer.mainPicture;
  img.title = beer.name;
  root.appendChild(img);

  // Beer name
  const name = document.createElement('div');
  name.classList.add('beer-name');
  name.textContent = beer.name;
  root.appendChild(name);

  // Beer actions: cheers and drink
  const actions = document.createElement('div');
  actions.classList.add('beer-actions');
  actions.classList.add('bw-button-group');

  const cheerBtn = document.createElement('bw-button');
  cheerBtn.innerHTML = `${beer.cheersCount}<br />Cheers`;
  cheerBtn.addEventListener('click', (e) => onCheer(e, beer));
  const drinkBtn = document.createElement('bw-button');
  drinkBtn.innerHTML = `${beer.drunkCount}<br />Drunk`;
  drinkBtn.addEventListener('click', (e) => onDrink(e, beer));
  actions.appendChild(cheerBtn);
  actions.appendChild(drinkBtn);

  root.appendChild(actions);

  return root;
};
