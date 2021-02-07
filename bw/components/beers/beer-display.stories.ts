import { Story, Meta } from '@storybook/html';

import { BeerShortInfo } from '@bw/types';
import {
  BwBeerDisplay as BwBeerDisplayElement,
  BwBeerDisplayAttrs,
} from './beer-display';
import { beers } from '@bw/mocks';
import { sbApplyAttrAsString, sbApplyBooleanAttr } from '@bw/storybook';

export default {
  title: 'BW/components/beers/Bw Beer Display',
  argsTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    loading: { control: 'boolean' },
    beers: { control: 'object' },
  },
  args: {
    beers: beers,
    title: 'Beers',
    description: 'A lutov beersssssssss!!!!',
    loading: true,
  },
} as Meta;

const Template: Story<BwBeerDisplayAttrs & { beers: BeerShortInfo[] }> = ({
  title,
  description,
  loading,
  beers,
}) => {
  const bwBeerDisplay = document.createElement(
    'bw-beer-display'
  ) as BwBeerDisplayElement;
  bwBeerDisplay.beers = beers;

  sbApplyBooleanAttr(bwBeerDisplay, { loading });
  sbApplyAttrAsString(bwBeerDisplay, { title, description });

  return bwBeerDisplay;
};

export const BwBeerDisplay = Template.bind({});
