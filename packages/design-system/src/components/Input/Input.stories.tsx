import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  
  parameters: {
    docs: {
      description: {
        component: 'Composant de base pour toutes les actions utilisateur. Disponible en variante texte, email, nombre, mot de passe et date.',
      },
    },
  },

  argTypes: {
    label: {
      description: 'Contenu affiché dans le champ de saisie',
    },
    onChange: {
      action: 'changed',
      description: 'Callback appelé lors de la saisie',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Input label="Text Input" placeholder="John Doe" />
      <Input label="Email Input" placeholder="john@example.com" />
      <Input label="Number Input" placeholder="12" />
      <Input label="Password Input" placeholder="********" />
      <Input label="Date Input" />
    </div>
  ),
};

export const Default: Story = {
  name: 'Par defaut',
  parameters: {
    docs: {
      description: {
        story: 'Usage non controle classique avec les props natives HTML.',
      },
    },
  },
  args: {
    label: 'Adresse email',
    placeholder: 'john.doe@example.com',
    name: 'email',
    autoComplete: 'email',
    required: true,
  },
};

export const Controlled: Story = {
  name: 'Controle',
  parameters: {
    docs: {
      description: {
        story: 'Exemple de branchement avec value et onChange pour un formulaire React/Next.js.',
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(event) => {
          args.onChange?.(event);
          setValue(event.target.value);
        }}
      />
    );
  },
  args: {
    label: 'Mot de passe',
    placeholder: '********',
    name: 'password',
    autoComplete: 'current-password',
    required: true,
  },
};

export const Disabled: Story = {
  name: 'Desactive',
  args: {
    label: 'Champ indisponible',
    placeholder: 'Lecture seule',
    disabled: true,
  },
};