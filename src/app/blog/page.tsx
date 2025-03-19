'use client';

import { articlesData } from '@/components/data/articlesData';
import ArticleModal from '@/components/ui/ArticleModal';
import { useState } from 'react';
import Image from 'next/image';

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

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

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full mb-3">
              Блог
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4 font-[PobedaRegular]">
              Полезные <span className="text-gradient">статьи</span>
            </h1>
            <p className="text-foreground/80 max-w-2xl text-base">
              Делимся экспертными знаниями и советами по созданию современных веб-сайтов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesData.map((article) => (
              <div
                key={article.id}
                className="cursor-pointer group"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 h-[300px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-end p-6 z-10">
                    <span className="inline-block px-2 py-1 bg-accent/90 text-white text-sm rounded-full mb-3 self-start">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-white/90 mb-4 line-clamp-3">
                      {article.content.intro}
                    </p>
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>{article.date}</span>
                      <span className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArticleModal 
        isOpen={selectedArticle !== null}
        onClose={handleCloseModal}
        article={getSelectedArticle()}
      />
    </main>
  );
} 