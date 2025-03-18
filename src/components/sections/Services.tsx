'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card3D from '@/components/ui/Card3D';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ParallaxItem from '@/components/ui/ParallaxItem';

const Services = () => {
  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16.5V21.5M18 21.5H6M5 3.5H19C20.1046 3.5 21 4.39543 21 5.5V15.5C21 16.6046 20.1046 17.5 19 17.5H5C3.89543 17.5 3 16.6046 3 15.5V5.5C3 4.39543 3.89543 3.5 5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Веб-разработка',
      description: 'Создаем современные, быстрые и адаптивные веб-сайты с использованием передовых технологий и фреймворков.',
      features: ['React/Next.js', 'Адаптивный дизайн', 'Оптимизация производительности'],
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12.5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3.5C14.5013 6.19375 15.9228 9.29344 16 12.5C15.9228 15.7066 14.5013 18.8063 12 21.5C9.49872 18.8063 8.07725 15.7066 8 12.5C8.07725 9.29344 9.49872 6.19375 12 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Интернет-магазины',
      description: 'Разрабатываем функциональные и удобные интернет-магазины с интеграцией платежных систем и CRM.',
      features: ['Платежные системы', 'Интеграция с CRM', 'Управление товарами'],
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9.5C9 8.39543 9.89543 7.5 11 7.5H13C14.1046 7.5 15 8.39543 15 9.5C15 10.6046 14.1046 11.5 13 11.5H11C9.89543 11.5 9 12.3954 9 13.5C9 14.6046 9.89543 15.5 11 15.5H13C14.1046 15.5 15 14.6046 15 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Веб-приложения',
      description: 'Создаем сложные веб-приложения с богатым пользовательским интерфейсом и оптимизированной производительностью.',
      features: ['SPA/PWA', 'Real-time функции', 'Масштабируемость'],
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 8.5H3C2.44772 8.5 2 8.94772 2 9.5V19.5C2 20.0523 2.44772 20.5 3 20.5H7C7.55228 20.5 8 20.0523 8 19.5V9.5C8 8.94772 7.55228 8.5 7 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 4.5H17C16.4477 4.5 16 4.94772 16 5.5V19.5C16 20.0523 16.4477 20.5 17 20.5H21C21.5523 20.5 22 20.0523 22 19.5V5.5C22 4.94772 21.5523 4.5 21 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 12.5H10C9.44772 12.5 9 12.9477 9 13.5V19.5C9 20.0523 9.44772 20.5 10 20.5H14C14.5523 20.5 15 20.0523 15 19.5V13.5C15 12.9477 14.5523 12.5 14 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'UI/UX дизайн',
      description: 'Разрабатываем интуитивно понятные интерфейсы и создаем привлекательный дизайн, ориентированный на пользователя.',
      features: ['Прототипирование', 'Анимации', 'Микровзаимодействия'],
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11.5C20 16.4706 16.4706 20.5 12 20.5M20 11.5C20 6.52944 16.4706 2.5 12 2.5M20 11.5H4M12 20.5C7.52944 20.5 4 16.4706 4 11.5M12 20.5C10.3431 20.5 9 16.4706 9 11.5C9 6.52944 10.3431 2.5 12 2.5M12 20.5C13.6569 20.5 15 16.4706 15 11.5C15 6.52944 13.6569 2.5 12 2.5M4 11.5C4 6.52944 7.52944 2.5 12 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'SEO-оптимизация',
      description: 'Повышаем видимость вашего сайта в поисковых системах и увеличиваем органический трафик.',
      features: ['Техническая оптимизация', 'Контент-стратегия', 'Аналитика'],
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11.5L11 13.5L15 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Поддержка',
      description: 'Обеспечиваем бесперебойную работу вашего сайта, оперативно решаем технические проблемы и обновляем контент.',
      features: ['24/7 мониторинг', 'Обновления', 'Резервное копирование'],
    },
  ];

  return (
    <section id="services" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Анимированный фон */}
      <AnimatedBackground className="opacity-50" />
      
      {/* Декоративные элементы */}
      <ParallaxItem speed={0.2} className="absolute top-20 left-10 z-0">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
      </ParallaxItem>
      
      <ParallaxItem speed={-0.3} className="absolute top-40 right-20 z-0">
        <div className="w-3 h-3 rounded-full bg-secondary"></div>
      </ParallaxItem>
      
      <ParallaxItem speed={0.4} className="absolute bottom-40 left-1/4 z-0">
        <div className="w-4 h-4 rounded-full bg-accent/50"></div>
      </ParallaxItem>
      
      <div className="absolute top-1/4 left-0 w-[150px] h-[1px] bg-gradient-to-r from-accent to-transparent z-0"></div>
      <div className="absolute bottom-1/3 right-0 w-[150px] h-[1px] bg-gradient-to-l from-secondary to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center">
        <div className="text-center mb-16 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Наши услуги
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-6 font-[PobedaRegular]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Наши <span className="text-gradient">услуги</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-foreground/80 font-light"
          >
            Мы предоставляем полный спектр услуг по разработке веб-сайтов и приложений, 
            от проектирования до запуска и поддержки.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card3D 
                className="bg-card p-6 h-full rounded-xl border border-border hover:border-accent/50 transition-all duration-300"
                glareColor={index % 2 === 0 ? 'rgba(255, 62, 0, 0.1)' : 'rgba(37, 99, 235, 0.1)'}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{service.title}</h3>
                <p className="text-foreground/80 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground/70">
                      <svg className="w-4 h-4 mr-2 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 