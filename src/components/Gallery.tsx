import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, X, Eye, ArrowRight } from 'lucide-react';
import { CATEGORIES, GALLERY_ITEMS } from '../data/photographyData';
import { GalleryCategory, PhotoItem } from '../types';
import { CustomCursor } from './CustomCursor';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';

interface GalleryProps {
  onSelectPhotoForInquiry?: (title: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectPhotoForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      aria-label="Photography Portfolio Gallery"
      className="py-24 sm:py-32 bg-[#0D0D0E] relative border-t border-white/5"
      onMouseEnter={() => setIsHoveringGallery(true)}
      onMouseLeave={() => setIsHoveringGallery(false)}
    >
      {/* Floating Desktop Custom Cursor Badge */}
      <CustomCursor isVisible={isHoveringGallery && !selectedPhoto} text="VIEW ↗" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold tracking-widest uppercase mb-3.5 shadow-sm">
              <Camera className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            
            <TextReveal as="h2" className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
              Editorial Works & Monuments
            </TextReveal>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl font-light">
              Tightly packed fine-art portraits, street noir moments, and heritage monument captures across Delhi NCR.
            </p>
          </div>

          {/* Filter Pills with Framer Motion layoutId="activeFilter" */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-btn-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#E63946] rounded-full -z-10 shadow-md shadow-[#E63946]/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid with Staggered Entrances and Curtain Image Unveils */}
        <motion.div
          layout
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                variants={{
                  hidden: { opacity: 0, scale: 1.08, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden bg-[#161618] border border-white/10 shadow-xl flex flex-col ${
                  item.gridSpan || ''
                } hover:border-[#E63946]/40 transition-all duration-300`}
              >
                {/* Image Container with Photographic Scale Transition */}
                <div
                  className={`relative overflow-hidden cursor-pointer ${
                    item.aspectRatio === 'wide'
                      ? 'aspect-[16/10]'
                      : item.aspectRatio === 'panoramic'
                      ? 'aspect-[21/9]'
                      : item.aspectRatio === 'square'
                      ? 'aspect-square'
                      : 'aspect-[4/5]'
                  }`}
                  onClick={() => setSelectedPhoto(item)}
                >
                  <motion.img
                    src={item.image}
                    alt={`${item.title} by Shadab Hussain in ${item.location}`}
                    referrerPolicy="no-referrer"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                  />

                  {/* Smooth Glassmorphism Overlay Sliding Up on Hover */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E63946] text-white text-[10px] uppercase tracking-wider font-semibold shadow-md">
                        {item.categoryLabel}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#0D0D0E]/80 border border-white/20 text-white flex items-center justify-center">
                        <Eye className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                    </div>

                    <div>
                      <div className="grid grid-cols-3 gap-1.5 bg-[#0D0D0E]/90 border border-white/10 p-2 rounded-lg backdrop-blur-md text-[10px] mb-2">
                        <div className="flex flex-col">
                          <span className="text-neutral-400 text-[8px] uppercase">Lens</span>
                          <span className="text-white font-medium">{item.focalLength}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-neutral-400 text-[8px] uppercase">Aperture</span>
                          <span className="text-[#E63946] font-medium">{item.aperture}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-neutral-400 text-[8px] uppercase">Shutter</span>
                          <span className="text-white font-medium">{item.shutterSpeed}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-neutral-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E63946]" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Card Meta Info */}
                <div className="p-4 sm:p-4.5 flex flex-col justify-between bg-[#161618] flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                      <span className="text-[#E63946] font-medium">{item.categoryLabel}</span>
                      <span>{item.year}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-white font-normal group-hover:text-[#E63946] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3 pt-2.5 border-t border-white/5">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] text-neutral-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-[#0D0D0E]/95 backdrop-blur-xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-[#161618] border border-white/10 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0D0D0E]/80 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#E63946]" />
              </button>

              <div className="lg:col-span-7 bg-[#0D0D0E] flex items-center justify-center p-4 min-h-[260px] lg:min-h-[480px]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="px-3 py-0.5 rounded-full bg-[#E63946]/10 text-[#E63946] text-[11px] font-semibold uppercase tracking-wider border border-[#E63946]/30 inline-block mb-3">
                    {selectedPhoto.categoryLabel}
                  </span>

                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white mb-1.5">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-xs text-neutral-400 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
                    <span>{selectedPhoto.location} • {selectedPhoto.year}</span>
                  </p>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                    {selectedPhoto.story}
                  </p>

                  <div className="bg-[#0D0D0E] p-3.5 rounded-xl border border-white/10 space-y-1.5 mb-5 text-xs">
                    <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-widest block mb-1.5">
                      Technical Specs
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-neutral-300 text-[11px]">
                      <div><span className="text-neutral-500">Lens:</span> <span className="text-white font-medium">{selectedPhoto.focalLength}</span></div>
                      <div><span className="text-neutral-500">Aperture:</span> <span className="text-[#E63946] font-medium">{selectedPhoto.aperture}</span></div>
                      <div><span className="text-neutral-500">Shutter:</span> <span className="text-white font-medium">{selectedPhoto.shutterSpeed}</span></div>
                      <div><span className="text-neutral-500">ISO:</span> <span className="text-white font-medium">{selectedPhoto.iso}</span></div>
                    </div>
                  </div>
                </div>

                {onSelectPhotoForInquiry && (
                  <MagneticButton className="w-full">
                    <button
                      type="button"
                      onClick={() => {
                        const title = selectedPhoto.title;
                        setSelectedPhoto(null);
                        onSelectPhotoForInquiry(title);
                      }}
                      className="w-full py-3 rounded-xl bg-[#E63946] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#c82333] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E63946]/20"
                    >
                      <span>Book Shoot</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
