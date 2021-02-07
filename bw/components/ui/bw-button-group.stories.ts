import { Story, Meta } from '@storybook/html';

export default {
  title: 'BW/components/ui/Bw Button Group',
  argsTypes: {
    buttonsCount: {
      label: 'Number of buttons',
      control: 'number',
      min: 1,
    },
  },
  args: {
    buttonsCount: 2,
  },
} as Meta;

const Template: Story<{ buttonsCount: number }> = ({ buttonsCount }) => {
  const bwButtonGroup = document.createElement('bw-button-group');

  for (let i = 1; i <= buttonsCount; i++) {
    const bwButton = document.createElement('bw-button');
    bwButton.textContent = `Button #${i}`;

    bwButtonGroup.appendChild(bwButton);
  }
  return bwButtonGroup;
};

export const BwButtonGroup = Template.bind({});
