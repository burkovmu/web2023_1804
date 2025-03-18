import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullscreenMenu from './FullscreenMenu';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card p-8 rounded-2xl shadow-xl border border-border max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 text-foreground/60 hover:text-foreground transition-colors touch-manipulation"
                aria-label="Закрыть"
                style={{ touchAction: "manipulation" }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-bold font-display mb-4">Навигация по сайту</h2>
              <p className="text-foreground/70 mb-6">
                Откройте меню для быстрого доступа ко всем разделам сайта
              </p>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-medium"
              >
                Открыть меню
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default MenuModal; 