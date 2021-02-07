import { Story, Meta } from '@storybook/html';
import { BwButtonAttrs } from './bw-button';
import {
  sbApplyBooleanAttr,
  StoryWithActionClick,
  StoryWithContent,
} from '@bw/storybook';

export default {
  title: 'BW/components/ui/Bw Button',
  argTypes: {
    content: { control: 'text' },
    solid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    outline: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
  args:{
    content: `<span>This is a button content</span>`
  }
} as Meta;

const Template: Story<
  BwButtonAttrs & StoryWithContent & StoryWithActionClick
> = ({ content, disabled, solid, outline, onClick }) => {
  const bwButton = document.createElement('bw-button');
  bwButton.innerHTML = content;

  sbApplyBooleanAttr(bwButton, { disabled, solid, outline });

  bwButton.addEventListener('click', onClick);

  return bwButton;
};

export const BwButton = Template.bind({});
