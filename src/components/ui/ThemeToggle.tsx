import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Leaf } from 'lucide-react';
import { useTheme } from '../../app/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative h-12 w-12 rounded-2xl border border-sera-200/40 dark:border-neutral-700/40 transition-all duration-500 group overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Enhanced background with SERA branding */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 group-hover:from-neutral-700 group-hover:via-neutral-800 group-hover:to-neutral-700'
          : 'bg-gradient-to-br from-sera-50 via-white to-ocean-50 group-hover:from-sera-100 group-hover:via-sera-50 group-hover:to-ocean-100'
      }`} />
      
      {/* Floating orb effect */}
      <motion.div
        className={`absolute inset-1 rounded-xl transition-all duration-700 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-neutral-700 to-neutral-900 shadow-inner'
            : 'bg-gradient-to-br from-white to-sera-100 shadow-inner'
        }`}
        animate={{
          boxShadow: theme === 'dark' 
            ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' 
            : 'inset 0 2px 4px rgba(22, 163, 74, 0.1)'
        }}
      />
      
      {/* Icon container */}
      <div className="relative h-full w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Moon with glow effect */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-ocean-400 rounded-full blur-md opacity-60"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Moon className="h-5 w-5 text-ocean-400 relative z-10" />
              </div>
              
              {/* Floating stars */}
              <motion.div
                className="absolute -top-1 -right-1 w-1 h-1 bg-ocean-300 rounded-full"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-ocean-300 rounded-full"
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0, rotate: 180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: -180 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Sun with rays and eco elements */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-sera-400 rounded-full blur-md opacity-60"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Sun className="h-5 w-5 text-sera-600 relative z-10" />
              </div>
              
              {/* Floating leaves for eco theme */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ 
                  rotate: [0, 360],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Leaf className="h-2 w-2 text-sera-500" />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-1"
                animate={{ 
                  rotate: [360, 0],
                  scale: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Leaf className="h-1.5 w-1.5 text-sera-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 2, 
          opacity: [0, 0.3, 0],
          transition: { duration: 0.6 }
        }}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(22, 163, 74, 0.3) 0%, transparent 70%)'
        }}
      />
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        theme === 'dark'
          ? 'shadow-glow-ocean'
          : 'shadow-glow'
      }`} />
    </motion.button>
  );
}