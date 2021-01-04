import { APP_CONTENT } from "./_common";
import "../styles/pages/detail.scss";

import { buildBeerDetail } from "../components";

const onInit = () => {
  const beerDetail = buildBeerDetail();
  APP_CONTENT.appendChild(beerDetail);
};

onInit();
