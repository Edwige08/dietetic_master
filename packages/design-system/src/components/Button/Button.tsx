import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isLoading?: boolean;
  loadingLabel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    type = 'button',
    isLoading = false,
    loadingLabel,
    disabled,
    className,
    ...buttonProps
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={[
        styles.button,
        styles[`button-${variant}`],
        isDisabled ? styles['button-disabled'] : '',
        className,
      ].filter(Boolean).join(' ')}
      {...buttonProps}
    >
      <span className={styles['button-text']}>
        {isLoading ? loadingLabel ?? children : children}
      </span>
    </button>
  );
});