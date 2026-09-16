import React, { useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Procedure } from './components/Procedure';
import { Thoughts } from './components/Thoughts';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [inquiryPhoto, setInquiryPhoto] = useState<string | undefined>(undefined);

  const handleScrollToContact = (photoTitle?: string) => {
    if (photoTitle) {
      setInquiryPhoto(photoTitle);
    }
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) {
          input.focus();
        }
      }, 400);
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0D0D0E] text-[#F4F4F6] flex flex-col selection:bg-[#E63946] selection:text-white font-sans-luxury">
        {/* Shutter Dissolve Preloader */}
        <Preloader />

        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#E63946] text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
        >
          Skip to main content
        </a>

        {/* Sticky Glassmorphic Header */}
        <Navbar onBookClick={() => handleScrollToContact()} />

        {/* Main Content Sections */}
        <main id="main-content" className="grow">
          <Hero onBookClick={() => handleScrollToContact()} />
          <Gallery onSelectPhotoForInquiry={(title) => handleScrollToContact(title)} />
          <Procedure onBookClick={() => handleScrollToContact()} />
          <Thoughts />
          <Testimonials />
          <Contact 
            initialPhotoInquiry={inquiryPhoto} 
            onClearInitialInquiry={() => setInquiryPhoto(undefined)} 
          />
        </main>

        {/* Global Footer with Live IST Clock & Socials */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
