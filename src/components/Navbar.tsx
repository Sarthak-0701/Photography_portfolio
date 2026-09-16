import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, ArrowUpRight, Instagram } from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'gallery', 'procedure', 'thoughts', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#gallery', id: 'gallery' },
    { label: 'Procedure', href: '#procedure', id: 'procedure' },
    { label: 'Thoughts', href: '#thoughts', id: 'thoughts' },
    { label: 'Clients', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0D0E]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80 py-3 sm:py-3.5'
          : 'bg-linear-to-b-to-b from-[#0D0D0E]/95 via-[#0D0D0E]/50 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo: SHADAB HUSSAIN / ARCHIVE */}
          <a
            href="#home"
            id="nav-brand-link"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] rounded-sm shrink-0"
            aria-label="Shadab Hussain Archive Home"
          >
            <div className="flex flex-col justify-center">
              <span className="font-serif-luxury tracking-[0.2em] text-base sm:text-lg font-semibold text-white group-hover:text-[#E63946] transition-colors leading-none">
                SHADAB HUSSAIN
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#E63946] mt-1 font-medium leading-none">
                ARCHIVE
              </span>
            </div>
          </a>

          {/* Centered Desktop Navigation Anchors with Smaller Font Size */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/3 border border-white/8 px-3.5 py-1 rounded-full backdrop-blur-md shadow-inner"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-3 py-1 text-[7px] lg:text-[11px] font-medium tracking-widest uppercase transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-linear-to-r from-[#E63946]/25 via-[#D4AF37]/20 to-[#E63946]/10 border border-[#E63946]/40 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Direct Social Links & Simplified CTA Button */}
          <div className="hidden md:flex items-center gap-3.5 shrink-0">
            <a
              href={PHOTOGRAPHER_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-neutral-400 hover:text-[#E63946] hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              aria-label="Follow Shadab Hussain on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              id="nav-book-shoot-btn"
              type="button"
              onClick={onBookClick}
              className="relative group overflow-hidden px-4.5 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#E63946] text-white hover:bg-[#c82333] hover:shadow-lg hover:shadow-[#E63946]/30 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>Book Shoot</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              id="mobile-book-btn-compact"
              type="button"
              onClick={onBookClick}
              className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#E63946] text-white shadow-md shadow-[#E63946]/20"
              aria-label="Book shoot"
            >
              Book
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E63946]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E63946]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-white/10 bg-[#0D0D0E]/98 backdrop-blur-xl px-5 pt-3 pb-5 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  href={link.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/30 font-semibold'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                id="mobile-menu-book-btn"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E63946] text-white font-semibold tracking-wider text-xs uppercase shadow-lg shadow-[#E63946]/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Shoot</span>
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-400 px-2 pt-1">
                <a
                  href={PHOTOGRAPHER_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E63946] hover:underline font-medium"
                >
                  Instagram
                </a>
                <a
                  href={PHOTOGRAPHER_INFO.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-medium"
                >
                  Behance
                </a>
                <span>Delhi NCR</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
