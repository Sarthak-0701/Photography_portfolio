import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';
import { InquiryFormData } from '../types';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';

interface ContactProps {
  initialPhotoInquiry?: string;
  onClearInitialInquiry?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ 
  initialPhotoInquiry,
  onClearInitialInquiry 
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    locationPreference: 'delhi-ncr',
    targetDate: '',
    visionNotes: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialPhotoInquiry) {
      setFormData((prev) => ({
        ...prev,
        visionNotes: `Inquiring regarding a shoot style similar to: ${initialPhotoInquiry}`,
      }));
    }
  }, [initialPhotoInquiry]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `SHADAB-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryRef(generatedRef);
      setIsSubmitting(false);
      setSubmitted(true);
      if (onClearInitialInquiry) {
        onClearInitialInquiry();
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      locationPreference: 'delhi-ncr',
      targetDate: '',
      visionNotes: '',
    });
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Shoot Inquiry"
      className="py-28 sm:py-36 bg-[#0D0D0E] relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                <span>Shoot Inquiry</span>
              </div>

              <TextReveal as="h2" className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
                Let’s Work Together
              </TextReveal>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-10 font-light">
                Whether you need fine-art portraits, commercial editorials, or heritage monument documentation 
                in Delhi NCR, get in touch with us below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#161618] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#E63946]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Studio Location</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{PHOTOGRAPHER_INFO.baseLocation}</p>
                    <p className="text-[11px] text-[#D4AF37] mt-1">
                      {PHOTOGRAPHER_INFO.secondaryLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#161618] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#E63946]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Direct Contact</h3>
                    <a
                      href={`tel:${PHOTOGRAPHER_INFO.phone}`}
                      className="text-xs text-neutral-300 hover:text-[#E63946] transition-colors block mt-0.5"
                    >
                      {PHOTOGRAPHER_INFO.phone}
                    </a>
                    <a
                      href={`mailto:${PHOTOGRAPHER_INFO.email}`}
                      className="text-[11px] text-[#E63946] hover:underline block mt-0.5"
                    >
                      {PHOTOGRAPHER_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#161618] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#E63946]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Response Time</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Replies sent within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-[#E63946] shrink-0" />
              <span>
                All raw captures and master files remain safely backed up in our Delhi NCR studio servers.
              </span>
            </div>
          </div>

          {/* Right Form with Redesigned Luxury Button */}
          <div className="lg:col-span-7">
            <div className="bg-[#161618] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="inquiry-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >
                    <div className="border-b border-white/10 pb-5">
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
                        Book Your Shoot
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        Fill out your information below and we will get back to you promptly.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2"
                        >
                          Your Name <span className="text-[#E63946]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Your Name"
                            className="w-full px-4.5 py-3.5 rounded-xl bg-[#0D0D0E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors"
                          />
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'fullName' ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] rounded-b-xl origin-center"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2"
                        >
                          Email Address <span className="text-[#E63946]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="name@domain.com"
                            className="w-full px-4.5 py-3.5 rounded-xl bg-[#0D0D0E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors"
                          />
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] rounded-b-xl origin-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          htmlFor="phone"
                          className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2"
                        >
                          Phone Number <span className="text-[#E63946]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="+91 98765 43210"
                            className="w-full px-4.5 py-3.5 rounded-xl bg-[#0D0D0E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors"
                          />
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] rounded-b-xl origin-center"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="targetDate"
                          className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2"
                        >
                          Target Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="targetDate"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('targetDate')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4.5 py-3.5 rounded-xl bg-[#0D0D0E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors"
                          />
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: focusedField === 'targetDate' ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E63946] rounded-b-xl origin-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Location Venue
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'delhi-ncr', label: 'Delhi NCR Studio', sub: 'Indoor / Studio' },
                          { id: 'outdoor-heritage', label: 'Delhi Monuments', sub: "Humayun's Tomb / Qutub" },
                          { id: 'destination', label: 'Destination Shoot', sub: 'Pan-India & Global' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                              formData.locationPreference === item.id
                                ? 'bg-[#E63946]/10 border-[#E63946]/40 text-white'
                                : 'bg-[#0D0D0E] border-white/10 text-neutral-400 hover:bg-white/[0.03]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="locationPreference"
                              value={item.id}
                              checked={formData.locationPreference === item.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span className="text-xs font-semibold text-white">{item.label}</span>
                            <span className="text-[10px] text-[#E63946]/80">{item.sub}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="visionNotes"
                        className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Project Notes / Shoot Ideas
                      </label>
                      <div className="relative">
                        <textarea
                          id="visionNotes"
                          name="visionNotes"
                          rows={4}
                          value={formData.visionNotes}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('visionNotes')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Tell us about your project vision, shoot concepts, or portrait requirements..."
                          className="w-full px-4.5 py-3.5 rounded-xl bg-[#0D0D0E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors"
                        />
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === 'visionNotes' ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#E63946] rounded-b-xl origin-center"
                        />
                      </div>
                    </div>

                    {/* Redesigned Luxury Editorial Button */}
                    <MagneticButton className="w-full">
                      <button
                        type="submit"
                        id="consultation-submit-btn"
                        disabled={isSubmitting}
                        className="relative group overflow-hidden w-full py-4.5 px-8 rounded-full text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-[#E63946] via-[#D62828] to-[#991B1B] text-white shadow-xl shadow-[#E63946]/30 hover:shadow-[#E63946]/50 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center border border-white/20 disabled:opacity-50"
                      >
                        {/* Subtle Shimmer Background Light */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                        {isSubmitting ? (
                          <span className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                            <span>Sending Request...</span>
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <span className="relative z-10 leading-none">Send Message</span>
                            <div className="w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
                              <Send className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="inquiry-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 px-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <span className="text-xs uppercase tracking-widest text-[#E63946] font-semibold block mb-1">
                      Request Sent
                    </span>
                    <h3 className="font-serif-luxury text-3xl text-white font-light mb-3">
                      Thank You, {formData.fullName || 'Client'}
                    </h3>

                    <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed mb-6 font-light">
                      Your shoot request has been sent to our Delhi NCR studio. Reference Code:
                    </p>

                    <div className="inline-block p-4 rounded-xl bg-[#0D0D0E] border border-[#E63946]/30 text-[#E63946] font-mono text-lg font-bold tracking-widest mb-8">
                      {inquiryRef}
                    </div>

                    <MagneticButton>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="py-3 px-8 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
