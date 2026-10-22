import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Composants/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Principal: Story = {
  args: { children: 'Continuer', variant: 'primary' },
};

export const Secondaire: Story = {
  args: { children: 'Refaire le quiz', variant: 'secondary' },
};
