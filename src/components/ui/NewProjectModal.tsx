'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ContactModal from '../sections/ContactModal';

interface ProjectImage {
  id: number;
  src: string;
  alt: string;
}

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  projectUrl?: string;
  images: ProjectImage[];
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  projectUrl,
  images
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      // Блокируем прокрутку на основном контенте
      document.body.style.overflow = 'hidden';
    }
    return () => {
      // Восстанавливаем прокрутку при размонтировании
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Не рендерим на сервере
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-stretch overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay для закрытия */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={onClose}
          />

          {/* Контейнер модального окна */}
          <motion.div 
            className="relative flex flex-col md:flex-row w-full h-full"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Информационная часть - на мобильных вверху, на десктопе слева (40%) */}
            <div className="w-full md:w-[40%] bg-card/95 backdrop-blur-lg flex flex-col md:h-full border-b md:border-b-0 md:border-r border-border/30 relative overflow-y-auto">
              {/* Кнопка закрытия */}
              <button
                onClick={onClose}
                className="sticky top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:text-accent transition-colors border border-border/50"
                aria-label="Закрыть"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Декоративные элементы */}
              <div className="sticky top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-secondary"></div>

              <div className="p-6 md:p-8">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
                >
                  {title}
                </motion.span>

                <div className="space-y-6">
                  {/* Описание проекта */}
                  {description.split('\n\n').map((block, index) => {
                    if (block.startsWith('Описание кейса:')) {
                      return (
                        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-2 text-accent">О проекте</h4>
                          <p className="text-foreground/90">{block.replace('Описание кейса:', '').trim()}</p>
                        </div>
                      );
                    }
                    if (block.startsWith('Задача:')) {
                      return (
                        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-2 text-accent">Задача</h4>
                          <p className="text-foreground/90">{block.replace('Задача:', '').trim()}</p>
                        </div>
                      );
                    }
                    if (block.startsWith('Реализация:')) {
                      return (
                        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-2 text-accent">Реализация</h4>
                          <p className="text-foreground/90">{block.replace('Реализация:', '').trim()}</p>
                        </div>
                      );
                    }
                    if (block.startsWith('Ключевые особенности проекта:')) {
                      return (
                        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-3 text-accent">Особенности</h4>
                          <ul className="space-y-2">
                            {block.split('\n').slice(1).map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-foreground/90">
                                <span className="text-accent">•</span>
                                <span>{feature.replace('•', '').trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    if (block.startsWith('Результат:')) {
                      return (
                        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-2 text-accent">Результат</h4>
                          <p className="text-foreground/90">{block.replace('Результат:', '').trim()}</p>
                        </div>
                      );
                    }
                    if (block.startsWith('Заключение:')) {
                      return (
                        <div key={index} className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-4 border border-border/50">
                          <h4 className="font-bold text-lg mb-2 text-gradient">Итог</h4>
                          <p className="text-foreground/90">{block.replace('Заключение:', '').trim()}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  {projectUrl && (
                    <Button
                      href={projectUrl}
                      variant="gradient"
                      size="lg"
                      className="w-full"
                    >
                      Перейти на сайт
                      <svg
                        className="ml-2 w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  )}
                  <div className="flex gap-4">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Закрыть
                    </Button>
                    <ContactModal 
                      buttonText="Обсудить проект" 
                      buttonVariant="primary" 
                      buttonSize="lg"
                      buttonClassName="w-full" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Галерея изображений - на мобильных внизу, на десктопе справа (60%) */}
            <div className="w-full md:w-[60%] flex-grow overflow-y-auto bg-black/90">
              <div className="w-full">
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="w-full mb-4 last:mb-0"
                  >
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal; 