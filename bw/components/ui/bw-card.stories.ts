import {
  sbApplyBooleanAttr,
  StoryWithActionClick,
  StoryWithContent,
} from '@bw/storybook';
import { Story, Meta } from '@storybook/html';
import { BwCardAttrs } from './bw-card';

export default {
  title: 'BW/components/ui/Bw Card',
  argTypes: {
    content: { control: 'text' },
    header: { control: 'text' },
    footer: { control: 'text' },
    padded: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
  args: {
    header: `<h1>This is a header</h1>`,
    content: `<h2>This is a title</h2>\n<p>...Followed by a paragraphy...</p>`,
    footer: 'Pouet',
  },
} as Meta;

interface BwCardNamedSlots {
  footer?: string;
  header?: string;
}

const Template: Story<
  BwCardAttrs & StoryWithContent & StoryWithActionClick & BwCardNamedSlots
> = ({ content, header, footer, padded, onClick }) => {
  const bwCard = document.createElement('bw-card');

  bwCard.innerHTML =
    `${header ? '<div slot="header">' + header + '</div>' : ''}` +
    content +
    `${footer ? '<div slot="footer">' + footer + '</div>' : ''}`;

    sbApplyBooleanAttr(bwCard, { padded });
  bwCard.addEventListener('click', onClick);

  return bwCard;
};

export const Default = Template.bind({});

export const Padded = Template.bind({});
Padded.args = {
  padded: true,
};
