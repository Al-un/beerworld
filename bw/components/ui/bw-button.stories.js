export default {
  title: 'Test/Bw Button',
  args: {
    text: 'Pouet',
  },
  argTypes: {
    text: { control: 'text' },
  },
};

const Template = ({ text }) => {
  return `<bw-button>${text}</bw-button>`;
};

export const Default = Template.bind({});
