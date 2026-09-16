import React from 'react';
import { motion } from 'motion/react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}) => {
  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.9,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
