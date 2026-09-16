import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, X, Clock, User } from 'lucide-react';
import { PHILOSOPHY_THOUGHTS } from '../data/photographyData';
import { PhilosophyThought } from '../types';
import { TextReveal } from './TextReveal';

export const Thoughts: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<PhilosophyThought | null>(null);

  return (
    <section
      id="thoughts"
      aria-label="Photography Philosophy and Thoughts"
      className="py-28 sm:py-36 bg-[#0D0D0E] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Essays & Philosophy</span>
          </div>

          <TextReveal as="h2" className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
            Thoughts on Light, Heritage & Motion
          </TextReveal>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Short notes on visual storytelling, architectural reverence, and raw portrait philosophy 
            from our work across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {PHILOSOPHY_THOUGHTS.map((item) => (
            <article
              key={item.id}
              className="bg-[#161618] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#E63946]/40 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E63946] text-white text-[10px] uppercase tracking-wider font-semibold shadow-md">
                  {item.category}
                </span>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E63946]" />
                      {item.readTime}
                    </span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-serif-luxury text-2xl text-white font-normal mb-3 leading-snug group-hover:text-[#E63946] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEssay(item)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E63946] hover:text-[#D4AF37] transition-colors pt-5 border-t border-white/5"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEssay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-[#0D0D0E]/95 backdrop-blur-xl"
            onClick={() => setSelectedEssay(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#161618] border border-white/10 rounded-3xl max-w-3xl w-full p-8 sm:p-12 max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedEssay(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-[#0D0D0E] text-neutral-400 hover:text-white border border-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#E63946]" />
              </button>

              <span className="text-xs text-[#E63946] uppercase tracking-widest font-semibold block mb-2">
                {selectedEssay.category} • {selectedEssay.readTime}
              </span>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light mb-4">
                {selectedEssay.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-neutral-400 mb-8 pb-4 border-b border-white/10">
                <span className="flex items-center gap-1.5 text-white">
                  <User className="w-3.5 h-3.5 text-[#E63946]" />
                  {selectedEssay.author}
                </span>
                <span>•</span>
                <span>{selectedEssay.date}</span>
              </div>

              <div className="space-y-5 text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {selectedEssay.fullEssay.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Shadab Hussain Portfolio Essays</span>
                <button
                  type="button"
                  onClick={() => setSelectedEssay(null)}
                  className="px-5 py-2.5 rounded-full bg-[#E63946] text-white font-semibold text-xs uppercase shadow-md shadow-[#E63946]/20"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
