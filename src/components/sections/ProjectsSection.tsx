import { useState } from 'react';
import NewProjectModal from '../ui/NewProjectModal';

// Массивы изображений для каждого проекта
const project1Images = [
  {
    id: 1,
    src: '/images/projects/project1/1.webp',
    alt: 'Главный экран проекта 1'
  },
  {
    id: 2,
    src: '/images/projects/project1/2.webp',
    alt: 'Функционал проекта 1'
  },
  {
    id: 3,
    src: '/images/projects/project1/3.webp',
    alt: 'Интерфейс проекта 1'
  },
  {
    id: 4,
    src: '/images/projects/project1/4.webp',
    alt: 'Мобильная версия проекта 1'
  },
  {
    id: 5,
    src: '/images/projects/project1/5.webp',
    alt: 'Дополнительные возможности проекта 1'
  }
];

const project2Images = [
  {
    id: 1,
    src: '/images/projects/project2/1.webp',
    alt: 'Главный экран проекта 2'
  },
  {
    id: 2,
    src: '/images/projects/project2/2.webp',
    alt: 'Функционал проекта 2'
  },
  {
    id: 3,
    src: '/images/projects/project2/3.webp',
    alt: 'Интерфейс проекта 2'
  },
  {
    id: 4,
    src: '/images/projects/project2/4.webp',
    alt: 'Мобильная версия проекта 2'
  },
  {
    id: 5,
    src: '/images/projects/project2/5.webp',
    alt: 'Дополнительные возможности проекта 2'
  }
];

const project3Images = [
  {
    id: 1,
    src: '/images/projects/project3/1.webp',
    alt: 'Главный экран проекта 3'
  },
  {
    id: 2,
    src: '/images/projects/project3/2.webp',
    alt: 'Функционал проекта 3'
  },
  {
    id: 3,
    src: '/images/projects/project3/3.webp',
    alt: 'Интерфейс проекта 3'
  },
  {
    id: 4,
    src: '/images/projects/project3/4.webp',
    alt: 'Мобильная версия проекта 3'
  },
  {
    id: 5,
    src: '/images/projects/project3/5.webp',
    alt: 'Дополнительные возможности проекта 3'
  }
];

const project4Images = [
  {
    id: 1,
    src: '/images/projects/project4/1.webp',
    alt: 'Главный экран проекта 4'
  },
  {
    id: 2,
    src: '/images/projects/project4/2.webp',
    alt: 'Функционал проекта 4'
  },
  {
    id: 3,
    src: '/images/projects/project4/3.webp',
    alt: 'Интерфейс проекта 4'
  },
  {
    id: 4,
    src: '/images/projects/project4/4.webp',
    alt: 'Мобильная версия проекта 4'
  },
  {
    id: 5,
    src: '/images/projects/project4/5.webp',
    alt: 'Дополнительные возможности проекта 4'
  }
];

const ProjectsSection = () => {
  // Состояния для управления модальными окнами
  const [isProject1Open, setIsProject1Open] = useState(false);
  const [isProject2Open, setIsProject2Open] = useState(false);
  const [isProject3Open, setIsProject3Open] = useState(false);
  const [isProject4Open, setIsProject4Open] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Наши проекты</h2>
        
        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Проект 1 */}
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setIsProject1Open(true)}
          >
            <img 
              src={project1Images[0].src} 
              alt={project1Images[0].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Название проекта 1</h3>
              <p className="text-white/80">Краткое описание проекта 1</p>
            </div>
          </div>

          {/* Проект 2 */}
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setIsProject2Open(true)}
          >
            <img 
              src={project2Images[0].src} 
              alt={project2Images[0].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Название проекта 2</h3>
              <p className="text-white/80">Краткое описание проекта 2</p>
            </div>
          </div>

          {/* Проект 3 */}
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setIsProject3Open(true)}
          >
            <img 
              src={project3Images[0].src} 
              alt={project3Images[0].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Название проекта 3</h3>
              <p className="text-white/80">Краткое описание проекта 3</p>
            </div>
          </div>

          {/* Проект 4 */}
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setIsProject4Open(true)}
          >
            <img 
              src={project4Images[0].src} 
              alt={project4Images[0].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Название проекта 4</h3>
              <p className="text-white/80">Краткое описание проекта 4</p>
            </div>
          </div>
        </div>

        {/* Модальные окна проектов */}
        <NewProjectModal
          isOpen={isProject1Open}
          onClose={() => setIsProject1Open(false)}
          title="Название проекта 1"
          description={`Описание кейса:
Подробное описание проекта 1.

Задача:
Описание задачи проекта 1.

Реализация:
Описание реализации проекта 1.

Ключевые особенности проекта:
• Особенность 1
• Особенность 2
• Особенность 3

Результат:
Описание результатов проекта 1.

Заключение:
Итоговые выводы по проекту 1.`}
          projectUrl="https://project1.com"
          images={project1Images}
        />

        <NewProjectModal
          isOpen={isProject2Open}
          onClose={() => setIsProject2Open(false)}
          title="Название проекта 2"
          description={`Описание кейса:
Подробное описание проекта 2.

Задача:
Описание задачи проекта 2.

Реализация:
Описание реализации проекта 2.

Ключевые особенности проекта:
• Особенность 1
• Особенность 2
• Особенность 3

Результат:
Описание результатов проекта 2.

Заключение:
Итоговые выводы по проекту 2.`}
          projectUrl="https://project2.com"
          images={project2Images}
        />

        <NewProjectModal
          isOpen={isProject3Open}
          onClose={() => setIsProject3Open(false)}
          title="Название проекта 3"
          description={`Описание кейса:
Подробное описание проекта 3.

Задача:
Описание задачи проекта 3.

Реализация:
Описание реализации проекта 3.

Ключевые особенности проекта:
• Особенность 1
• Особенность 2
• Особенность 3

Результат:
Описание результатов проекта 3.

Заключение:
Итоговые выводы по проекту 3.`}
          projectUrl="https://project3.com"
          images={project3Images}
        />

        <NewProjectModal
          isOpen={isProject4Open}
          onClose={() => setIsProject4Open(false)}
          title="Название проекта 4"
          description={`Описание кейса:
Подробное описание проекта 4.

Задача:
Описание задачи проекта 4.

Реализация:
Описание реализации проекта 4.

Ключевые особенности проекта:
• Особенность 1
• Особенность 2
• Особенность 3

Результат:
Описание результатов проекта 4.

Заключение:
Итоговые выводы по проекту 4.`}
          projectUrl="https://project4.com"
          images={project4Images}
        />
      </div>
    </section>
  );
};

export default ProjectsSection; 