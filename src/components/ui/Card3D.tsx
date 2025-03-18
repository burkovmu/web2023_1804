'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
}

const Card3D = ({ 
  children, 
  className = '', 
  glareColor = 'rgba(255, 255, 255, 0.1)' 
}: Card3DProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Вычисляем положение курсора относительно карточки
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Преобразуем в проценты от -0.5 до 0.5
    const xPercent = (x / width - 0.5) * 2;
    const yPercent = (y / height - 0.5) * 2;
    
    // Устанавливаем углы поворота (максимум 10 градусов)
    setRotateY(xPercent * 10);
    setRotateX(-yPercent * 10);
    
    // Устанавливаем положение блика
    setGlarePosition({ x: xPercent, y: yPercent });
  };
  
  const handleMouseEnter = () => {
    setScale(1.05);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlarePosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Эффект блика */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${50 + glarePosition.x * 50}% ${50 + glarePosition.y * 50}%, ${glareColor}, transparent 50%)`,
          opacity: Math.sqrt(Math.abs(glarePosition.x) ** 2 + Math.abs(glarePosition.y) ** 2),
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Эффект границы */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      />
    </motion.div>
  );
};

export default Card3D; 