"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ServerLocation {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  isActive?: boolean;
}

interface ServerMapProps {
  locations: ServerLocation[];
  onSelectLocation?: (location: ServerLocation) => void;
  selectedLocationId?: string;
  className?: string;
}

export const ServerMap: React.FC<ServerMapProps> = ({ 
  locations, 
  onSelectLocation,
  selectedLocationId,
  className = ""
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Преобразуем географические координаты в координаты SVG
  const projectLocation = (lat: number, lng: number): [number, number] => {
    // Простая проекция Меркатора (упрощенная)
    const x = (lng + 180) * (300 / 360);
    const y = (90 - lat) * (150 / 180);
    return [x, y];
  };

  const handleLocationClick = (location: ServerLocation) => {
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };

  // Увеличиваем размеры точек для мобильных устройств
  const basePointSize = 2.5;  // Базовый размер точки (раньше было 2)
  const selectedPointSize = 4;  // Размер выбранной точки (раньше было 3)
  const hoveredPointSize = 3.5;  // Размер при наведении (раньше было 2.5)

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm rounded-xl z-0"></div>
      
      {/* Фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-800/60 via-dark-900/80 to-dark-900 rounded-xl"></div>
      
      {/* Сетка глобуса */}
      <svg 
        viewBox="0 0 300 150" 
        className="w-full h-auto relative z-10"
        style={{ filter: 'drop-shadow(0px 0px 1px rgba(99, 102, 241, 0.2))' }}
      >
        {/* Градиентная заливка для океанов */}
        <defs>
          <radialGradient id="oceanGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.05" />
          </radialGradient>
          
          {/* Анимированное свечение для выбранного сервера */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Фон карты - "океан" */}
        <ellipse cx="150" cy="75" rx="145" ry="70" fill="url(#oceanGradient)" />
        
        {/* Сетка координат */}
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse 
            key={`horizontal-${i}`} 
            cx="150" 
            cy="75" 
            rx="145" 
            ry={70 - i * 12} 
            fill="none" 
            stroke="#334155" 
            strokeWidth="0.3" 
            strokeDasharray="1 1"
            opacity="0.3" 
          />
        ))}
        
        {Array.from({ length: 12 }).map((_, i) => (
          <line 
            key={`vertical-${i}`} 
            x1="150" 
            y1="5" 
            x2="150" 
            y2="145" 
            stroke="#334155" 
            strokeWidth="0.3" 
            strokeDasharray="1 1"
            opacity="0.3"
            transform={`rotate(${i * 30} 150 75)`} 
          />
        ))}
        
        {/* Континенты (упрощенные) */}
        <path 
          d="M180,60 Q190,70 200,60 T220,65 Q230,60 240,70 Q235,85 220,90 Q210,85 205,90 Q195,95 180,85 Z" 
          fill="#1e293b" 
          opacity="0.3"
        />
        <path 
          d="M100,45 Q110,40 120,45 Q130,55 140,50 Q145,60 135,70 Q125,65 115,70 Q105,60 100,45 Z" 
          fill="#1e293b" 
          opacity="0.3"
        />
        <path 
          d="M70,80 Q80,75 90,80 Q95,90 85,95 Q75,90 70,80 Z" 
          fill="#1e293b" 
          opacity="0.3"
        />
        
        {/* Серверные локации */}
        {locations.map((location) => {
          const [x, y] = projectLocation(location.latitude, location.longitude);
          const isSelected = location.id === selectedLocationId;
          const isHovered = location.id === hoveredLocation;
          
          return (
            <g key={location.id}>
              {/* Пульсирующий круг для выбранного сервера */}
              {isSelected && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={6} // Увеличенный размер (раньше было 5)
                  fill="transparent"
                  stroke="#6366f1"
                  strokeWidth="0.7" // Увеличенная толщина (раньше было 0.5)
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              )}
              
              {/* Точка сервера */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? selectedPointSize : isHovered ? hoveredPointSize : basePointSize}
                fill={isSelected ? "#6366f1" : isHovered ? "#818cf8" : "#64748b"}
                filter={isSelected ? "url(#glow)" : "none"}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{ cursor: 'pointer' }}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              />
              
              {/* Название страны и города - увеличены для мобильных */}
              {(isHovered || isSelected) && (
                <g>
                  <rect
                    x={x + 5}
                    y={y - 16} // Немного ниже чтобы поместилось
                    width={(location.country + location.city).length * 4.5 + 18} // Увеличил ширину
                    height="28" // Увеличенная высота (раньше было 24)
                    rx="4"
                    fill="#1e293b"
                    opacity="0.9" // Повышенная непрозрачность
                  />
                  <text
                    x={x + 10}
                    y={y - 2}
                    fontSize="8" // Увеличенный размер (раньше было 7)
                    fontWeight="500"
                    fill="#f8fafc"
                  >
                    {location.country}
                  </text>
                  <text
                    x={x + 10}
                    y={y + 8}
                    fontSize="7" // Увеличенный размер (раньше было 6)
                    fontWeight="400"
                    fill="#94a3b8"
                  >
                    {location.city}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        
        {/* Декоративные соединения между серверами */}
        {locations.map((location, index) => {
          if (index === 0) return null;
          
          const [x1, y1] = projectLocation(location.latitude, location.longitude);
          const [x2, y2] = projectLocation(
            locations[(index - 1) % locations.length].latitude,
            locations[(index - 1) % locations.length].longitude
          );
          
          return (
            <line
              key={`connection-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#334155"
              strokeWidth="0.4" // Увеличенная толщина линий (раньше было 0.2)
              strokeDasharray="1 2"
              opacity="0.3" // Повышенная видимость
            />
          );
        })}
      </svg>
      
      {/* Легенда - скрыта на мобильных устройствах */}
      <div className="absolute bottom-2 right-2 hidden sm:flex items-center space-x-4 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-1"></span>
          <span className="text-dark-200">Выбрано</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-dark-300 mr-1"></span>
          <span className="text-dark-200">Доступно</span>
        </div>
      </div>
    </div>
  );
}; 