'use client';

import React, { useState, useRef, memo, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ContactModal from './ContactModal';
import Button from '@/components/ui/Button';
import NewProjectModal from '@/components/ui/NewProjectModal';

// Определение типов для проекта
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  placeholder: string;
  category: string;
  tags: string[];
  features: string[];
  projectUrl?: string;
  galleryImages?: {
    id: number;
    src: string;
    alt: string;
  }[];
}

// Типы для пропсов компонентов
interface ProjectCardProps {
  project: Project;
  onClick: (id: number) => void;
  isHovered: boolean;
  onHover: (id: number) => void;
  onHoverEnd: () => void;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Мемоизированный компонент проекта для предотвращения лишних ререндеров
const ProjectCard = memo(({ project, onClick, isHovered, onHover, onHoverEnd }: ProjectCardProps) => {
  return (
    <div
      className="project-card relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onHoverEnd}
      style={{ 
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        willChange: 'transform'
      }}
    >
      <div className="relative h-[300px] md:h-[400px] p-8 flex flex-col justify-end bg-gradient-to-br from-accent/10 via-secondary/10 to-accent/5">
        {/* Фоновая анимация при наведении */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Категория */}
        <span
          className="relative z-10 inline-block py-1 px-3 rounded-full bg-accent/20 backdrop-blur-sm text-white text-xs font-medium mb-3 w-fit"
        >
          {project.category}
        </span>
        
        {/* Заголовок */}
        <h3 
          className="relative z-10 text-2xl md:text-3xl font-bold mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
            {project.title}
          </span>
        </h3>
        
        {/* Описание */}
        <p 
          className={`relative z-10 text-white/90 mb-4 line-clamp-2 md:line-clamp-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
        >
          {project.description}
        </p>
        
        {/* Теги */}
        <div 
          className="relative z-10 flex flex-wrap gap-2 mb-4"
        >
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Кнопка */}
        <div
          className={`relative z-10 transform transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Button 
            onClick={() => onClick(project.id)}
            variant="gradient"
            size="md"
            className="w-full sm:w-auto"
          >
            Подробнее о проекте
          </Button>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Мемоизированный компонент модального окна
const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-card/95 backdrop-blur-lg rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={project.placeholder || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 backdrop-blur-sm text-white text-xs font-medium mb-3">
              {project.category}
            </span>
            <h3 className="text-3xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                {project.title}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8">
          <h4 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            О проекте
          </h4>
          <p className="text-foreground/90 mb-6">{project.description}</p>
          
          <h4 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
            Ключевые особенности
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {project.features.map((feature: string, index: number) => (
              <li 
                key={index} 
                className="flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 text-accent"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.875 5.625L8.125 14.375L3.75 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-foreground/90">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              Закрыть
            </Button>
            <ContactModal 
              buttonText="Обсудить похожий проект" 
              buttonVariant="primary" 
              buttonSize="md"
              buttonClassName="w-full sm:w-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

// Данные о проектах
const projects: Project[] = [
  {
    id: 1,
    title: 'Архитектурное бюро "Модерн"',
    description: 'Минималистичный сайт с плавными переходами и параллакс-эффектами для архитектурного бюро. Уникальный дизайн, отражающий философию современной архитектуры.',
    image: '/images/portfolio/modern/1.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Архитектура',
    tags: ['React', 'Next.js', 'GSAP', 'Framer Motion'],
    features: [
      'Параллакс-эффекты',
      'Интерактивная галерея проектов',
      'Анимированные переходы',
      'Оптимизированная производительность'
    ],
    projectUrl: 'https://example.com/modern',
    galleryImages: [
      {
        id: 1,
        src: '/images/portfolio/modern/1.jpg',
        alt: 'Главная страница сайта'
      },
      {
        id: 2,
        src: '/images/portfolio/modern/2.jpg',
        alt: 'О компании'
      },
      {
        id: 3,
        src: '/images/portfolio/modern/3.jpg',
        alt: 'Портфолио'
      },
      {
        id: 4,
        src: '/images/portfolio/modern/4.jpg',
        alt: 'Контакты'
      },
      {
        id: 5,
        src: '/images/portfolio/modern/5.jpg',
        alt: 'Услуги'
      }
    ]
  },
  {
    id: 2,
    title: 'Аренда автомобилей в Дубае "RentDubai"',
    description: `Описание кейса:
Современный веб-сайт для премиальной компании по аренде автомобилей в Дубае, предоставляющий удобный сервис для клиентов со всего мира.

Задача:
Разработать современный и функциональный сайт для компании, предоставляющей услуги аренды автомобилей премиум-класса в Дубае. Основные требования: удобство для пользователей, поддержка двух языков (русский и английский), а также интеграция формы бронирования с выбором дат.

Реализация:
Мы создали стильный и интуитивно понятный сайт с современным дизайном и удобным интерфейсом. Особое внимание было уделено пользовательскому опыту и оптимизации процесса бронирования автомобилей.

Ключевые особенности проекта:
• Мультиязычность: полная поддержка русского и английского языков
• Умная форма бронирования: интуитивно понятный процесс выбора дат и автомобиля
• Адаптивный дизайн: идеальное отображение на всех устройствах
• Каталог автомобилей: детальные описания и характеристики каждой модели
• Удобная навигация: интуитивно понятная структура сайта
• Оптимизация скорости: быстрая загрузка всех страниц
• Интеграция с CRM: автоматизация обработки заявок

Результат:
Сайт стал эффективным инструментом для привлечения клиентов и увеличения продаж. Благодаря удобной форме бронирования и поддержке двух языков, компания смогла расширить свою аудиторию и улучшить качество обслуживания. Количество онлайн-бронирований выросло на 150% в первые три месяца после запуска.

Заключение:
Этот проект демонстрирует, как современные технологии и продуманный дизайн помогают бизнесу достигать новых высот. Сайт не только улучшил пользовательский опыт, но и значительно увеличил эффективность бизнес-процессов компании.`,
    image: '/images/portfolio/aurum/1.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Аренда автомобилей',
    tags: ['React', 'Redux', 'Three.js', 'Node.js'],
    features: [
      'Мультиязычность (русский и английский)',
      'Форма бронирования с выбором дат',
      'Адаптивный дизайн',
      'Каталог автомобилей',
      'Удобная навигация'
    ],
    projectUrl: 'https://example.com/aurum',
    galleryImages: [
      {
        id: 1,
        src: '/images/portfolio/aurum/1.jpg',
        alt: 'Главная страница'
      },
      {
        id: 2,
        src: '/images/portfolio/aurum/2.jpg',
        alt: 'Каталог автомобилей'
      },
      {
        id: 3,
        src: '/images/portfolio/aurum/3.jpg',
        alt: 'Форма бронирования'
      },
      {
        id: 4,
        src: '/images/portfolio/aurum/4.jpg',
        alt: 'Страница автомобиля'
      },
      {
        id: 5,
        src: '/images/portfolio/aurum/5.jpg',
        alt: 'Контакты'
      }
    ]
  },
  {
    id: 3,
    title: 'Фестиваль "Новая волна"',
    description: 'Динамичный сайт с нестандартной навигацией и анимированными переходами для музыкального фестиваля. Яркий дизайн, отражающий атмосферу мероприятия.',
    image: '/images/portfolio/festival/1.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Мероприятия',
    tags: ['Next.js', 'GSAP', 'WebGL', 'Firebase'],
    features: [
      'Интерактивная программа фестиваля',
      'Онлайн-бронирование билетов',
      'Стриминг выступлений',
      'Интеграция соцсетей'
    ],
    projectUrl: 'https://example.com/festival',
    galleryImages: [
      {
        id: 1,
        src: '/images/portfolio/festival/1.jpg',
        alt: 'Главная страница фестиваля'
      },
      {
        id: 2,
        src: '/images/portfolio/festival/2.jpg',
        alt: 'Программа мероприятий'
      },
      {
        id: 3,
        src: '/images/portfolio/festival/3.jpg',
        alt: 'Билеты'
      },
      {
        id: 4,
        src: '/images/portfolio/festival/4.jpg',
        alt: 'Участники'
      },
      {
        id: 5,
        src: '/images/portfolio/festival/5.jpg',
        alt: 'Галерея'
      }
    ]
  },
  {
    id: 4,
    title: 'Экосистема "GreenTech"',
    description: 'Интерактивная платформа с визуализацией данных и сложными анимациями для технологического стартапа. Инновационный подход к представлению информации.',
    image: '/images/portfolio/greentech/1.jpg',
    placeholder: 'data:image/jpeg;base64,...',
    category: 'Технологии',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    features: [
      'Визуализация данных в реальном времени',
      'Интерактивные графики',
      'API интеграция',
      'Масштабируемая архитектура'
    ],
    projectUrl: 'https://example.com/greentech',
    galleryImages: [
      {
        id: 1,
        src: '/images/portfolio/greentech/1.jpg',
        alt: 'Главная страница платформы'
      },
      {
        id: 2,
        src: '/images/portfolio/greentech/2.jpg',
        alt: 'Дашборд'
      },
      {
        id: 3,
        src: '/images/portfolio/greentech/3.jpg',
        alt: 'Аналитика'
      },
      {
        id: 4,
        src: '/images/portfolio/greentech/4.jpg',
        alt: 'Интеграции'
      },
      {
        id: 5,
        src: '/images/portfolio/greentech/5.jpg',
        alt: 'Настройки'
      }
    ]
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Мемоизируем выбранный проект, чтобы избежать лишних вычислений при ререндере
  const selectedProjectData = useMemo(() => 
    selectedProject !== null ? projects.find(p => p.id === selectedProject) || null : null, 
    [selectedProject]
  );

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      
      {/* Упрощенные градиентные круги без анимации */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/5 to-secondary/5 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-secondary/5 to-accent/5 blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Наши работы
          </div>
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold font-display mb-6 font-[PobedaRegular]"
          >
            Портфолио <span className="text-gradient">проектов</span>
          </h2>
          <p 
            className="text-foreground/80 max-w-2xl mx-auto"
          >
            Каждый проект — это уникальное решение, созданное с учетом потребностей клиента и современных тенденций в дизайне.
          </p>
        </div>

        {/* Сетка проектов с оптимизацией для производительности */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 content-visibility-auto"
        >
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              isHovered={hoveredProject === project.id}
              onHover={setHoveredProject}
              onHoverEnd={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Кнопка "Обсудить проект" */}
        <div 
          className="text-center mt-16"
        >
          <ContactModal 
            buttonText="Обсудить ваш проект" 
            buttonVariant="primary" 
            buttonSize="lg" 
            buttonClassName="px-8 shadow-lg shadow-accent/20"
          />
        </div>

        {/* Модальное окно с деталями проекта */}
        <AnimatePresence>
          {selectedProject !== null && selectedProjectData && (
            <NewProjectModal 
              isOpen={selectedProject !== null}
              onClose={() => setSelectedProject(null)}
              title={selectedProjectData.title}
              description={selectedProjectData.description}
              projectUrl={selectedProjectData.projectUrl}
              images={selectedProjectData.galleryImages || []}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio; 