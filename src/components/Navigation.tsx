"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Bộ sưu tập", href: "#collection" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Câu chuyện", href: "#story" },
    { label: "Liên hệ", href: "#contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background
      setScrolled(currentScrollY > 50);

      // Auto-hide logic
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;

      // Scrollspy
      const sections = navItems.map(item => item.href.replace('#', '')).filter(Boolean);
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = `#${section}`;
            break;
          }
        }
      }
      if (currentScrollY < 100) current = "#";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled ? "py-4 glass-panel border-b border-white/10 shadow-lg" : "py-6 bg-transparent border-transparent",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 100 100">
              <path d="M50 10 L90 90 L10 90 Z" fill="transparent" stroke="#C8A96B" strokeWidth="4" />
              <path d="M50 30 L75 80 L25 80 Z" fill="transparent" stroke="#C8A96B" strokeWidth="2" />
            </svg>
            <span className="font-serif text-xl tracking-[0.2em] text-white uppercase mt-1">
              [Brand]
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href;
              return (
                <a 
                  key={i} 
                  href={item.href}
                  className={cn(
                    "relative text-sm uppercase tracking-widest transition-colors font-medium outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm px-1 py-1",
                    isActive ? "text-gold" : "text-white/80 hover:text-gold active:text-gold/80"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1 h-[1px] bg-gold"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <a href="/admin" className="text-sm text-white uppercase tracking-widest border border-white/20 rounded-full px-6 py-2 hover:bg-white/5 active:bg-white/10 transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Đăng nhập
            </a>
            <a href="#contact" className="bg-gradient-to-r from-[#C8A96B] to-[#D4B982] text-navy text-sm uppercase tracking-widest font-semibold rounded-full px-6 py-2 hover:opacity-90 active:opacity-80 transition-opacity whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-white">
              Gọi ngay
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm p-1"
            onClick={() => setIsOpen(true)}
            aria-label="Mở menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Full-screen Glass Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-navy/95 flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-4 lg:right-8 text-white/50 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm p-1"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "font-serif text-3xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm p-2",
                    activeSection === item.href ? "text-gold" : "text-white hover:text-gold active:text-gold/80"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.5 }}
               className="mt-12 text-center"
            >
              <p className="text-gold uppercase tracking-widest text-sm mb-4">Liên hệ trực tiếp</p>
              <a href="tel:0909123456" className="font-serif text-4xl text-white flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm p-2">
                <Phone className="w-6 h-6" /> 0909 123 456
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Glass CTA Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 glass-panel rounded-full p-2 flex gap-2">
        <a href="#contact" className="flex-1 bg-white/10 text-white rounded-full py-3 text-sm font-medium hover:bg-white/20 active:bg-white/30 transition-colors uppercase tracking-widest text-center">
          Đặt lịch
        </a>
        <a href="tel:0909123456" className="flex-1 bg-gold text-navy rounded-full py-3 text-sm font-semibold hover:opacity-90 active:opacity-80 transition-opacity uppercase tracking-widest text-center">
          Gọi ngay
        </a>
      </div>

      {/* Floating Zalo Button (Global) */}
      <a 
        href="#" 
        className="fixed bottom-[80px] right-6 md:bottom-10 md:right-10 z-30 bg-blue-500 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform"
        title="Chat qua Zalo"
      >
        <span className="font-bold">Zalo</span>
      </a>
    </>
  );
}
