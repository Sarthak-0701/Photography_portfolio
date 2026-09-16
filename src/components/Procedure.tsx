import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sliders
} from 'lucide-react';
import { PROCEDURE_STEPS } from '../data/photographyData';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';

interface ProcedureProps {
  onBookClick: () => void;
}

export const Procedure: React.FC<ProcedureProps> = ({ onBookClick }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PROCEDURE_STEPS[activeStepIndex];

  return (
    <section
      id="procedure"
      aria-label="Creative Procedure and Workflow"
      className="py-28 sm:py-36 bg-[#0D0D0E] relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E63946]/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#D4AF37]/5 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>Creative Procedure</span>
          </div>

          <TextReveal as="h2" className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
            The 4-Step Creative Workflow
          </TextReveal>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
            Every project follows an intentional, collaborative process. From initial concept mapping 
            to master file delivery, see how we capture your visual story in Delhi NCR.
          </p>
        </div>

        {/* 4 Process Cards Staggered Entrance */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {PROCEDURE_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <motion.button
                key={step.stepNumber}
                type="button"
                id={`procedure-step-btn-${idx}`}
                onClick={() => setActiveStepIndex(idx)}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] ${
                  isActive
                    ? 'bg-[#161618] border-[#E63946]/50 shadow-xl shadow-[#E63946]/10'
                    : 'bg-[#121214] hover:bg-[#161618] border-white/5 hover:border-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProcedureGlow"
                    className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-[#E63946] via-[#D4AF37] to-[#E63946]"
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-serif-luxury text-2xl font-medium ${
                      isActive ? 'text-[#E63946]' : 'text-neutral-500'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                    {step.duration}
                  </span>
                </div>

                <h3
                  className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-300'
                  }`}
                >
                  {step.title}
                </h3>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Step Feature Display */}
        <div className="relative rounded-3xl bg-[#161618] border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.stepNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3.5 mb-5">
                    <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/30">
                      Step {currentStep.stepNumber} of 04
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-[#E63946]" />
                      <span>{currentStep.duration}</span>
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3 leading-tight">
                    {currentStep.title}
                  </h3>
                  <p className="text-[#D4AF37] text-xs sm:text-sm uppercase tracking-widest font-medium mb-6">
                    {currentStep.subtitle}
                  </p>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-10 font-light">
                    {currentStep.description}
                  </p>

                  <div className="space-y-4 mb-10">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Key Deliverables & Focus Points:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentStep.keyDeliverables.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-xs text-neutral-300 p-3.5 rounded-xl bg-[#0D0D0E]/80 border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                  <MagneticButton>
                    <button
                      type="button"
                      onClick={onBookClick}
                      className="py-3.5 px-7 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#E63946] text-white hover:bg-[#c82333] shadow-lg shadow-[#E63946]/25 active:scale-95 transition-all"
                    >
                      Book Shoot
                    </button>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveStepIndex((prev) => (prev + 1) % PROCEDURE_STEPS.length)
                    }
                    className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-[#E63946] transition-colors py-3.5 px-4"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E]/90 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] uppercase tracking-widest text-[#E63946] font-semibold block mb-0.5">
                      Shadab Hussain Studio Workflow
                    </span>
                    <span className="font-serif-luxury text-xl text-white font-light">
                      {currentStep.focusArea}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
