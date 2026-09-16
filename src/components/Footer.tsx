import React, { useState, useEffect } from 'react';
import { Camera, ArrowUp, Mail, Check, Instagram, Globe, Clock } from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';
import { MagneticButton } from './MagneticButton';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      id="main-footer"
      role="contentinfo"
      aria-label="Site Footer"
      className="bg-[#080809] border-t border-white/10 text-neutral-400 text-xs pt-20 pb-14"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-16">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 flex items-center justify-center">
                <Camera className="w-4 h-4 text-[#E63946]" />
              </div>
              <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] font-semibold text-white">
                SHADAB HUSSAIN
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs sm:text-sm font-light max-w-sm mb-6">
              Editorial photography and videography based in Delhi NCR, New Delhi. Documenting fine-art 
              portraits, street noir, and architectural heritage monuments including Humayun’s Tomb and Qutub Minar.
            </p>

            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-full bg-[#161618] border border-white/10 text-xs text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-ping" />
              <Clock className="w-4 h-4 text-[#E63946]" />
              <span className="font-mono text-white font-semibold">{istTime || '11:30:00 PM'} IST</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">(Delhi NCR)</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="font-medium uppercase tracking-wider text-white text-xs mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <a href="#gallery" className="hover:text-[#E63946] transition-colors">
                  Works
                </a>
              </li>
              <li>
                <a href="#procedure" className="hover:text-[#E63946] transition-colors">
                  Procedure
                </a>
              </li>
              <li>
                <a href="#thoughts" className="hover:text-[#E63946] transition-colors">
                  Thoughts
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#E63946] transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E63946] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Social Links with Magnetic Pull */}
          <div className="lg:col-span-3">
            <h4 className="font-medium uppercase tracking-wider text-white text-xs mb-5">
              Social Links
            </h4>
            <div className="space-y-3.5 text-xs">
              <MagneticButton href={PHOTOGRAPHER_INFO.instagram} target="_blank" rel="noopener noreferrer" className="block w-full">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#161618] border border-white/5 text-neutral-300 hover:text-white hover:border-[#E63946]/40 transition-colors">
                  <Instagram className="w-4 h-4 text-[#E63946]" />
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-white">Instagram</span>
                    <span className="text-[10px] text-neutral-400">@shadesbyshaddy</span>
                  </div>
                </div>
              </MagneticButton>

              {/* <MagneticButton href={PHOTOGRAPHER_INFO.behance} target="_blank" rel="noopener noreferrer" className="block w-full">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#161618] border border-white/5 text-neutral-300 hover:text-white hover:border-[#D4AF37]/40 transition-colors">
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-white">Behance</span>
                    <span className="text-[10px] text-neutral-400">behance.net/shadabhussain</span>
                  </div>
                </div>
              </MagneticButton> */}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-medium uppercase tracking-wider text-white text-xs mb-5">
              Newsletter
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4 font-light">
              Subscribe for updates on print releases, Delhi NCR workshops, and photo essays.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-colors pr-10"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-[#E63946] text-white hover:bg-[#c82333] transition-colors flex items-center justify-center font-bold"
                >
                  {newsletterSubscribed ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Mail className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {newsletterSubscribed && (
                <p className="text-[11px] text-[#E63946] font-medium">
                  ✓ Subscribed to Shadab Hussain Studio.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-400">
            <span>© {new Date().getFullYear()} Shadab Hussain. All rights reserved.</span>
            <span>•</span>
            <span>Delhi NCR, New Delhi</span>
            <span>•</span>
            <span className="text-[#E63946]">Portraits • Heritage Monuments • Videography</span>
          </div>

          <MagneticButton onClick={scrollToTop}>
            <button
              type="button"
              id="footer-back-to-top-btn"
              aria-label="Back to top"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-colors text-xs font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E63946]" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
