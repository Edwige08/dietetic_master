import type { Meta, StoryObj } from '@storybook/react';
import { FlashcardsTable } from './FlashcardsTable';


const meta: Meta<typeof FlashcardsTable> = {
  title: 'Components/FlashcardsTable',
  component: FlashcardsTable,
  tags: ['autodocs'],
  
  parameters: {
    docs: {
      description: {
        component: 'Tableau de flashcards. Permet d’afficher les flashcards d’un set de l’utilisateur connecté.',
      },
    },
  },

  //   TODO : gérer les argTypes ci-dessous en fonction des arguments de FlashcardsTable
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre du tableau de flashcards',
      table: {
        defaultValue: { summary: 'Flashcards' },
      },
    },
  },
};


export default meta;
type Story = StoryObj<typeof FlashcardsTable>;

export const Default: Story = {
  args: {
    title: 'Flashcards',
  },
};
