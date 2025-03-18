'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  const stats = [
    { id: 1, value: '5+', label: 'лет опыта' },
    { id: 2, value: '100+', label: 'проектов' },
    { id: 3, value: '50+', label: 'клиентов' },
    { id: 4, value: '10+', label: 'наград' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      
      {/* Анимированные градиентные круги */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Декоративная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>

      {/* Декоративные линии */}
      <div className="absolute top-1/4 left-0 w-[150px] h-[1px] bg-gradient-to-r from-accent to-transparent"></div>
      <div className="absolute bottom-1/3 right-0 w-[150px] h-[1px] bg-gradient-to-l from-secondary to-transparent"></div>

      {/* Точки */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 rounded-full bg-accent"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-secondary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            О нас
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-display mb-6 tracking-tight font-[PobedaRegular]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Мы создаем <span className="text-gradient">цифровые впечатления</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/80 max-w-2xl mx-auto font-light"
          >
            Наша команда профессионалов объединяет талант, опыт и страсть к созданию уникальных цифровых решений.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 md:order-1"
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold font-display mb-4 font-[PobedaRegular]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Почему <span className="text-gradient">выбирают нас</span>
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-foreground/80 mb-6"
            >
              Мы не просто создаем сайты — мы создаем цифровые произведения искусства, которые привлекают внимание, вызывают эмоции и приносят результаты. Наш подход основан на глубоком понимании потребностей клиента, современных тенденций дизайна и технологических возможностей.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-foreground/80 mb-8"
            >
              Каждый проект для нас — это возможность создать что-то уникальное и запоминающееся. Мы уделяем особое внимание деталям, анимации и интерактивности, чтобы ваш сайт выделялся среди конкурентов и оставлял неизгладимое впечатление на пользователей.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.id} className="bg-card p-6 rounded-xl border border-border">
                  <div className="text-3xl md:text-4xl font-bold font-display text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden p-1">
                <div className="aspect-[4/3] bg-background rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-gradient">WebStudio</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-secondary/10 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-display mb-12 text-center font-[PobedaRegular]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Как мы <span className="text-gradient">работаем</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-secondary opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
              <div className="relative bg-card p-8 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M9 21.5H15M12 3.5V7.5M8.21 9.71L5.79 7.29M15.79 9.71L18.21 7.29M12 21.5V11.5M21 9.5C21 11.7091 19.2091 13.5 17 13.5C14.7909 13.5 13 11.7091 13 9.5C13 7.29086 14.7909 5.5 17 5.5C19.2091 5.5 21 7.29086 21 9.5ZM11 9.5C11 11.7091 9.20914 13.5 7 13.5C4.79086 13.5 3 11.7091 3 9.5C3 7.29086 4.79086 5.5 7 5.5C9.20914 5.5 11 7.29086 11 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">Брифинг и анализ</h3>
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  Глубокий анализ вашего бизнеса, целей и потребностей. Изучаем конкурентов и целевую аудиторию.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-secondary opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
              <div className="relative bg-card p-8 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotateY: [0, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M2 7.5L12 3.5L22 7.5M2 7.5L12 11.5M2 7.5V17.5L12 21.5M22 7.5L12 11.5M22 7.5V17.5L12 21.5M12 11.5V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">Прототип и дизайн</h3>
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  Создаем интерактивные прототипы и уникальный дизайн с учетом современных трендов и ваших пожеланий.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-secondary opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
              <div className="relative bg-card p-8 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M17 7.5L12 12.5M12 12.5L7 7.5M12 12.5V21.5M21 3.5H3M21 3.5L19 9.5M21 3.5L15 9.5M3 3.5L5 9.5M3 3.5L9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">Разработка</h3>
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  Пишем чистый и оптимизированный код, используя современные технологии и лучшие практики.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-secondary opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
              <div className="relative bg-card p-8 rounded-2xl border border-border group-hover:border-transparent transition-colors duration-500">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M9 11.5L11 13.5L15 9.5M12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-accent transition-colors duration-300">Запуск и поддержка</h3>
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  Тщательное тестирование, оптимизация и запуск. Обеспечиваем техническую поддержку 24/7.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 