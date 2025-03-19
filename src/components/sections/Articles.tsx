'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const technologies = [
  {
    name: 'Next.js',
    description: 'Современный фреймворк для React приложений',
    icon: '/icons/nextjs.svg',
    category: 'Frontend'
  },
  {
    name: 'React',
    description: 'Библиотека для создания пользовательских интерфейсов',
    icon: '/icons/react.svg',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    description: 'Типизированный JavaScript для надежного кода',
    icon: '/icons/typescript.svg',
    category: 'Frontend'
  },
  {
    name: 'Tailwind CSS',
    description: 'Утилитарный CSS фреймворк для быстрой разработки',
    icon: '/icons/tailwind.svg',
    category: 'Frontend'
  },
  {
    name: 'Framer Motion',
    description: 'Библиотека для создания анимаций в React',
    icon: '/icons/framer.svg',
    category: 'Frontend'
  },
  {
    name: 'Node.js',
    description: 'JavaScript на стороне сервера для масштабируемых приложений',
    icon: '/icons/nodejs.svg',
    category: 'Backend'
  },
  {
    name: 'MongoDB',
    description: 'NoSQL база данных для хранения документов',
    icon: '/icons/mongodb.svg',
    category: 'Backend'
  },
  {
    name: 'GraphQL',
    description: 'Язык запросов к API для гибкого получения данных',
    icon: '/icons/graphql.svg',
    category: 'Backend'
  },
  {
    name: 'Docker',
    description: 'Контейнеризация приложений для удобной разработки',
    icon: '/icons/docker.svg',
    category: 'Инструменты'
  },
  {
    name: 'Figma',
    description: 'Инструмент для дизайна интерфейсов и прототипирования',
    icon: '/icons/figma.svg',
    category: 'Инструменты'
  },
  {
    name: 'Jest',
    description: 'Фреймворк для тестирования JavaScript кода',
    icon: '/icons/jest.svg',
    category: 'Инструменты'
  },
  {
    name: 'Git',
    description: 'Система контроля версий для командной разработки',
    icon: '/icons/git.svg',
    category: 'Инструменты'
  }
];

const categories = [
  'Frontend',
  'Backend',
  'Инструменты'
];

const Articles = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight * 0.75) {
        controls.start('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const filteredTechnologies = technologies.filter(tech => tech.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-background relative overflow-hidden"
      id="articles"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      
      {/* Фоновые элементы с анимациями */}
      <motion.div
        className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-accent/20 to-primary/20 mix-blend-multiply filter blur-3xl opacity-30"
        initial={{ x: 100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 0.3,
          transition: { duration: 1.5 }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Секция технологий */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
              Технологии
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4 font-[PobedaRegular]">
              Наш <span className="text-gradient">стек</span>
            </h2>
            <p className="text-foreground/80 text-base max-w-2xl mx-auto">
              Используем передовые технологии для создания современных и производительных веб-приложений
            </p>
          </div>

          {/* Табы категорий */}
          <div className="relative flex justify-center mb-12">
            <div className="flex space-x-1 bg-card/40 backdrop-blur-sm p-1 rounded-xl border border-border/30 shadow-lg">
              {categories.map((category) => (
                <button 
                  key={category} 
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category 
                      ? 'text-white' 
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    {category === 'Frontend' && (
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {category === 'Backend' && (
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    )}
                    {category === 'Инструменты' && (
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Технологии с центрированием */}
          <div className="relative h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full overflow-x-auto no-scrollbar">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-6 justify-center mx-auto max-w-[1280px] px-4"
                  >
                    {filteredTechnologies.map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        className="relative group w-[180px] flex-shrink-0"
                      >
                        <div className="bg-card rounded-xl p-5 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.03] border border-border/50">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 mb-3 relative">
                              <Image
                                src={tech.icon}
                                alt={tech.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <h3 className="text-base font-semibold mb-1">{tech.name}</h3>
                            <p className="text-xs text-foreground/70">{tech.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Секция статей */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full mb-3">
            Блог
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4 font-[PobedaRegular]">
            Полезные <span className="text-gradient">статьи</span>
          </h2>
          <p className="text-foreground/80 text-base mb-8">
            Делимся экспертными знаниями и советами по созданию современных веб-сайтов
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors duration-300"
          >
            Читать статьи
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Articles; 