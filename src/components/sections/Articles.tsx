'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

const Articles = () => {
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