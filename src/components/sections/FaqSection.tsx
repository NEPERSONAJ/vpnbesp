"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi';
import { SEO_CONFIG } from '@/constants/seo';
import { FaTelegram } from 'react-icons/fa';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const siteName = SEO_CONFIG.openGraph.site_name;

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const faqItems: FaqItem[] = [
    {
      question: 'Действительно ли VPN полностью бесплатный?',
      answer: `Да, ${siteName} — это полностью бесплатный VPN сервис без каких-либо скрытых платежей, ограничений по времени, скорости или трафику. Мы верим, что каждый имеет право на свободный и безопасный доступ в интернет.`,
    },
    {
      question: 'Как вы поддерживаете бесплатный сервис?',
      answer: `${siteName} существует благодаря добровольным пожертвованиям от пользователей, которые ценят наш сервис. Мы также имеем опциональные планы поддержки, которые предоставляют дополнительные преимущества для тех, кто хочет поддержать развитие проекта.`,
    },
    {
      question: 'Что такое VPN и зачем он нужен?',
      answer: 'VPN (Виртуальная Частная Сеть) — технология, создающая защищенное соединение между вашим устройством и интернетом. VPN шифрует ваш трафик, защищая данные от посторонних глаз, включая интернет-провайдеров. Это особенно важно при использовании публичных Wi-Fi сетей, для защиты личной информации и обеспечения конфиденциальности в интернете.',
    },
    {
      question: `На каких устройствах можно использовать ${siteName}?`,
      answer: `${siteName} работает на всех популярных устройствах и операционных системах, включая Windows, macOS, iOS, Android и Linux. Вы можете использовать один аккаунт на неограниченном количестве устройств одновременно.`,
    },
    {
      question: 'Есть ли ограничения на скорость или трафик?',
      answer: `Нет, ${siteName} не имеет никаких ограничений на скорость соединения или объем передаваемого трафика. Вы можете использовать наш VPN без ограничений для стриминга видео в высоком качестве, загрузки файлов и любой другой активности в интернете.`,
    },
    {
      question: `Как начать использовать ${siteName}?`,
      answer: `Начать пользоваться ${siteName} очень просто: нажмите на кнопку "Подключиться бесплатно", перейдите в наш Telegram бот и следуйте инструкциям. Весь процесс занимает менее минуты, и вы сразу же получите доступ ко всем серверам.`,
    },
    {
      question: `Безопасно ли использовать бесплатный VPN?`,
      answer: `${siteName} обеспечивает такой же уровень безопасности, как и платные аналоги. Мы используем современные протоколы шифрования, не ведем логов активности пользователей и не продаем ваши данные третьим лицам. Ваша безопасность — наш главный приоритет, вне зависимости от того, используете ли вы бесплатный сервис или поддерживаете нас финансово.`,
    },
    {
      question: `Ведет ли ${siteName} логи активности пользователей?`,
      answer: `Нет, ${siteName} придерживается строгой политики отсутствия логирования. Мы не отслеживаем, не записываем и не храним информацию о вашей онлайн-активности, посещаемых сайтах или загружаемых файлах.`,
    },
  ];

  return (
    <section id="faq" className="bg-dark-900 py-20 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-20"></div>
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-accent-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-96 bg-glow-purple/10 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center justify-center mb-4 p-2 rounded-full bg-accent-500/10">
            <HiQuestionMarkCircle className="text-accent-400 w-6 h-6 mr-2" />
            <span className="text-accent-300 font-medium">FAQ</span>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Часто задаваемые вопросы о <span className="text-gradient-primary">бесплатном VPN</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-100">
            Ответы на популярные вопросы о нашем бесплатном VPN сервисе.
            Если вы не нашли ответ, свяжитесь с нами в Telegram.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="mb-4 overflow-hidden rounded-xl bg-dark-800/60 border border-accent-500/10 backdrop-blur-sm shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left text-lg font-medium text-white focus:outline-none"
                onClick={() => toggleItem(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={expandedIndex === index ? "text-accent-400" : "text-dark-300"}
                >
                  <HiChevronDown className="h-6 w-6" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-dark-600/50 p-5 text-dark-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Дополнительный призыв к действию */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-dark-100 mb-6">
            Остались вопросы? Напишите нам в Telegram, и мы с радостью на них ответим.
          </p>
          <a 
            href={SEO_CONFIG.telegram.support} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-6 py-3 bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 rounded-lg transition-all duration-300"
          >
            <FaTelegram className="h-5 w-5 mr-2" />
            <span>Задать вопрос в Telegram</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}; 