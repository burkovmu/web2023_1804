'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Marquee from '@/components/ui/Marquee';

const Clients = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  // Массив с логотипами клиентов (в реальном проекте здесь будут настоящие логотипы)
  const clients = [
    { id: 1, name: 'Client 1' },
    { id: 2, name: 'Client 2' },
    { id: 3, name: 'Client 3' },
    { id: 4, name: 'Client 4' },
    { id: 5, name: 'Client 5' },
    { id: 6, name: 'Client 6' },
    { id: 7, name: 'Client 7' },
    { id: 8, name: 'Client 8' },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Наши клиенты
          </motion.span>
          <h2
            ref={titleRef}
            className="text-2xl md:text-4xl font-bold font-display mb-6"
          >
            Компании, которые нам <span className="text-gradient">доверяют</span>
          </h2>
        </div>
      </div>

      <div className="py-8">
        <Marquee speed={15} className="py-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="mx-8 flex items-center justify-center h-16 w-40 bg-card rounded-lg border border-border"
            >
              <span className="text-foreground/70 font-medium">{client.name}</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={12} direction="right" className="py-4 mt-8">
          {[...clients].reverse().map((client) => (
            <div
              key={client.id}
              className="mx-8 flex items-center justify-center h-16 w-40 bg-card rounded-lg border border-border"
            >
              <span className="text-foreground/70 font-medium">{client.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Clients; 