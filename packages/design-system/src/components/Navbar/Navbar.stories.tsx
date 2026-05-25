import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../..';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
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
        description: 'Indique quel élément de la navbar est actuellement actif',
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
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  name: 'Navbar par défaut',
  args: {
    activeItem: 'none',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveHome: Story = {
  name: 'Navbar avec Home actif',
  args: {
    activeItem: 'home',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveStudy: Story = {
  name: 'Navbar avec Study actif',
  args: {
    activeItem: 'study',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};

export const ActiveProfile: Story = {
  name: 'Navbar avec Profile actif',
  args: {
    activeItem: 'profile',
    homeUrl: '/',
    studyUrl: '/study',
    profileUrl: '/profile',
  },
};