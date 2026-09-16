import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../data/photographyData';
import { TextReveal } from './TextReveal';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials and Reviews"
      className="py-28 sm:py-36 bg-[#0D0D0E] relative border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Client Reviews</span>
          </div>

          <TextReveal as="h2" className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
            Words from Creative Directors & Clients
          </TextReveal>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Trusted by editorial directors, heritage foundations, and private clients across Delhi NCR and international assignments.
          </p>
        </div>

        {/* Featured Testimonial Showcase */}
        <div className="relative rounded-3xl bg-[#161618] border border-white/10 p-8 sm:p-14 lg:p-18 shadow-2xl overflow-hidden mb-16">
          <div className="absolute top-6 right-8 opacity-5 text-[#E63946] pointer-events-none" aria-hidden="true">
            <Quote className="w-56 h-56" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Client Avatar */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-6">
                <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-[#E63946]/50 p-1 bg-black shrink-0 shadow-xl">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                    {current.name}
                  </h3>
                  <p className="text-[#E63946] text-xs font-semibold tracking-wide uppercase mt-1">
                    {current.role}
                  </p>
                  <p className="text-neutral-400 text-xs mt-1">
                    {current.organization} • {current.location}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-neutral-300 mt-4">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E63946]" />
                    <span>{current.projectType}</span>
                  </div>
                </div>
              </div>

              {/* Right Quote & Stars */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 mb-8" aria-label={`Rating: ${current.rating} out of 5 stars`}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#E63946] text-[#E63946]" />
                  ))}
                  <span className="text-xs text-neutral-400 ml-2 font-medium">
                    Verified Photography Client
                  </span>
                </div>

                <blockquote className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl text-neutral-100 font-light leading-relaxed italic mb-10">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span className="text-[#E63946] font-bold">0{currentIndex + 1}</span>
                    <span>/</span>
                    <span>0{TESTIMONIALS.length}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
                    >
                      <ChevronRight className="w-4 h-4 text-[#E63946]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Grid Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`text-left p-5 rounded-2xl border transition-all ${
                currentIndex === idx
                  ? 'bg-[#161618] border-[#E63946]/50 shadow-lg'
                  : 'bg-[#121214] hover:bg-[#161618] border-white/5 text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-xs text-white truncate">{t.name}</span>
                <span className="text-[10px] text-[#E63946] ml-auto">{t.location}</span>
              </div>
              <p className="text-[11px] text-neutral-400 line-clamp-2 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
