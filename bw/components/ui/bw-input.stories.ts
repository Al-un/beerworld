import { sbApplyAttrAsString, StoryWithActionInput } from '@bw/storybook';
import { Story, Meta } from '@storybook/html';
import { BwInputAttrs } from './bw-input';

export default {
  title: 'BW/components/ui/Bw Input',
  argsTypes: {
    error: { control: 'text' },
    label: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    label: 'This is the label of my input',
    value: '',
    error: '',
  },
  parameters: {
    actions: {
      handles: ['input'],
    },
  },
} as Meta;

const Template: Story<BwInputAttrs & StoryWithActionInput> = ({
  error,
  label,
  value,
  onInput,
}) => {
  const bwInput = document.createElement('bw-input');

  // bwInput.addEventListener('input', (ev) => {
  //   console.log('Received input', ev);
  //   console.log('Received value', (ev.target as any).value);
  // });

  sbApplyAttrAsString(bwInput, { label, value, error });

  return bwInput;
};

export const Default = Template.bind({});
