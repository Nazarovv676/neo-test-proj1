import React from 'react';
import styles from './Loader.module.css';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
  overlay?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  className = '',
  overlay = false,
}) => {
  const loaderClasses = [
    styles.loader,
    styles[variant],
    styles[size],
    overlay ? styles.overlay : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className={styles.dots}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
          </div>
        );
      case 'pulse':
        return <div className={styles.pulse} />;
      case 'spinner':
      default:
        return <div className={styles.spinner} />;
    }
  };

  return <div className={loaderClasses}>{renderLoader()}</div>;
};
