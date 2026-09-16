import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Film, ChevronLeft, ChevronRight, ArrowDown, Landmark, Sparkles, Eye, Layers } from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onBookClick: () => void;
}

const HERO_SLIDES = [
  {
    id: 'india-gate',
    title: 'Sentry of the Capital',
    series: 'Delhi Monument Series No. 01',
    location: 'India Gate • 50mm f/4.0 • New Delhi',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    alt: 'India Gate monument photography by Shadab Hussain in New Delhi',
    tagTop: { title: 'Delhi Monument', sub: 'Kartavya Path, New Delhi', icon: Landmark },
    tagBottom: { title: 'Heritage Series', sub: '50mm f/4.0 • Twilight', icon: Eye },
  },
  {
    id: 'humayun-tomb',
    title: 'Echoes of Mughal Geometry',
    series: 'Delhi Monument Series No. 02',
    location: "Humayun's Tomb • 35mm f/2.8 • New Delhi",
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
    alt: "Humayun's Tomb photography by Shadab Hussain in New Delhi",
    tagTop: { title: 'Mughal Architecture', sub: 'Symmetrical Arches', icon: Sparkles },
    tagBottom: { title: '35mm Prime Lens', sub: 'Dawn Light Sculpting', icon: Camera },
  },
  {
    id: 'qutub-minar',
    title: 'The Vertical Legacy',
    series: 'Delhi Monument Series No. 03',
    location: 'Qutub Minar • 24mm f/8.0 • Mehrauli',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
    alt: 'Qutub Minar photography by Shadab Hussain in Delhi NCR',
    tagTop: { title: 'Historic Complex', sub: 'Mehrauli Sandstone', icon: Layers },
    tagBottom: { title: '24mm Ultra-Wide', sub: 'Low Angle Framing', icon: MapPin },
  },
  {
    id: 'raw-portrait',
    title: 'Gaze of the Silent Bard',
    series: 'Portrait Series No. 04',
    location: 'Studio NCR • 85mm f/1.4 • New Delhi',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    alt: 'Raw portrait photography by Shadab Hussain in Delhi NCR',
    tagTop: { title: 'Raw Portraits', sub: 'Natural skin & light', icon: Camera },
    tagBottom: { title: '4K Videography', sub: 'Delhi NCR & Worldwide', icon: Film },
  },
];

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotating Hero Showcase Slideshow (every 3.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];
  const TopIcon = activeSlide.tagTop.icon;
  const BottomIcon = activeSlide.tagBottom.icon;

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-[#0D0D0E]"
    >
      {/* Dual Red & Bronze Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[520px] bg-gradient-to-b from-[#E63946]/15 via-[#D4AF37]/8 to-transparent blur-[160px] pointer-events-none -z-10" />
      <div className="absolute -left-48 top-1/3 w-96 h-96 bg-[#E63946]/8 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -right-48 bottom-10 w-96 h-96 bg-[#D4AF37]/8 blur-[130px] pointer-events-none -z-10" />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:6rem_6rem]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Prestige Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-[#E63946]/40 text-[#E63946] text-xs font-medium tracking-widest uppercase mb-8 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
              <span className="font-semibold">Shadab Hussain Studio</span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span className="text-neutral-300 font-normal">Delhi NCR, New Delhi</span>
            </div>

            {/* Masked Line Typography Reveal */}
            <TextReveal as="h1" className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.08] mb-8">
              CAPTURING THE{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-[#E63946] to-[#D4AF37]">
                UNSPOKEN.
              </span>
            </TextReveal>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mb-10">
              Fine-art portraiture, street noir, and architectural heritage photography across Delhi NCR. 
              Documenting iconic Delhi monuments including India Gate, Humayun’s Tomb, and Qutub Minar 
              through clean lighting and authentic visual storytelling.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 mb-16">
              <MagneticButton>
                <button
                  id="hero-book-shoot-btn"
                  type="button"
                  onClick={onBookClick}
                  className="px-9 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#E63946] text-white shadow-xl shadow-[#E63946]/30 hover:bg-[#c82333] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
                >
                  Book Shoot
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  id="hero-explore-gallery-btn"
                  type="button"
                  onClick={scrollToGallery}
                  className="px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-white transition-all duration-200 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <span>Explore Works</span>
                  <ArrowDown className="w-4 h-4 text-[#E63946]" />
                </button>
              </MagneticButton>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-white/10 w-full">
              {PHOTOGRAPHER_INFO.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#D4AF37] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic Showcase Card & Synchronized Floating Tags */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/90 group">
              {/* Dynamic Slideshow Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide.id}
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E]/95 via-[#0D0D0E]/20 to-transparent" />

              {/* Top Controls & Slide Dots Indicator */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D0D0E]/80 border border-white/10 backdrop-blur-md text-[10px] text-white font-mono">
                  <span className="text-[#E63946] font-bold">0{currentSlide + 1}</span>
                  <span className="text-neutral-500">/</span>
                  <span className="text-neutral-400">0{HERO_SLIDES.length}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#0D0D0E]/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? 'w-5 bg-[#E63946]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="p-2 rounded-full bg-[#0D0D0E]/80 border border-white/10 text-white hover:text-[#E63946] backdrop-blur-md transition-colors pointer-events-auto"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="p-2 rounded-full bg-[#0D0D0E]/80 border border-white/10 text-white hover:text-[#E63946] backdrop-blur-md transition-colors pointer-events-auto"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* In-Frame Dynamic Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#E63946] font-semibold block mb-1">
                      {activeSlide.series}
                    </span>
                    <p className="font-serif-luxury text-xl sm:text-2xl text-white font-normal leading-snug">
                      {activeSlide.title}
                    </p>
                    <p className="text-xs text-neutral-300 mt-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
                      <span>{activeSlide.location}</span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dynamic Floating Highlight Tag 1 (Top Left) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-top-${activeSlide.id}`}
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-5 -left-4 sm:-left-8 bg-[#161618]/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-[210px] hidden sm:flex items-center gap-3.5 z-30"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center shrink-0">
                  <TopIcon className="w-4 h-4 text-[#E63946]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{activeSlide.tagTop.title}</span>
                  <span className="text-[10px] text-neutral-400 block">{activeSlide.tagTop.sub}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Floating Highlight Tag 2 (Bottom Right) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-bottom-${activeSlide.id}`}
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#161618]/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-[230px] hidden sm:flex items-center gap-3.5 z-30"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <BottomIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{activeSlide.tagBottom.title}</span>
                  <span className="text-[10px] text-[#E63946] block">{activeSlide.tagBottom.sub}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
