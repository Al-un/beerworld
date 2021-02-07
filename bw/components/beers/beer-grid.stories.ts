import { Story, Meta } from '@storybook/html';

import { BeerShortInfo } from '@bw/types';
import { BwBeerGrid as BwBeerGridElement } from './beer-grid';
import { beers } from '@bw/mocks';

export default {
  title: 'BW/components/beers/Bw Beer Grid',
  argsTypes: {
    beers: { control: 'object' },
  },
  args: {
    beers: beers,
  },
} as Meta;

const Template: Story<{ beers: BeerShortInfo[] }> = ({ beers }) => {
  const bwBeerGrid = document.createElement(
    'bw-beer-grid'
  ) as BwBeerGridElement;
  bwBeerGrid.beers = beers;

  return bwBeerGrid;
};

export const BwBeerGrid = Template.bind({});
