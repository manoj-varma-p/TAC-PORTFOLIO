"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InstagramIcon, LinkedInIcon } from "./icons";

export function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const phone = "+91 99664 30431";
  const rawPhone = "+919966430431";

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);

    // Also listen to any click on elements with href="#contact"
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#contact"], button[data-contact]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("click", handleAnchorClick);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring" as const, stiffness: 350, damping: 28 },
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 15,
              transition: { duration: 0.2 },
            }}
            className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/15 bg-[#0e0e12] p-6 sm:p-8 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,184,0,0.15)]"
          >
            {/* Top Ambient Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-gold/25 blur-3xl"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-light hover:border-gold hover:text-gold hover:bg-gold/10 transition-all cursor-pointer"
            >
              ×
            </button>

            {/* Header */}
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold border border-gold/30">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                Get In Touch
              </span>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Let&apos;s Build <span className="text-gold">Together.</span>
              </h3>
              <p className="mt-2 text-sm text-gray-light leading-relaxed">
                Connect with our team directly for mentorship, admissions, studio projects, or general inquiries.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="relative mt-6 space-y-3.5">
              {/* Phone / WhatsApp Card */}
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-gold/50 hover:bg-white/[0.05]">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold border border-gold/20">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-wider text-gray-muted uppercase">Phone / WhatsApp</p>
                    <a
                      href={`tel:${rawPhone}`}
                      className="text-base font-bold text-white transition-colors hover:text-gold block truncate"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`https://wa.me/919966430431`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="flex h-8 px-2.5 items-center gap-1 rounded-md bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold hover:bg-[#25D366]/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(rawPhone, "phone")}
                    aria-label="Copy phone number"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.05] text-gray-light hover:border-gold hover:text-gold transition-colors cursor-pointer"
                  >
                    {copiedField === "phone" ? (
                      <span className="text-[10px] font-bold text-gold">✓</span>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Connect Footer */}
            <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs font-semibold text-gray-muted">Follow TAC Channels:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/tac_theartcode?igsi=dTk2NGpvb2ZoZmVx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-gray-light hover:border-gold hover:text-gold transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/tac-the-art-code/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-gray-light hover:border-gold hover:text-gold transition-colors"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
