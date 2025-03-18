'use client';

import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateCursorPosition = (e: MouseEvent) => {
      // Сохраняем целевую позицию курсора
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateCursor = () => {
      // Увеличиваем скорость движения курсора для более быстрого отклика
      const speed = 0.8; // Увеличиваем скорость с 0.2 до 0.8
      
      // Вычисляем новую позицию с плавным переходом
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      
      // Обновляем позицию курсора
      setPosition({ x: currentX, y: currentY });
      
      // Продолжаем анимацию
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleLinkHover = () => {
      setIsActive(true);
    };

    const handleLinkLeave = () => {
      setIsActive(false);
    };

    // Инициализируем начальную позицию курсора
    if (typeof window !== 'undefined') {
      currentX = window.innerWidth / 2;
      currentY = window.innerHeight / 2;
      targetX = currentX;
      targetY = currentY;
    }

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Добавляем обработчики для ссылок и кнопок
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    // Запускаем анимацию
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });

      // Останавливаем анимацию при размонтировании
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Не рендерим курсор на мобильных устройствах
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`cursor ${isActive ? 'active' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.3s ease',
      }}
    />
  );
};

export default CustomCursor; 