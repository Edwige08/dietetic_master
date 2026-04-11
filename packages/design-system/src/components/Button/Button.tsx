import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

export const Button = ({ 
  children, 
  variant, 
  onClick 
}: ButtonProps) => {

  return (
    <button onClick={onClick} className={`${styles.button} ${styles[`button-${variant}`]}`}>
      <p className={`${styles[`button-text`]}`}>
        {children}
      </p>
    </button>
  );
};