# WebStudio

Современный сайт-портфолио веб-студии, разработанный с использованием Next.js и Tailwind CSS.

## Демо

Демо-версия проекта доступна по адресу: [https://webstudio-burkovmu.vercel.app](https://webstudio-burkovmu.vercel.app)

## Технологии

- **Next.js 15** - React-фреймворк с серверным рендерингом
- **Tailwind CSS** - Утилитарный CSS-фреймворк
- **Framer Motion** - Библиотека для создания анимаций
- **TypeScript** - Типизированный JavaScript

## Особенности

- Адаптивный дизайн для всех устройств
- Оптимизированная производительность
- Анимации и интерактивные элементы
- SEO-оптимизация
- Оптимизация изображений

## Установка и запуск

### Требования

- Node.js 18.0 или выше
- npm 8.0 или выше

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/burkovmu/webstudio.git
cd webstudio

# Установка зависимостей
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

### Сборка для продакшена

```bash
npm run build
```

### Запуск продакшен-версии

```bash
npm run start
```

## Структура проекта

```
webstudio/
├── public/           # Статические файлы
│   └── images/       # Изображения
├── src/              # Исходный код
│   ├── app/          # Маршрутизация Next.js App Router
│   ├── components/   # React-компоненты
│   │   ├── sections/ # Секции страницы
│   │   └── ui/       # UI-компоненты
│   ├── lib/          # Вспомогательные функции
│   └── styles/       # Глобальные стили
├── .github/          # GitHub Actions
├── next.config.js    # Конфигурация Next.js
└── tailwind.config.js # Конфигурация Tailwind CSS
```

## Деплой на Vercel

Проект настроен для автоматического деплоя на Vercel при пуше в ветку `main`.

## Лицензия

MIT
