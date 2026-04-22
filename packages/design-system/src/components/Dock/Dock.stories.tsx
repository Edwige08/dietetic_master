import type { Meta, StoryObj } from '@storybook/react';
import { Dock } from './Dock';

const meta: Meta<typeof Dock> = {
  title: 'Components/Dock',
  component: Dock,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Composant de navigation principal, permettant d\'accéder aux différentes sections de l\'application.',
      },
    },
  },

  argTypes: {
    activeItem: {
      control: 'select',
      options: ['home', 'study', 'profile', 'none'],
        description: 'Indique quel élément de la dock est actuellement actif',
    },
    homeUrl: {
      description: 'URL de destination pour l\'élément "Home"',
    },
    studyUrl: {
      description: 'URL de destination pour l\'élément "Study"',
    },
    profileUrl: {
      description: 'URL de destination pour l\'élément "Profile"',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dock>;

export const Default: Story = {
  name: 'Dock par défaut',
  args: {
    activeItem: 'none',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveHome: Story = {
  name: 'Dock avec Home actif',
  args: {
    activeItem: 'home',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveStudy: Story = {
  name: 'Dock avec Study actif',
  args: {
    activeItem: 'study',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveProfile: Story = {
  name: 'Dock avec Profile actif',
  args: {
    activeItem: 'profile',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};