"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SEO_CONFIG } from '@/constants/seo';
import { HiCheck, HiStar } from 'react-icons/hi';
import { FaGift } from 'react-icons/fa';

// Обновленные планы для бесплатного VPN сервиса
const freePlan = {
  id: 'free',
  name: 'Бесплатный',
  popular: false, 
  description: 'Полнофункциональный VPN без ограничений',
  price: 0,
  periodText: 'Навсегда',
  features: [
    'Неограниченное время использования',
    'Доступ ко всем сайтам',
    'Разблокировка YouTube, ChatGPT',
    'Средняя скорость',
    'Без ограничений трафика',
    'Поддержка в Телеграм'
  ],
  cta: 'Подключиться бесплатно',
  color: 'from-accent-500 to-glow-purple'
};

const donationPlans = [
  {
    id: 'supporter',
    name: 'Поддержка',
    popular: true,
    description: 'Помогите нам развивать бесплатный сервис',
    price: 99,
    periodText: '/ месяц',
    features: [
      'Всё из бесплатного тарифа',
      'Повышенная скорость',
      'Приоритетная поддержка',
      'Доступ к премиум серверам',
      'Без рекламы',
      'Статус "Спонсор" в сообществе'
    ],
    cta: 'Поддержать проект',
    color: 'from-glow-purple to-accent-500'
  },
  {
    id: 'sponsor',
    name: 'Спонсор',
    popular: false,
    description: 'Максимальная поддержка нашего проекта',
    price: 299,
    periodText: '/ месяц',
    features: [
      'Всё из тарифа "Поддержка"',
      'Максимальная скорость',
      'VIP поддержка 24/7',
      'Эксклюзивный доступ к новым функциям',
      'Возможность запроса новых серверов',
      'Личная благодарность в разделе спонсоров'
    ],
    cta: 'Стать спонсором',
    color: 'from-amber-500 to-glow-purple'
  }
];

interface PricingProps {
  plans?: any[];
}

export const PricingSection: React.FC<PricingProps> = ({ plans }) => {
  const telegramBot = SEO_CONFIG.telegram.bot;
  
  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-dark-800">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-20"></div>
      <div className="absolute -top-40 left-20 w-96 h-96 rounded-full bg-accent-500/10 filter blur-[100px]"></div>
      <div className="absolute -bottom-40 right-20 w-96 h-96 rounded-full bg-glow-purple/10 filter blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Наш VPN <span className="text-gradient-primary">100% бесплатный</span> для всех
          </h2>
          <p className="text-dark-100 text-lg">
            Мы верим, что каждый должен иметь доступ к свободному интернету без платы и ограничений.
            Но если вы хотите поддержать наш проект, есть дополнительные возможности.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Бесплатный тариф */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-dark-700/40 backdrop-blur-sm border border-accent-500/20 shadow-accent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rotate-12 bg-accent-500 text-dark-900 flex items-end justify-start p-2 font-bold">
              БЕСПЛАТНО
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaGift className="text-accent-400 mr-2 text-xl" />
                <h3 className="text-2xl font-bold text-white">{freePlan.name}</h3>
              </div>
              <p className="text-dark-200 mb-6">{freePlan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">0 ₽</span>
                <span className="text-dark-200 ml-1">{freePlan.periodText}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {freePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 text-accent-400 mr-2">
                      <HiCheck className="h-5 w-5" />
                    </span>
                    <span className="text-dark-100">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                fullWidth 
                variant="glow" 
                onClick={() => window.open(telegramBot, '_blank')}
                className="animate-gradient-x"
              >
                {freePlan.cta}
              </Button>
            </div>
          </motion.div>
          
          {/* Дополнительные тарифы для поддержки проекта */}
          {donationPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-dark-700/70 to-dark-800/70 border-2 border-accent-500/30 shadow-accent' 
                  : 'bg-dark-800/40 border border-dark-700/50'
              } backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  <HiStar className="inline-block mr-1" />
                  ПОПУЛЯРНЫЙ ВЫБОР
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-dark-200 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price} ₽</span>
                  <span className="text-dark-200 ml-1">{plan.periodText}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`flex-shrink-0 ${plan.popular ? 'text-accent-400' : 'text-dark-300'} mr-2`}>
                        <HiCheck className="h-5 w-5" />
                      </span>
                      <span className="text-dark-100">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  fullWidth 
                  variant={plan.popular ? 'glow' : 'outline'} 
                  onClick={() => window.open(telegramBot, '_blank')}
                  className={plan.popular ? 'animate-gradient-x' : ''}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Секция с гарантией и дополнительным призывом */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-dark-100 mb-6">
            <p className="text-lg font-medium mb-2">
              <span className="text-accent-400">100% гарантия бесплатного использования.</span>
            </p>
            <p>
              Мы обещаем, что базовый функционал нашего VPN всегда будет абсолютно бесплатным.
              Никаких скрытых платежей, пробных периодов или принудительных подписок.
            </p>
          </div>
          
          <Button 
            size="lg" 
            variant="glow" 
            onClick={() => window.open(telegramBot, '_blank')}
            className="animate-gradient-x"
          >
            Начать пользоваться бесплатно
          </Button>
        </motion.div>
      </div>
    </section>
  );
}; 