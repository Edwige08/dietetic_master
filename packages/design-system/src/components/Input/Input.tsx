import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required = false,
    id,
    className,
    wrapperClassName,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={[styles.input, wrapperClassName].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <input
        ref={ref}
        id={inputId}
        type={inputProps.type}
        required={required}
        className={[styles.inputField, className].filter(Boolean).join(' ')}
        {...inputProps}
      />
    </div>
  );
});