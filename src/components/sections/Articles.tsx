'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ArticleModal from '../ui/ArticleModal';
import { articlesData } from '../data/articlesData';

const Articles = () => {
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Анимация для статьи
  const articleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleArticleClick = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedArticle(id);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const getSelectedArticle = () => {
    if (selectedArticle === null) return null;
    return articlesData.find(article => article.id === selectedArticle) || null;
  };

  // Получаем основную статью (первая в списке)
  const featuredArticle = articlesData[0];
  // Остальные статьи
  const regularArticles = articlesData.slice(1);

  return (
    <section 
      id="articles" 
      ref={sectionRef}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>

      {/* Фоновая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] opacity-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Блог
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-6 font-[PobedaRegular]"
          >
            Полезные <span className="text-gradient">статьи</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-foreground/80 max-w-2xl mx-auto font-light"
          >
            Делимся экспертными знаниями и полезными советами для тех, кто хочет создать эффективный и современный сайт
          </motion.p>
        </div>

        <div className="space-y-10">
          {/* Главная статья - полная ширина */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.article 
              variants={articleVariants}
              className="group"
            >
              <a 
                href={`#article-${featuredArticle.slug}`}
                onClick={(e) => handleArticleClick(featuredArticle.id, e)}
                className="grid md:grid-cols-5 gap-6 bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="md:col-span-3 relative h-80 md:h-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:bg-gradient-to-r"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent/90 text-white text-xs rounded-full backdrop-blur-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-6 md:py-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-foreground/60 mb-3">
                    <span>{featuredArticle.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredArticle.readTime} чтения</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-6 line-clamp-3 md:line-clamp-4">
                    {featuredArticle.content.intro}
                  </p>
                  
                  <div className="mt-auto flex items-center text-accent font-medium">
                    <span>Читать статью</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </motion.article>
          </motion.div>

          {/* Сетка остальных статей */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regularArticles.map((article) => (
              <motion.article 
                key={article.id}
                variants={articleVariants}
                className="bg-card/40 backdrop-blur-sm rounded-xl overflow-hidden border border-border group hover:shadow-lg transition-all duration-300 flex flex-col"
                onMouseEnter={() => setHoveredArticle(article.id)}
                onMouseLeave={() => setHoveredArticle(null)}
              >
                <a 
                  href={`#article-${article.slug}`}
                  onClick={(e) => handleArticleClick(article.id, e)}
                  className="flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        hoveredArticle === article.id ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent/90 text-white text-xs rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-foreground/60 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime} чтения</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-3 flex-grow">
                      {article.content.intro}
                    </p>
                    
                    <div className="mt-auto flex items-center text-accent font-medium">
                      <span>Читать статью</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Модальное окно для статьи */}
      <ArticleModal 
        isOpen={selectedArticle !== null}
        onClose={handleCloseModal}
        article={getSelectedArticle()}
      />
    </section>
  );
};

export default Articles; 