'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "animate" | "transition"> {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

const MagneticButton = ({
  children,
  className = '',
  strength = 30,
  radius = 200,
  ...props
}: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Центр кнопки
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Расстояние от курсора до центра кнопки
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Расстояние от курсора до центра кнопки (пифагорова теорема)
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    // Если курсор находится в пределах радиуса действия
    if (distance < radius) {
      // Сила притяжения уменьшается с увеличением расстояния
      const power = 1 - distance / radius;
      
      // Вычисляем смещение кнопки
      const x = distanceX * power * strength / 10;
      const y = distanceY * power * strength / 10;
      
      setPosition({ x, y });
    } else {
      // Если курсор за пределами радиуса, возвращаем кнопку в исходное положение
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    // Возвращаем кнопку в исходное положение при уходе курсора
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic relative z-10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton; 