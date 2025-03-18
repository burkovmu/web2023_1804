'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({
  direction = 'left',
  speed = 20,
  pauseOnHover = true,
  className = '',
  children,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const duration = contentWidth / speed;
  const directionFactor = direction === 'left' ? -1 : 1;

  return (
    <div
      ref={marqueeRef}
      className={`marquee overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={contentRef}
        className="marquee-content inline-flex"
        animate={{
          x: isPaused ? 0 : directionFactor * -contentWidth,
        }}
        transition={{
          x: {
            duration: isPaused ? 0 : duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            repeatDelay: 0,
          },
        }}
        style={{ paddingRight: '2rem' }}
      >
        {children}
      </motion.div>
      <motion.div
        className="marquee-content inline-flex"
        animate={{
          x: isPaused ? 0 : directionFactor * -contentWidth,
        }}
        transition={{
          x: {
            duration: isPaused ? 0 : duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            repeatDelay: 0,
          },
        }}
        style={{ paddingRight: '2rem' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee; 