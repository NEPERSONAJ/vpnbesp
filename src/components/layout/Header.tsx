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
    <header 
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 will-change-transform ${
        isScrolled ? 'backdrop-blur-md bg-dark-900/85 py-2 shadow-accent' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/">
            <motion.div 
              className="flex items-center text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mr-2 rounded-full bg-gradient-to-r from-accent-500 to-glow-purple p-1.5 text-white shadow-accent">
                <HiShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-gradient-to-r from-accent-400 to-accent-200 font-bold">{siteName}</span>
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent-500 text-dark-900 rounded-full font-bold">FREE</span>
            </motion.div>
          </Link>

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

        {/* Мобильное меню с оптимизированной анимацией */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 glass rounded-lg shadow-accent"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="text-dark-100 hover:text-accent-400 transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-dark-500">
                  <Button 
                    variant="glow" 
                    fullWidth
                    onClick={handleTelegramClick}
                    className="animate-gradient-x"
                  >
                    Подключиться бесплатно
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}; 