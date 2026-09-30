"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cinematic preloader under 1.5s as requested
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glass doors open animation effect */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-navy border-r border-white/5"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-navy border-l border-white/5"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gold Logo Strokes Draw */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" className="mb-4">
          <motion.path
            d="M50 10 L90 90 L10 90 Z"
            fill="transparent"
            stroke="#C8A96B"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 30 L75 80 L25 80 Z"
            fill="transparent"
            stroke="#C8A96B"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
        <motion.h1
          className="font-serif text-2xl tracking-[0.2em] text-gold-gradient uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          [Tên Thương Hiệu]
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
