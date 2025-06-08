"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { PricingPlan } from '@/data/pricing';
import { HiCheck, HiFire } from 'react-icons/hi';
import { SEO_CONFIG } from '@/constants/seo';

interface PricingCardProps {
  plan: PricingPlan;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const {
    title,
    price,
    currency,
    periodText,
    features,
    popular,
    buttonText,
    discount,
  } = plan;

  const telegramBot = SEO_CONFIG.telegram.bot;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleTelegramClick = () => {
    window.open(telegramBot, '_blank');
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative card-3d ${
        popular ? 'md:-mt-4 md:mb-4 z-10' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Фоновое свечение */}
      <motion.div 
        className={`absolute inset-0 rounded-xl blur-xl -z-10 opacity-0 ${
          popular 
            ? 'bg-gradient-to-br from-accent-500/30 via-glow-purple/20 to-glow-indigo/20' 
            : 'bg-gradient-to-b from-dark-600/20 via-dark-500/10 to-transparent'
        }`}
        animate={{ 
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className={`relative rounded-xl p-6 border transition-all duration-300 backdrop-blur-sm ${
        popular 
          ? 'bg-gradient-to-br from-accent-600/10 via-glow-purple/20 to-glow-indigo/20 border-accent-500/30' 
          : 'glass-card border-dark-600/30 hover:border-dark-500/50'
      }`}>
        {popular && <div className="absolute inset-0 bg-dark-800/40 backdrop-blur-sm rounded-xl -z-10"></div>}
        
        <div className="text-center">
          {popular && (
            <motion.div 
              className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-600 to-glow-purple px-3 py-1 text-sm font-semibold text-white"
              animate={{ 
                boxShadow: isHovered 
                  ? '0 0 10px 1px rgba(139, 92, 246, 0.3)' 
                  : '0 0 5px 0px rgba(139, 92, 246, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <HiFire className="h-4 w-4" /> Популярный выбор
            </motion.div>
          )}
          
          <h3 className="mb-1 text-xl font-bold text-white">{title}</h3>
          
          {discount && (
            <div className="mb-2 text-sm font-medium text-accent-400">
              Экономия {discount}%
            </div>
          )}

          <motion.div 
            className="mt-6 flex items-baseline justify-center"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white group-hover:text-white">
              <span className="text-4xl font-extrabold tracking-tight">{price}</span>
              <span className="ml-1 text-2xl font-semibold">{currency}</span>
            </span>
            <span className="ml-1 text-xl font-medium text-dark-100">{periodText}</span>
          </motion.div>
        </div>

        <div className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ x: 3 }}
            >
              <div className="flex-shrink-0">
                <motion.div
                  animate={popular ? { 
                    color: isHovered ? '#8B5CF6' : '#6D28D9',
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ 
                    duration: 0.5, 
                    repeat: isHovered && popular ? 1 : 0, 
                    repeatType: "reverse", 
                    ease: "easeInOut"
                  }}
                >
                  <HiCheck className={`h-5 w-5 ${popular ? 'text-accent-400' : 'text-accent-500'}`} />
                </motion.div>
              </div>
              <p className="ml-3 text-base text-dark-100">{feature}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Button 
            variant={popular ? 'glow' : 'outline'}
            fullWidth
            onClick={handleTelegramClick}
          >
            {buttonText}
          </Button>
        </div>

        {/* Улучшенное отражение в стиле стекла */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none"></div>
        {popular && (
          <motion.div 
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 pointer-events-none"
            animate={{ opacity: isHovered ? 0.15 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}; 