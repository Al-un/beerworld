import { APP_CONTENT } from './_common';
import '@bw/styles/pages/detail.scss';

import { buildBeerDetail } from '@bw/components';

const onInit = () => {
  const beerDetail = buildBeerDetail({
    id: 'todo',
    name: 'todo',
    mainPicture: 'todo',
    cheersCount: 0,
    description: ['todo'],
    drunkCount: 0,
  });
  APP_CONTENT.appendChild(beerDetail);
};

onInit();
