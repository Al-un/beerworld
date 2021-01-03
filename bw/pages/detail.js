import "../layouts";
import "../styles/pages/detail.scss";

import { buildBeerDetail } from "../components";
import { APP_CONTENT } from "../utils";

const onInit = () => {
  const beerDetail = buildBeerDetail();
  APP_CONTENT.appendChild(beerDetail);
};

onInit();
