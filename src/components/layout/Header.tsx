"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { HiMenu, HiX, HiShieldCheck } from 'react-icons/hi';
import { SEO_CONFIG } from '@/constants/seo';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const telegramBot = SEO_CONFIG.telegram.bot;
  const siteName = SEO_CONFIG.openGraph.site_name;

  // Оптимизированное отслеживание скролла с использованием useCallback и throttle
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    // Throttle-функция для ограничения частоты вызовов обработчика скролла
    let isThrottled = false;
    
    const throttledScrollHandler = () => {
      if (!isThrottled) {
        handleScroll();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 100); // Проверяем скролл не чаще, чем раз в 100мс
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [handleScroll]);

  const navLinks = [
    { href: '#features', label: 'Возможности' },
    { href: '#pricing', label: 'Тарифы' },
    { href: '#faq', label: 'FAQ' },
  ];

  const handleTelegramClick = () => {
    window.open(telegramBot, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg border-b border-dark-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Логотип */}
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-bold text-white">
                <span className="text-gradient-primary">{siteName}</span>
              </div>
            </div>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link 
                  href={link.href}
                  className="text-dark-100 hover:text-accent-400 transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Кнопка для десктопа */}
          <div className="hidden md:flex items-center">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Button 
                variant="glow" 
                size="sm"
                onClick={handleTelegramClick}
                className="animate-gradient-x"
              >
                Подключиться бесплатно
              </Button>
            </motion.div>
          </div>

          {/* Кнопка мобильного меню */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-dark-100 hover:text-accent-400 transition-colors"
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

            {/* Мобильное меню */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden absolute top-full left-0 right-0 mt-1 mx-3 sm:mx-4 py-4 glass rounded-lg shadow-accent"
                >
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-dark-100 hover:text-accent-400 transition-colors duration-200 px-4 py-2 rounded-md hover:bg-dark-800/50 text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                    <Button 
                      variant="glow" 
                      size="sm" 
                      className="mx-4 mt-2 text-sm"
                      onClick={() => {
                        window.open(telegramBot, '_blank');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Подключиться бесплатно
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
      </div>
    </header>
  );
};