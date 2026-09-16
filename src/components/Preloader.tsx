import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Aperture } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D0D0E] text-[#F4F4F6] select-none"
        >
          {/* Subtle Crimson & Bronze Ambient Glow */}
          <div className="absolute w-[450px] h-[450px] bg-gradient-to-br from-[#E63946]/15 to-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border border-[#E63946]/40 flex items-center justify-center mb-6 bg-[#161618] shadow-2xl shadow-[#E63946]/15"
            >
              <Aperture className="w-8 h-8 text-[#E63946] animate-pulse" />
            </motion.div>

            <span className="font-serif-luxury text-xl sm:text-2xl font-light tracking-[0.3em] uppercase text-white mb-2">
              SHADAB HUSSAIN
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#E63946] font-medium mb-8 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
              Delhi NCR • Photography & Videography
            </span>

            <div className="flex items-baseline gap-1 font-serif-luxury">
              <span className="text-4xl sm:text-5xl font-light text-white tracking-tight w-24 text-right">
                {count < 10 ? `0${count}` : count}
              </span>
              <span className="text-lg text-[#E63946] font-sans-luxury font-light">%</span>
            </div>

            <div className="w-48 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E63946] to-[#D4AF37]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <span className="text-[10px] uppercase tracking-widest text-neutral-500 mt-4">
              Calibrating Lens Shutter
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
