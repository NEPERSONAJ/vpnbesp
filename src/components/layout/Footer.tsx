"use client";

import React from 'react';
import Link from 'next/link';
import { FaTelegram, FaShieldAlt } from 'react-icons/fa';
import { HiShieldCheck } from 'react-icons/hi';
import { SEO_CONFIG } from '@/constants/seo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const telegramSupport = SEO_CONFIG.telegram.support;
  const telegramChannel = SEO_CONFIG.telegram.channel;
  const telegramBot = SEO_CONFIG.telegram.bot;
  const siteName = SEO_CONFIG.openGraph.site_name;

  const footerLinks = [
    {
      title: 'О сервисе',
      links: [
        { label: 'Особенности', href: '#features' },
        { label: 'Контакты', href: telegramSupport },
      ],
    },
    {
      title: 'Поддержка',
      links: [
        { label: 'FAQ', href: '#faq' },
        { label: 'Техническая поддержка', href: telegramSupport },
      ],
    },
    {
      title: 'Правовая информация',
      links: [
        { label: 'Условия использования', href: '/legal/user-agreement' },
        { label: 'Политика конфиденциальности', href: '/legal/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute left-0 bottom-0 w-full h-40 bg-gradient-to-t from-accent-500/10 to-transparent"></div>
      <div className="absolute -right-40 top-20 w-80 h-80 rounded-full bg-glow-purple/5 filter blur-[100px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Логотип и контакты */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center text-xl font-bold text-white mb-5">
                <div className="mr-2 rounded-full bg-gradient-to-r from-accent-500 to-glow-purple p-1.5 text-white shadow-accent">
                  <HiShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-gradient-to-r from-accent-400 to-accent-200">{siteName}</span>
                <span className="ml-2 px-2 py-0.5 text-xs bg-accent-500 text-dark-900 rounded-full font-bold">FREE</span>
              </div>
            </Link>
            <p className="mb-5 text-dark-100 max-w-md">
              Бесплатный VPN сервис для безопасного и анонимного доступа к любым сайтам и сервисам.
              Без ограничений по времени, трафику и скорости.
            </p>

            <div className="mt-6 flex items-center space-x-4">
              <a 
                href={telegramBot} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-4 py-2 bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 rounded-lg transition-all duration-300"
              >
                <FaTelegram className="h-5 w-5 mr-2" />
                <span>Подключиться бесплатно</span>
              </a>
            </div>
          </div>

          {/* Ссылки */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-5 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-dark-100 hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Блок гарантии бесплатного VPN */}
        <div className="mt-12 p-6 rounded-xl bg-dark-800/70 border border-accent-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center">
                <FaShieldAlt className="h-6 w-6 text-accent-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Наша гарантия бесплатного VPN</h3>
              <p className="text-dark-100">
                {siteName} гарантирует, что базовый функционал нашего VPN всегда будет абсолютно бесплатным.
                Никаких скрытых платежей, принудительных подписок или ограничений.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-dark-700/50 text-dark-200 text-sm">
          <div className="flex flex-col md:flex-row justify-between">
            <p>© {currentYear} {siteName}. Все права защищены.</p>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/legal/user-agreement" 
                className="mr-5 hover:text-accent-400 transition-colors"
              >
                Условия использования
              </Link>
              <Link 
                href="/legal/terms" 
                className="hover:text-accent-400 transition-colors"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 