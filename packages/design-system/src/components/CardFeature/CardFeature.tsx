import React, { forwardRef } from 'react';
import styles from './CardFeature.module.css';

export interface CardFeatureProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const CardFeature: React.FC<CardFeatureProps> = (function CardFeature(
  {
    title,
    description,
    variant,
  },
) {
  return (
    <article className={`card ${styles[`bg-${variant}-light`]}`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
});