'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ContactModal from './ContactModal';

// Данные о технологиях
const technologies = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Создаем современные и отзывчивые пользовательские интерфейсы с использованием передовых технологий.',
    color: 'from-blue-500/20 to-cyan-500/20',
    items: [
      { name: 'React', icon: '/icons/react.svg', description: 'Библиотека для создания пользовательских интерфейсов', color: 'group-hover:text-blue-500' },
      { name: 'Next.js', icon: '/icons/nextjs.svg', description: 'React-фреймворк для создания веб-приложений', color: 'group-hover:text-gray-800 dark:group-hover:text-gray-200' },
      { name: 'TypeScript', icon: '/icons/typescript.svg', description: 'Типизированный JavaScript для надежного кода', color: 'group-hover:text-blue-600' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg', description: 'Утилитарный CSS-фреймворк для быстрой разработки', color: 'group-hover:text-cyan-500' },
      { name: 'Framer Motion', icon: '/icons/framer.svg', description: 'Библиотека для создания анимаций', color: 'group-hover:text-purple-600' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Разрабатываем надежные и масштабируемые серверные решения для ваших проектов.',
    color: 'from-green-500/20 to-emerald-500/20',
    items: [
      { name: 'Node.js', icon: '/icons/nodejs.svg', description: 'JavaScript-среда выполнения на стороне сервера', color: 'group-hover:text-green-600' },
      { name: 'Express', icon: '/icons/express.svg', description: 'Минималистичный веб-фреймворк для Node.js', color: 'group-hover:text-gray-800 dark:group-hover:text-gray-200' },
      { name: 'MongoDB', icon: '/icons/mongodb.svg', description: 'NoSQL база данных для современных приложений', color: 'group-hover:text-green-500' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg', description: 'Мощная реляционная база данных', color: 'group-hover:text-blue-600' },
      { name: 'GraphQL', icon: '/icons/graphql.svg', description: 'Язык запросов для API с гибкой структурой данных', color: 'group-hover:text-pink-600' },
    ]
  },
  {
    id: 'tools',
    title: 'Инструменты',
    description: 'Используем современные инструменты для оптимизации процесса разработки и доставки продукта.',
    color: 'from-orange-500/20 to-amber-500/20',
    items: [
      { name: 'Git', icon: '/icons/git.svg', description: 'Система контроля версий для отслеживания изменений', color: 'group-hover:text-orange-600' },
      { name: 'Docker', icon: '/icons/docker.svg', description: 'Платформа для разработки и доставки приложений', color: 'group-hover:text-blue-500' },
      { name: 'Vercel', icon: '/icons/vercel.svg', description: 'Платформа для развертывания веб-приложений', color: 'group-hover:text-gray-800 dark:group-hover:text-gray-200' },
      { name: 'Figma', icon: '/icons/figma.svg', description: 'Инструмент для дизайна интерфейсов', color: 'group-hover:text-purple-500' },
      { name: 'Jest', icon: '/icons/jest.svg', description: 'Фреймворк для тестирования JavaScript-кода', color: 'group-hover:text-red-600' },
    ]
  }
];

const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Находим активную категорию
  const activeData = technologies.find(tech => tech.id === activeCategory) || technologies[0];

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const techItemAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };

  return (
    <section 
      id="technologies" 
      className="py-24 md:py-32 bg-background relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      
      {/* Фоновые элементы с анимациями */}
      <motion.div
        className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r ${activeData.color} mix-blend-multiply filter blur-3xl opacity-30`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 0.3,
          transition: { duration: 1.5 }
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Технологический стек
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-6 font-[PobedaRegular]">
            Наши <span className="text-gradient">технологии</span>
          </h2>
          
          <p className="text-foreground/80 max-w-2xl mx-auto font-light">
            Мы используем современные и проверенные технологии для создания высококачественных веб-приложений,
            которые отличаются производительностью, безопасностью и масштабируемостью.
          </p>
        </motion.div>

        {/* Навигация по категориям */}
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          {technologies.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 
                ${activeCategory === category.id 
                  ? 'text-white shadow-md' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/30'}`}
            >
              {activeCategory === category.id && (
                <motion.div 
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} border border-border/50`}
                  layoutId="activeCategoryBg"
                  initial={false}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Описание активной категории */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={activeCategory} // перерисовывает при изменении категории
          transition={{ duration: 0.5 }}
        >
          <p className="text-foreground/80">{activeData.description}</p>
        </motion.div>

        {/* Сетка с технологиями */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {activeData.items.map((tech) => (
            <motion.div
              key={tech.name}
              variants={techItemAnimation}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredTech(tech.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className={`group relative bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden border border-border/30 p-5 flex flex-col items-center transition-all duration-300 
                ${hoveredTech === tech.name ? 'shadow-lg border-accent/30' : 'hover:shadow-md'}
              `}
            >
              {/* Фоновый градиент при наведении */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`relative flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 ${hoveredTech === tech.name ? 'scale-110' : 'group-hover:scale-105'}`}>
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${tech.color}`}>
                {tech.name}
              </h3>
              
              <p className="text-foreground/70 text-sm text-center leading-snug">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-14 text-center"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          <ContactModal 
            buttonText="Обсудить технологии для вашего проекта" 
            buttonVariant="primary" 
            buttonSize="lg" 
            buttonClassName="shadow-lg shadow-accent/10 px-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies; 