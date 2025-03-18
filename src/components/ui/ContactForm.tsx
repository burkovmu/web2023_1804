'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  onClose?: () => void;
  isSimplified?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  websiteType: string;
  budget: string;
  deadline: string;
  features: string[];
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, isSimplified = false }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    websiteType: '',
    budget: '',
    deadline: '',
    features: [],
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const websiteTypes = [
    { value: '', label: 'Выберите тип сайта' },
    { value: 'landing', label: 'Лендинг' },
    { value: 'corporate', label: 'Корпоративный сайт' },
    { value: 'ecommerce', label: 'Интернет-магазин' },
    { value: 'blog', label: 'Блог' },
    { value: 'portal', label: 'Портал' },
    { value: 'webapp', label: 'Веб-приложение' },
    { value: 'other', label: 'Другое' },
  ];

  const budgetOptions = [
    { value: '', label: 'Выберите бюджет' },
    { value: '50 000 - 100 000 ₽', label: '50 000 - 100 000 ₽' },
    { value: '100 000 - 300 000 ₽', label: '100 000 - 300 000 ₽' },
    { value: '300 000 - 500 000 ₽', label: '300 000 - 500 000 ₽' },
    { value: 'более 500 000 ₽', label: 'более 500 000 ₽' },
  ];

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }
    
    if (!isSimplified && !formData.websiteType) {
      newErrors.websiteType = 'Пожалуйста, выберите тип сайта';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Очищаем ошибку при вводе
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Имитация отправки формы
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Закрываем модальное окно через 3 секунды после успешной отправки
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 3000);
        }
      }, 1500);
    }
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Спасибо за заявку!</h3>
          <p className="text-foreground/70">
            Мы получили вашу заявку и свяжемся с вами в ближайшее время.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Контактная информация */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-accent">Контактная информация</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Ваше имя <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.name ? 'border-red-500' : 'border-border'
                    } focus:border-accent focus:outline-none transition-colors duration-300`}
                    placeholder="Введите ваше имя"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${
                      errors.email ? 'border-red-500' : 'border-border'
                    } focus:border-accent focus:outline-none transition-colors duration-300`}
                    placeholder="Введите ваш email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                    Название компании
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="Название вашей компании"
                  />
                </div>
              </div>
            </div>
            
            {/* Информация о проекте - показываем только если форма не упрощенная */}
            {!isSimplified && (
              <>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-accent">Информация о проекте</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="websiteType" className="block text-sm font-medium mb-1">
                        Тип сайта <span className="text-accent">*</span>
                      </label>
                      <select
                        id="websiteType"
                        name="websiteType"
                        value={formData.websiteType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-background border ${
                          errors.websiteType ? 'border-red-500' : 'border-border'
                        } focus:border-accent focus:outline-none transition-colors duration-300`}
                      >
                        {websiteTypes.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.websiteType && (
                        <p className="mt-1 text-sm text-red-500">{errors.websiteType}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-1">
                        Бюджет
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                      >
                        {budgetOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Дополнительная информация
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Опишите ваш проект, цели и пожелания"
                  ></textarea>
                </div>
              </>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              </>
            ) : (
              'Отправить заявку'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 