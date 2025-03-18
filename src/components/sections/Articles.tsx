'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import ArticleModal from '../ui/ArticleModal';
import { articlesData } from '../data/articlesData';

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleArticleClick = (id: number) => {
    setSelectedArticle(id);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const getSelectedArticle = () => {
    if (selectedArticle === null) return null;
    return articlesData.find(article => article.id === selectedArticle) || null;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

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
        staggerChildren: 0.1
      }
    }
  };

  const articleVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      id="articles"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-30"></div>
      
      {/* Фоновые элементы с анимациями */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-primary/20 mix-blend-multiply filter blur-3xl opacity-30"
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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full mb-4">
              Блог
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4 font-[PobedaRegular]">
              Полезные <span className="text-gradient">статьи</span>
            </h2>
            <p className="text-foreground/80 max-w-2xl font-light">
              Делимся экспертными знаниями и советами по созданию современных веб-сайтов
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="p-3 rounded-full bg-background border border-border/30 shadow-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 rounded-full bg-background border border-border/30 shadow-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="flex overflow-x-auto scrollbar-hide gap-8 pb-8 -mx-4 px-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {articlesData.map((article) => (
              <motion.div
                key={article.id}
                variants={articleVariants}
                className="cursor-pointer group flex-none w-[400px] snap-start first:ml-0 last:mr-0"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 h-[500px]">
                  <div className="absolute inset-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-6 z-10">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs rounded-full mb-4 self-start">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-4 line-clamp-2">
                      {article.content.intro}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{article.date}</span>
                      <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 md:hidden">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg hover:bg-accent/10 transition-all duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 md:hidden">
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 shadow-lg hover:bg-accent/10 transition-all duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <ArticleModal
        isOpen={selectedArticle !== null}
        onClose={handleCloseModal}
        article={getSelectedArticle()}
      />
    </section>
  );
};

export default Articles; 