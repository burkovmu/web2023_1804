import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none disabled:opacity-50';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl hover:shadow-accent/20',
    secondary: 'bg-foreground text-background hover:bg-foreground/90 shadow-md hover:shadow-lg',
    outline: 'border-2 border-accent text-accent hover:bg-accent/10',
    gradient: 'bg-gradient-to-r from-accent to-secondary text-white hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-accent/20',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  const buttonMotion = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  };
  
  if (href) {
    return (
      <Link href={href} passHref>
        <motion.a 
          className={styles}
          {...buttonMotion}
          onClick={onClick}
        >
          {children}
        </motion.a>
      </Link>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={styles}
      onClick={onClick}
      {...buttonMotion}
    >
      {children}
    </motion.button>
  );
};

export default Button; 