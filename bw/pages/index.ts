import { api } from './_common';
import '@bw/styles/pages/home.scss';

import { buildBeerDisplay } from '@bw/components';

let elBeerDisplay: HTMLElement | undefined = undefined;
const beerDisplayInfo = {
  title: 'Beer world!!',
  description: 'All the beers are here',
  empty: 'No beers at the moment T_T',
};

const onInit = () => {
  const app = document.getElementById('app');
  elBeerDisplay = buildBeerDisplay(beerDisplayInfo, []);
  app.appendChild(elBeerDisplay);

  api.beers.fetchBeers().then((data) => {
    app.removeChild(elBeerDisplay);
    elBeerDisplay = buildBeerDisplay(beerDisplayInfo, data);
    app.appendChild(elBeerDisplay);
  });
};

onInit();
