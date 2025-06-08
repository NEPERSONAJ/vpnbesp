"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SEO_CONFIG } from '@/constants/seo';
import { FaShieldAlt, FaBolt, FaLock, FaUserShield, FaClock, FaBan } from 'react-icons/fa';
import { ServerMap } from '@/components/ui/ServerMap';
import { vpnServers, getActiveServer } from '@/data/servers';

export const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const telegramBot = SEO_CONFIG.telegram.bot;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedServer, setSelectedServer] = useState(getActiveServer()?.id || '');

  // Эффект движения карточки за курсором с оптимизацией производительности
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let requestId: number;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      
      // Используем requestAnimationFrame для более плавной анимации
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) / 20;
        const moveY = (e.clientY - centerY) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Обновляем состояние для других эффектов
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => {
      isHovering = true;
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      isHovering = false;
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestId);
    };
  }, []);

  // Анимация для блоков текста и заголовков
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    })
  };

  const featureItems = [
    { icon: <FaUserShield className="text-accent-400 w-6 h-6" />, text: "Полная анонимность и защита" },
    { icon: <FaBolt className="text-accent-400 w-6 h-6" />, text: "Высокая скорость соединения" },
    { icon: <FaBan className="text-accent-400 w-6 h-6" />, text: "Без ограничений и рекламы" }
  ];
  
  // Функция для получения города и страны выбранного сервера
  const getSelectedServerInfo = () => {
    const server = vpnServers.find(s => s.id === selectedServer);
    return server ? `${server.country} - ${server.city}` : 'Выберите сервер';
  };

  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Фон с сеткой и шумом */}
      <div className="absolute inset-0 bg-dark-gradient bg-noise">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      </div>
      
      {/* Анимированные градиентные круги */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent-500/10 filter blur-[100px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-40 w-80 h-80 rounded-full bg-glow-purple/10 filter blur-[90px]"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-lg"
            >
              {/* Бейдж "БЕСПЛАТНО" */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6"
              >
                <span className="free-badge animate-pulse-slow">100% БЕСПЛАТНО</span>
              </motion.div>
              
              <motion.h1 
                custom={0} 
                variants={textVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6"
              >
                <span className="text-white">Мощный </span>
                <span className="text-gradient-to-r">бесплатный VPN</span>
                <span className="text-white"> без ограничений</span>
              </motion.h1>
              
              <motion.p 
                custom={1} 
                variants={textVariants}
                className="text-base sm:text-lg md:text-xl text-dark-100 mb-6 sm:mb-8 leading-relaxed"
              >
                Доступ к любым сайтам и сервисам без ограничений скорости, трафика или времени использования — абсолютно бесплатно и безопасно.
              </motion.p>
              
              <motion.div 
                custom={2} 
                variants={textVariants}
                className="space-y-5 mb-10"
              >
                {featureItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-dark-700/80 backdrop-blur-sm shadow-accent">
                      {item.icon}
                    </div>
                    <span className="text-dark-100">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                custom={3} 
                variants={textVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button 
                  size="lg" 
                  variant="glow" 
                  onClick={() => window.open(telegramBot, '_blank')}
                  className="animate-gradient-x"
                >
                  Подключиться бесплатно
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => document.getElementById('features')?.scrollIntoView()}
                >
                  Узнать больше
                </Button>
              </motion.div>
              
              {/* Счетчик пользователей */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-6 sm:mt-8 flex items-center flex-wrap"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent-600 border-2 border-dark-800 flex items-center justify-center text-xs text-white font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="ml-2 sm:ml-3 text-dark-200 text-sm sm:text-base">
                  <span className="font-semibold text-accent-300">15,000+</span> пользователей уже с нами
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            {/* Эффект свечения позади карточки */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-glow-purple/10 rounded-2xl blur-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <motion.div
              ref={cardRef}
              className="relative card-3d-inner will-change-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              {/* VPN Dashboard для бесплатного сервиса */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                {/* Эффект свечения при движении мыши */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 217, 245, 0.15) 0%, rgba(0, 0, 0, 0) 60%)`
                  }}
                />
                
                {/* Верхняя панель - стиль терминала */}
                <div className="terminal-header">
                  <div className="flex items-center">
                    <div className="mr-2 text-accent-400">
                      <FaLock className="w-4 h-4" />
                    </div>
                    <span className="text-white font-mono text-sm">{SEO_CONFIG.openGraph.site_name}</span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-accent-500 text-dark-900 rounded-full font-bold">FREE</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                {/* Основное содержимое - терминальный стиль */}
                <div className="terminal-body">
                  {/* Командная строка с эффектом печати */}
                  <div className="mb-3 sm:mb-4 px-2 sm:px-3 py-2 bg-dark-900/70 rounded-md border border-accent-500/20 flex items-center text-xs sm:text-sm">
                    <span className="text-accent-400 mr-1 sm:mr-2">$</span>
                    <div className="flex overflow-hidden">
                      <span className="text-dark-100 typing-animation truncate">vpn --connect --server={getSelectedServerInfo()}</span>
                      <span className="cursor-animation"></span>
                    </div>
                  </div>
                  
                  {/* Секция серверов */}
                  <div className="terminal-section mb-4 relative">
                    <div className="terminal-section-header flex justify-between items-center">
                      <span>Глобальная сеть серверов</span>
                      <span className="text-dark-200 text-xs">{vpnServers.length} серверов</span>
                    </div>
                    
                    <div className="relative h-32 sm:h-40 md:h-44 bg-dark-900/70 overflow-hidden">
                      <div className="absolute inset-0 opacity-40 bg-[url('/images/world-map-dots.svg')] bg-no-repeat bg-center bg-contain"></div>
                      
                      {/* Анимированные точки передачи данных */}
                      <div className="data-packet" style={{ top: '30%', left: '25%', animationDelay: '0s' }}></div>
                      <div className="data-packet" style={{ top: '40%', left: '45%', animationDelay: '0.5s' }}></div>
                      <div className="data-packet" style={{ top: '35%', left: '65%', animationDelay: '1s' }}></div>
                      <div className="data-packet" style={{ top: '60%', left: '30%', animationDelay: '1.5s' }}></div>
                      <div className="data-packet" style={{ top: '55%', left: '60%', animationDelay: '2s' }}></div>
                      
                      <div className="absolute inset-0 px-2 py-2">
                        <ServerMap 
                          locations={vpnServers} 
                          selectedLocationId={selectedServer}
                          onSelectLocation={(server) => setSelectedServer(server.id)}
                        />
                      </div>
                      
                      {/* Индикатор выбранного сервера */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-dark-900/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-md border border-accent-500/20 flex items-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent-500 animate-pulse mr-1 sm:mr-2"></div>
                        <span className="text-xs text-white font-mono truncate">
                          <span className="text-accent-400">Server:</span> {getSelectedServerInfo()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Секция преимуществ */}
                  <div className="terminal-section">
                    <div className="terminal-section-header flex items-center">
                      <FaClock className="text-accent-400 mr-2 w-3 h-3" />
                      <span>Бесплатные преимущества</span>
                    </div>
                    
                    <div className="terminal-section-body grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-2 sm:gap-x-4 text-xs sm:text-sm">
                      {/* Анимированное появление элементов */}
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-dark-100">Неограниченное время</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-dark-100">Без ограничений трафика</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-dark-100">Доступ к YouTube</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-dark-100">Доступ к ChatGPT</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Индикатор защиты */}
                  <motion.div 
                    className="mt-4 px-3 py-2 rounded-md bg-green-500/10 border border-green-500/30 flex items-center text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <FaShieldAlt className="text-green-400 mr-2 w-4 h-4" />
                    <span className="text-green-300">Ваше соединение защищено</span>
                    <span className="ml-auto text-xs text-green-400 font-mono">AES-256-GCM</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};