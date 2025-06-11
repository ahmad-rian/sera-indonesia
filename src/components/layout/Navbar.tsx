// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  AlertTriangle, 
  BarChart3, 
  Sprout, 
  Users, 
  Info,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Beranda', href: '/', icon: Home },
  { name: 'Krisis', href: '/crisis', icon: AlertTriangle, badge: true },
  { name: 'Data', href: '/data', icon: BarChart3 },
  { name: 'Aksi', href: '/action', icon: Sprout },
  { name: 'Komunitas', href: '/community', icon: Users },
  { name: 'Tentang', href: '/about', icon: Info },
];

// Theme Toggle Component
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-800/70"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const emergencyCount = 3;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-lg border-b border-gray-200/50 dark:border-slate-700/50' 
          : 'backdrop-blur-sm bg-white/70 dark:bg-slate-900/70'
      }`}
    >
      {/* Clean glassmorphism overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-emerald-50/20 via-white/30 to-teal-50/20 dark:from-slate-900/30 dark:via-slate-800/30 dark:to-slate-900/30 backdrop-blur-xl' 
          : 'bg-transparent'
      }`} />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          
          {/* SERA Logo Section */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 z-10 group">
            <motion.div 
              className="flex items-center justify-center transition-all duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex items-center justify-center transition-all duration-300">
                <img
                  src="/assets/icons/logo.png"
                  alt="SERA Logo"
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                />
              </div>
            </motion.div>
            
            <div className="block">
              <motion.h1 
                className={`text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 ${
                  scrolled 
                    ? 'text-slate-800 dark:text-white' 
                    : 'text-slate-800 dark:text-white drop-shadow-lg'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block sm:hidden">SERA INDONESIA 🇮🇩</span>
                <span className="hidden sm:block">SERA INDONESIA 🇮🇩</span>
              </motion.h1>
              <motion.p 
                className={`text-xs sm:text-sm transition-all duration-300 ${
                  scrolled 
                    ? 'text-slate-600 dark:text-slate-300' 
                    : 'text-slate-600 dark:text-slate-300 drop-shadow-md'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block sm:hidden">Semesta Ruang Alam</span>
                <span className="hidden sm:block lg:block">SEMESTA RUANG ALAM</span>
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const hasEmergency = item.name === 'Krisis' && emergencyCount > 0;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`group relative flex items-center space-x-2 px-3 xl:px-4 py-2.5 rounded-xl xl:rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/50 shadow-lg'
                        : scrolled 
                          ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm' 
                          : 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/30 dark:hover:bg-slate-800/30 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/20'
                    }`}
                  >
                    <div className="absolute inset-0 rounded-xl xl:rounded-2xl bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300 backdrop-blur-sm" />
                    
                    <div className="relative z-10">
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                      {hasEmergency && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"
                        />
                      )}
                    </div>
                    <span className="z-10 hidden xl:block">{item.name}</span>
                    
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 ${
                      isActive ? 'w-6 xl:w-8' : 'w-0 group-hover:w-6 xl:group-hover:w-8'
                    }`} />
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="ml-2 xl:ml-4"
            >
              <Link
                to="/report"
                className="inline-flex items-center space-x-1.5 px-3 xl:px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium rounded-xl xl:rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden xl:block">Lapor Masalah</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="ml-2 xl:ml-4"
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                scrolled 
                  ? 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:shadow-lg backdrop-blur-sm' 
                  : 'text-slate-700 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-800/30 backdrop-blur-sm hover:shadow-lg'
              }`}
            >
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden relative"
          >
            <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-slate-700/50" />
            
            <div className="relative px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                const hasEmergency = item.name === 'Krisis' && emergencyCount > 0;
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/50 shadow-lg'
                          : 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm'
                      }`}
                    >
                      <div className={`relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                        isActive
                          ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20'
                          : 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 group-hover:from-emerald-500/20 group-hover:to-teal-500/20'
                      }`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:scale-110" />
                        {hasEmergency && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"
                          />
                        )}
                      </div>
                      <span className="font-medium text-sm sm:text-base">{item.name}</span>
                      {item.name === 'Krisis' && hasEmergency && (
                        <span className="ml-auto text-xs text-red-500 font-medium">
                          {emergencyCount}
                        </span>
                      )}
                      
                      <motion.div 
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ x: 2 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1 + 0.2, duration: 0.3 }}
                className="pt-3 mt-3 border-t border-gray-200/50 dark:border-slate-700/50"
              >
                <Link
                  to="/report"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md"
                >
                  <FileText className="h-5 w-5" />
                  <span>Laporkan Masalah Lingkungan</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;