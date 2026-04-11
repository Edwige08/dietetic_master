import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    children: {
      description: 'Contenu affiché dans le bouton',
    },
    onClick: {
      action: 'clicked',
      description: 'Fonction appelée au clic',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
};

export const Primary: Story = {
  name: 'Variante primaire',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour les actions principales (ex : inscription, validation, soumission).',
      },
    },
  },
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  name: 'Variante secondaire',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour les actions secondaires (ex : connexion).',
      },
    },
  },
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Success: Story = {
  name: 'Variante succès',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour indiquer une action réussie ou positive.',
      },
    },
  },
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Warning: Story = {
  name: 'Variante avertissement',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour indiquer une action qui nécessite de l’attention ou un avertissement.',
      },
    },
  },
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

export const Danger: Story = {
  name: 'Variante danger',
  parameters: {
    docs: {
      description: {
        story: 'Utilisée pour indiquer une action dangereuse ou destructive (ex : suppression).',
      },
    },
  },
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};