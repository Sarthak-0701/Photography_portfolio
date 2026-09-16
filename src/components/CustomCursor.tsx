import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomCursorProps {
  isVisible: boolean;
  text?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  isVisible,
  text = 'VIEW ↗',
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white text-black font-semibold text-[10px] tracking-widest uppercase mix-blend-difference shadow-2xl"
        >
          <span>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
