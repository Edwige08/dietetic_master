import type { Meta, StoryObj } from '@storybook/react';
import { CardFeature } from './CardFeature';

const meta: Meta<typeof CardFeature> = {
  title: 'Components/CardFeature',
  component: CardFeature,
  tags: ['autodocs'],
  
  parameters: {
    docs: {
      description: {
        component: 'Composant de base pour toutes les actions utilisateur. Disponible en variante primaire, secondaire, succès, avertissement et danger.',
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Définit le style visuel du bouton',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardFeature>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <CardFeature variant="primary" title="Primary" description="Primary description" />
      <CardFeature variant="secondary" title="Secondary" description="Secondary description" />
      <CardFeature variant="success" title="Success" description="Success description" />
      <CardFeature variant="danger" title="Danger" description="Danger description" />
      <CardFeature variant="warning" title="Warning" description="Warning description" />
    </div>
  ),
};

export const Primary: Story = {
  name: 'Variante primaire',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour présenter une feature avec un titre, une description et une couleur d’arrière-plan différente selon la variante choisie.',
      },
    },
  },
  args: {
    title: 'Primary',
    description: 'Primary description',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Variante secondaire',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour présenter une feature avec un titre, une description et une couleur d’arrière-plan différente selon la variante choisie.',
      },
    },
  },
  args: {
    title: 'Secondary',
    description: 'Secondary description',
    variant: 'secondary',
  },
};

export const Success: Story = {
  name: 'Variante succès',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour présenter une feature avec un titre, une description et une couleur d’arrière-plan différente selon la variante choisie.',
      },
    },
  },
  args: {
    title: 'Success',
    description: 'Success description',
    variant: 'success',
  },
};

export const Warning: Story = {
  name: 'Variante avertissement',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour présenter une feature avec un titre, une description et une couleur d’arrière-plan différente selon la variante choisie.',
      },
    },
  },
  args: {
    title: 'Warning',
    description: 'Warning description',
    variant: 'warning',
  },
};

export const Danger: Story = {
  name: 'Variante danger',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour présenter une feature avec un titre, une description et une couleur d’arrière-plan différente selon la variante choisie.',
      },
    },
  },
  args: {
    title: 'Danger',
    description: 'Danger description',
    variant: 'danger',
  },
};
