"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SEO_CONFIG } from '@/constants/seo';
import { 
  HiShieldCheck, 
  HiLightningBolt, 
  HiDeviceMobile, 
  HiCube, 
  HiSupport,
  HiClock,
  HiServer,
  HiLockClosed,
} from 'react-icons/hi';
import { FaBan, FaGlobeAmericas, FaYoutube, FaRobot } from 'react-icons/fa';

const iconMap = {
  shield: HiShieldCheck,
  bolt: HiLightningBolt,
  globe: FaGlobeAmericas,
  devices: HiDeviceMobile,
  interface: HiCube,
  support: HiSupport,
  clock: HiClock,
  server: HiServer,
  lock: HiLockClosed,
  ban: FaBan,
  youtube: FaYoutube,
  ai: FaRobot,
};

// Обновленные возможности для бесплатного VPN
const freeVpnFeatures = [
  {
    icon: 'clock',
    title: 'Без ограничений по времени',
    description: 'Используйте VPN так долго, как вам нужно. Никаких ограничений по времени или принудительных отключений.'
  },
  {
    icon: 'globe',
    title: 'Доступ ко всем сайтам',
    description: 'Разблокируйте любой контент из любой точки мира без ограничений и цензуры.'
  },
  {
    icon: 'youtube',
    title: 'Свободный доступ к YouTube',
    description: 'Смотрите YouTube без региональных ограничений, рекламы и отслеживания вашей активности.'
  },
  {
    icon: 'ai',
    title: 'Доступ к ChatGPT и AI',
    description: 'Используйте ChatGPT, Midjourney и другие AI сервисы из любой страны совершенно бесплатно.'
  },
  {
    icon: 'bolt',
    title: 'Высокая скорость соединения',
    description: 'Наслаждайтесь быстрым и стабильным соединением без ограничений скорости и трафика.'
  },
  {
    icon: 'ban',
    title: 'Никакой рекламы',
    description: 'Бесплатный VPN без назойливой рекламы, всплывающих окон и спама.'
  },
  {
    icon: 'shield',
    title: 'Полная анонимность',
    description: 'Ваш IP-адрес и данные надежно защищены. Мы не ведем логов вашей активности.'
  },
  {
    icon: 'server',
    title: 'Серверы по всему миру',
    description: 'Выбирайте из множества серверов по всему миру для лучшей производительности и доступа.'
  },
  {
    icon: 'devices',
    title: 'Для всех устройств',
    description: 'Используйте на компьютере, телефоне или планшете. Поддержка Windows, Mac, iOS и Android.'
  }
];

export const FeaturesSection = () => {
  const siteName = SEO_CONFIG.openGraph.site_name;
  
  return (
    <section id="features" className="bg-dark-900 py-20 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute -left-40 top-40 w-80 h-80 rounded-full bg-accent-500/20 blur-[80px]"></div>
      <div className="absolute -right-40 bottom-40 w-80 h-80 rounded-full bg-glow-purple/20 blur-[80px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-block mb-4">
            <span className="free-badge">100% БЕСПЛАТНО</span>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Все преимущества {siteName} абсолютно <span className="text-gradient-primary">бесплатно</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg text-dark-100">
            Никаких скрытых платежей, ограничений скорости или трафика. 
            Просто мощный и безопасный VPN, доступный каждому.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {freeVpnFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={index}
                className="group glass-card rounded-xl p-6 overflow-hidden relative transform-gpu transition-all duration-300 hover:translate-y-[-5px] hover:shadow-accent"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Светящийся фон при наведении */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-600/0 to-accent-600/0 group-hover:from-accent-600/5 group-hover:to-accent-600/3 transition-all duration-300 -z-10"></div>
                
                {/* Блестящая линия с упрощенной анимацией */}
                <div className="absolute h-[200%] w-1 top-0 -left-10 bg-white/3 group-hover:translate-x-[300px] duration-1500 transition-all transform rotate-12 -z-10"></div>
                
                <div className="mb-4 vpn-feature-icon">
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-dark-100">{feature.description}</p>
                
                {/* Небольшой бейдж "Бесплатно" в углу */}
                <div className="absolute top-3 right-3 text-xs font-semibold text-accent-300">
                  100% FREE
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Добавляем баннер с призывом к действию */}
        <motion.div
          className="mt-16 rounded-2xl bg-gradient-to-r from-accent-700/20 to-glow-purple/20 p-8 shadow-accent border border-accent-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-2">Начните использовать бесплатный VPN прямо сейчас</h3>
              <p className="text-dark-100">Без регистрации, без скрытых платежей, просто кликните и пользуйтесь</p>
            </div>
            <a 
              href={SEO_CONFIG.telegram.bot} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-400 text-dark-900 font-semibold rounded-lg transition-all duration-300 shadow-accent"
            >
              Подключиться бесплатно
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};