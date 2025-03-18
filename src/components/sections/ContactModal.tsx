'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from '@/components/ui/ContactForm';

interface ContactModalProps {
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonClassName?: string;
  useSimplifiedForm?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({
  buttonText = 'Обсудить проект',
  buttonVariant = 'primary',
  buttonSize = 'md',
  buttonClassName = '',
  useSimplifiedForm = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const getButtonClasses = () => {
    const baseClasses = 'font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center';
    
    // Размер кнопки
    const sizeClasses = {
      sm: 'text-sm py-2 px-4',
      md: 'text-base py-3 px-6',
      lg: 'text-lg py-4 px-8',
    };
    
    // Вариант кнопки
    const variantClasses = {
      primary: 'bg-accent text-white hover:bg-accent/90 shadow-lg hover:shadow-xl hover:shadow-accent/20',
      secondary: 'bg-foreground text-background hover:bg-foreground/90',
      outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    };
    
    return `${baseClasses} ${sizeClasses[buttonSize]} ${variantClasses[buttonVariant]} ${buttonClassName}`;
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={getButtonClasses()}
      >
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/70 backdrop-blur-md z-50"
              onClick={handleCloseModal}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={handleCloseModal}
            >
              <div 
                className="bg-card/95 w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 relative border border-border backdrop-blur-lg overflow-hidden mb-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Декоративные элементы */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full filter blur-3xl"></div>
                
                {/* Кнопка закрытия */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseModal();
                  }}
                  className="fixed top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors bg-background/50 hover:bg-background/80 backdrop-blur-sm rounded-full p-2 border border-border/50 hover:border-border shadow-lg"
                  aria-label="Закрыть"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
                      Обсудить проект
                    </span>
                  </h2>
                  <p className="text-center text-foreground/70 mb-6">
                    Заполните форму, и мы свяжемся с вами для обсуждения деталей
                  </p>
                  <ContactForm onClose={handleCloseModal} isSimplified={useSimplifiedForm} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactModal; 