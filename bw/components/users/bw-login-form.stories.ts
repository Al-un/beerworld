import { Story, Meta } from '@storybook/html';

import { sbDecorateCenter } from '@bw/storybook';

export default {
  title: 'BW/components/users/Bw Login Form',
  argTypes: {
    onLogin: { action: 'onLogin' },
  },
  decorators: [sbDecorateCenter],
} as Meta;

interface StoryWithActionLogin {
  onLogin: (ev: Event) => any;
}

export const BwLoginForm: Story<StoryWithActionLogin> = ({ onLogin }) => {
  const bwLoginForm = document.createElement('bw-login-form');

  bwLoginForm.addEventListener('login', onLogin);
  bwLoginForm.addEventListener('login', (ev) => console.log('LoginEvent', ev));

  return bwLoginForm;
};
