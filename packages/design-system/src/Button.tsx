import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
  const styles = {
    minHeight: '44px',
    padding: '0 20px',
    borderRadius: '999px',
    border: variant === 'primary' ? 'none' : '1px solid #5A5470',
    backgroundColor: variant === 'primary' ? '#FFA552' : '#FFFFFF',
    color: '#1E1636',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
  };

  return (
    <button type="button" onClick={onClick} style={styles}>
      {children}
    </button>
  );
};
