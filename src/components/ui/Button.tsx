"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  fullWidth = false,
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-accent-500 hover:bg-accent-400 text-dark-900 font-medium shadow-lg hover:shadow-xl',
    secondary: 'bg-glow-purple hover:bg-glow-indigo text-white shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-accent-500/40 text-accent-300 hover:bg-dark-700/50 hover:border-accent-400/60',
    ghost: 'bg-transparent text-accent-300 hover:bg-dark-700/50',
    glow: 'bg-gradient-to-r from-accent-500 to-glow-purple text-white shadow-accent hover:shadow-neon-intense'
  };

  const sizeClasses = {
    sm: 'py-1.5 px-4 text-sm',
    md: 'py-2.5 px-6 text-base',
    lg: 'py-3.5 px-8 text-lg',
  };

  const baseClasses = 'rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-opacity-50 backdrop-blur-sm';
  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const glowEffect = variant === 'glow' 
    ? 'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-accent-500/20 before:via-glow-purple/20 before:to-accent-400/20 before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity relative overflow-hidden before:-z-10 after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-opacity hover:after:opacity-100 after:bg-accent-400/10 after:-z-10'
    : '';
  
  const hoverScale = 'hover:translate-y-[-2px]';

  const buttonClasses = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    disabledClasses,
    glowEffect,
    hoverScale,
    className
  );

  const buttonContent = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.02 },
    whileTap: disabled ? undefined : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 20, duration: 0.2 },
  };

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        <motion.span 
          {...motionProps}
          className="flex w-full items-center justify-center will-change-transform"
        >
          {buttonContent}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}; 