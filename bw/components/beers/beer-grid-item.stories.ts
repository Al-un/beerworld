import { Story, Meta } from '@storybook/html';

import { BeerShortInfo } from '@bw/types';
import {
  BwBeerGridItem as BwBeerGridItemElement,
  BwBeerGridItemAttr,
} from './beer-grid-item';
import { sbDecorateCenter } from '@bw/storybook';

export default {
  title: 'BW/components/beers/Bw Beer Grid Item',
  argsTypes: {
    beer: { control: 'object' },
    beerCheers: { control: 'number' },
    beerDrunk: { control: 'number' },
    beerId: { control: 'text' },
    beerImg: { control: 'text' },
    beerName: { control: 'text' },
  },
  args: {
    beer: {
      cheersCount: 12345,
      drunkCount: 12345,
      id: 1000008,
      name: '水曜日のネコ',
      mainPicture:
        'https://raw.githubusercontent.com/Al-un/beerworld/media/photos/yo-ho_suiyoubi-no-neko.jpg',
    },
  },
  decorators: [sbDecorateCenter],
} as Meta;

const Template: Story<BwBeerGridItemAttr & { beer: BeerShortInfo }> = ({
  beer,
}) => {
  const gridItem = document.createElement(
    'bw-beer-grid-item'
  ) as BwBeerGridItemElement;
  gridItem.beer = beer;

  return gridItem;
};

export const PortraitPic = Template.bind({});
export const LandscapePic = Template.bind({});
LandscapePic.args = {
  beer: {
    cheersCount: 12345,
    drunkCount: 12345,
    id: 1000008,
    name: '水曜日のネコ',
    mainPicture:
      'https://raw.githubusercontent.com/Al-un/beerworld/media/photos/banner-09.jpg',
  },
};
