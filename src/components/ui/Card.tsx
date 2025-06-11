import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'sera-card',
        hover && 'hover:shadow-sera dark:hover:shadow-glow',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;