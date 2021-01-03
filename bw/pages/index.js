import "../layouts";
import "../styles/pages/index.scss";

import api from "../api";
import { APP_CONTENT } from "../utils";
import { buildBeerDisplay } from "../components";

let elBeerDisplay = undefined;
const beerDisplayInfo = {
  title: "Beer world!!",
  description: "All the beers are here",
  empty: "No beers at the moment T_T",
};

const onInit = () => {
  elBeerDisplay = buildBeerDisplay(beerDisplayInfo, beers);
  APP_CONTENT.appendChild(elBeerDisplay);

  api.beers.fetchBeers().then((data) => {
    APP_CONTENT.removeChild(elBeerDisplay);
    elBeerDisplay = buildBeerDisplay(beerDisplayInfo, data);
    APP_CONTENT.appendChild(elBeerDisplay);
  });
};

onInit();
