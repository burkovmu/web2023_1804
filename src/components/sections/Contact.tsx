'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ui/ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Свяжитесь с нами
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-display mb-6 font-[PobedaRegular]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Готовы обсудить <span className="text-gradient">ваш проект</span>?
          </motion.h2>
          
          <motion.p 
            className="text-foreground/80 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Мы готовы помочь воплотить ваши идеи в жизнь. Заполните форму ниже, 
            и мы свяжемся с вами в ближайшее время для обсуждения деталей.
          </motion.p>
        </div>
        
        <motion.div
          className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Декоративные элементы */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 