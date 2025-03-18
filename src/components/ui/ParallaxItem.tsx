'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxItemProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  className?: string;
}

// Функция для расчета значений трансформации
const calculateTransformValue = (
  direction: 'up' | 'down' | 'left' | 'right', 
  speed: number
): [number, number] => {
  switch (direction) {
    case 'up':
      return [speed * 100, -speed * 100];
    case 'down':
      return [-speed * 100, speed * 100];
    case 'left':
      return [speed * 100, -speed * 100];
    case 'right':
      return [-speed * 100, speed * 100];
    default:
      return [0, 0];
  }
};

const ParallaxItem: React.FC<ParallaxItemProps> = ({
  children,
  direction = 'up',
  speed = 0.5,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Вычисляем значения трансформации
  const transformValues = calculateTransformValue(direction, speed);
  
  // Всегда вызываем хуки useTransform, но возвращаем 0 для неиспользуемых направлений
  const yTransform = useTransform(scrollYProgress, [0, 1], transformValues);
  const xTransform = useTransform(scrollYProgress, [0, 1], transformValues);
  
  // Определяем, какие значения использовать
  const y = direction === 'up' || direction === 'down' ? yTransform : 0;
  const x = direction === 'left' || direction === 'right' ? xTransform : 0;

  return (
    <motion.div
      ref={ref}
      style={{ y, x }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxItem; 