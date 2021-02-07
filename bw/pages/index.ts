import { api } from './_common';
import '@bw/styles/pages/home.scss';

import { BwBeerDisplay } from '@bw/components';

let elBeerDisplay: HTMLElement | undefined = undefined;
const beerDisplayInfo = {
  title: 'Beer world!!',
  description: 'All the beers are here',
  empty: 'No beers at the moment T_T',
};

const beerDisplay = new BwBeerDisplay();
beerDisplay.setAttribute('title', beerDisplayInfo.title);
beerDisplay.setAttribute('description', beerDisplayInfo.description);

const onInit = () => {
  const app = document.getElementById('app');
  app.appendChild(beerDisplay);

  beerDisplay.isLoading = true;
  api.beers.fetchBeers().then((data) => {
    beerDisplay.beers = data;
    beerDisplay.isLoading = false;
    // app.removeChild(elBeerDisplay);
    // elBeerDisplay = buildBeerDisplay(beerDisplayInfo, data);
    // app.appendChild(elBeerDisplay);
  });
};

onInit();
