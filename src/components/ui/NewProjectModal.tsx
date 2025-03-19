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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Верхняя панель */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border/10"
          >
            <div className="container mx-auto h-16 flex items-center justify-between px-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-medium bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              >
                {title}
              </motion.span>
              <div className="flex items-center gap-4">
                {projectUrl && (
                  <Button
                    href={projectUrl}
                    variant="gradient"
                    size="sm"
                    className="hidden md:flex"
                  >
                    Открыть сайт
                    <svg
                      className="ml-2 w-4 h-4"
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
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                  aria-label="Закрыть"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Основной контент */}
          <div className="h-screen pt-16 overflow-y-auto">
            <div className="container mx-auto px-6 py-8 max-w-6xl">
              {/* Изображение */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-12"
              >
                {/* Основное изображение */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImageIndex].src}
                      alt={images[activeImageIndex].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                      quality={100}
                    />
                  </motion.div>

                  {/* Градиентные оверлеи */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Кнопки навигации */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-background/80 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-background"
                        aria-label="Предыдущее изображение"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-background/80 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-background"
                        aria-label="Следующее изображение"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Счетчик изображений */}
                  <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {activeImageIndex + 1} / {images.length}
                  </div>

                  {/* Индикаторы */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {images.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeImageIndex 
                            ? 'bg-accent w-4' 
                            : 'bg-foreground/20 hover:bg-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Навигация по разделам */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 -mx-2 overflow-x-auto hide-scrollbar"
              >
                <div className="flex gap-2 px-2 min-w-max">
                  {description.split('\n\n').map((block, index) => {
                    const getTitle = (text: string) => {
                      if (text.startsWith('Описание кейса:')) return 'О проекте';
                      if (text.startsWith('Задача:')) return 'Задача';
                      if (text.startsWith('Реализация:')) return 'Реализация';
                      if (text.startsWith('Ключевые особенности проекта:')) return 'Особенности';
                      if (text.startsWith('Результат:')) return 'Результат';
                      if (text.startsWith('Заключение:')) return 'Итог';
                      return '';
                    };
                    const title = getTitle(block);
                    if (!title) return null;

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          const element = document.getElementById(`section-${index}`);
                          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="px-6 py-2.5 rounded-xl bg-accent/5 hover:bg-accent/10 border border-border/10 transition-colors text-sm font-medium"
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Описание */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {description.split('\n\n').map((block, index) => {
                  if (block.startsWith('Описание кейса:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-br from-accent/5 to-background border border-border/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 16v-4"></path>
                              <path d="M12 8h.01"></path>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">О проекте</h3>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{block.replace('Описание кейса:', '').trim()}</p>
                      </motion.div>
                    );
                  }
                  if (block.startsWith('Задача:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-br from-accent/5 to-background border border-border/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M12 20v-6M6 20V10M18 20V4"></path>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Задача</h3>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{block.replace('Задача:', '').trim()}</p>
                      </motion.div>
                    );
                  }
                  if (block.startsWith('Реализация:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-br from-accent/5 to-background border border-border/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Реализация</h3>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{block.replace('Реализация:', '').trim()}</p>
                      </motion.div>
                    );
                  }
                  if (block.startsWith('Ключевые особенности проекта:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gradient-to-br from-accent/5 to-background border border-border/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Особенности</h3>
                        </div>
                        <ul className="space-y-4">
                          {block.split('\n').slice(1).map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-4 group"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span className="text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors">{feature.replace('•', '').trim()}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  }
                  if (block.startsWith('Результат:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gradient-to-br from-accent/5 to-background border border-border/10 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Результат</h3>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{block.replace('Результат:', '').trim()}</p>
                      </motion.div>
                    );
                  }
                  if (block.startsWith('Заключение:')) {
                    return (
                      <motion.div
                        id={`section-${index}`}
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-gradient-to-br from-accent/20 to-secondary/20 backdrop-blur-md rounded-2xl p-8 border border-border/10 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                              <line x1="12" y1="20" x2="12" y2="20"></line>
                            </svg>
                          </span>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Итог</h3>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{block.replace('Заключение:', '').trim()}</p>
                      </motion.div>
                    );
                  }
                  return null;
                })}

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {projectUrl && (
                    <Button
                      href={projectUrl}
                      variant="gradient"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Открыть сайт
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
                  <ContactModal 
                    buttonText="Обсудить похожий проект" 
                    buttonVariant="primary" 
                    buttonSize="lg"
                    buttonClassName="w-full sm:w-auto" 
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewProjectModal; 