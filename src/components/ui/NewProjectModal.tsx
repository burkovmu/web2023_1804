'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';

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
            {/* Информационная часть - на мобильных вверху, на десктопе слева (35%) */}
            <div className="w-full md:w-[35%] bg-card/95 backdrop-blur-lg p-6 md:p-8 lg:p-12 flex flex-col md:h-full border-b md:border-b-0 md:border-r border-border/30 relative">
              {/* Кнопка закрытия */}
              <button
                onClick={onClose}
                className="absolute top-4 md:top-6 right-4 md:left-6 md:right-auto z-50 w-10 h-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:text-accent transition-colors border border-border/50"
                aria-label="Закрыть"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Декоративные элементы */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-secondary"></div>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full filter blur-3xl"></div>

              <div className="pt-16 md:pt-20 flex-grow">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
                >
                  Проект
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-4 md:mb-6 font-[PobedaRegular]"
                >
                  {title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="prose prose-sm md:prose-lg prose-invert max-w-none mb-6 md:mb-8"
                >
                  <p className="text-foreground/90">{description}</p>
                </motion.div>
              </div>

              {/* Кнопка "Перейти на сайт" внизу информационной части */}
              <div className="mt-auto mb-4 md:mb-0">
                {projectUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
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
                  </motion.div>
                )}
              </div>
            </div>

            {/* Галерея изображений - на мобильных внизу, на десктопе справа (65%) */}
            <div className="w-full md:w-[65%] flex-grow overflow-y-auto bg-black/90">
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
                        sizes="(max-width: 768px) 100vw, 65vw"
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