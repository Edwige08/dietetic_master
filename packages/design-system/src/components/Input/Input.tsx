import React, { forwardRef, useId, useState } from 'react';
import styles from './Input.module.css';
import { EyeSlash, Eye } from "@phosphor-icons/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  showPasswordToggle?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required,
    id,
    disabled = false,
    className,
    type,
    showPasswordToggle,
    ...inputProps
  },
  ref,
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const showToggleIcon = type === "password" && (showPasswordToggle ?? true);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={[styles.input].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label}&nbsp;{required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={inputId}
          type={showToggleIcon && isPasswordVisible ? "text" : type}
          required={required}
          disabled={disabled}
          className={[
            styles.inputField,
            showToggleIcon ? styles.inputFieldWithToggle : "",
            className,
          ].filter(Boolean).join(" ")}
          {...inputProps}
        />
        {showToggleIcon && (
        <button
          type="button"
          className={styles.passwordToggleBtn}
          onClick={togglePasswordVisibility}
          disabled={disabled}
          aria-label={isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {isPasswordVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
        </button>
        )}
      </div>
    </div>
  );
});