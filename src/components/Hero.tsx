"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import ScrollText from "./ScrollText";
import { IMAGES } from "@/data/images";

export default function Hero({ siteImages }: { siteImages?: any }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // max 20px shift
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const slogan = "Kiến Tạo Di Sản – Tôn vinh đẳng cấp sống".split(" ");

  return (
    <section 
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ 
          x: mousePosition.x * -1, 
          y: mousePosition.y * -1,
          scale: 1.05
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <div className="absolute inset-0 bg-navy/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/30 z-10" />
        <img 
          src={siteImages?.hero_background?.imageUrl || IMAGES.hero.main}
          alt={siteImages?.hero_background?.altText || "Golden hour luxury home"}
          style={siteImages?.hero_background ? { objectPosition: `${siteImages.hero_background.focalPointX}% ${siteImages.hero_background.focalPointY}%` } : {}}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-20 flex flex-col items-center justify-center px-4">
        
        {/* Animated Headline */}
        <ScrollText 
          text="Kiến Tạo Di Sản – Tôn vinh đẳng cấp sống" 
          effect="chars" 
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-center text-white font-medium mb-8 max-w-4xl leading-tight" 
        />

        {/* Glass Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel rounded-full p-2 w-full max-w-4xl flex flex-col md:flex-row items-center gap-2 md:gap-4 relative group"
        >
          {/* Specular highlight on hover would go here using CSS or Framer Motion */}
          
          <div className="flex-1 flex w-full md:w-auto items-center justify-between px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/10 cursor-pointer">
            <span className="text-sm text-white/80 uppercase tracking-widest font-medium">Loại hình</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>
          
          <div className="flex-1 flex w-full md:w-auto items-center justify-between px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/10 cursor-pointer">
            <span className="text-sm text-white/80 uppercase tracking-widest font-medium">Khu vực</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>

          <div className="flex-1 flex w-full md:w-auto items-center justify-between px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/10 cursor-pointer">
            <span className="text-sm text-white/80 uppercase tracking-widest font-medium">Mức giá</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>

          <div className="hidden md:flex flex-1 items-center justify-between px-4 py-2 cursor-pointer">
            <span className="text-sm text-white/80 uppercase tracking-widest font-medium">Phòng ngủ</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>

          <button className="w-full md:w-auto bg-gradient-to-r from-[#C8A96B] to-[#D4B982] hover:opacity-90 text-navy px-8 py-3 rounded-full font-medium transition-opacity flex items-center justify-center gap-2 mt-2 md:mt-0">
            <Search className="w-4 h-4" />
            <span>Tìm kiếm</span>
          </button>
        </motion.div>

        {/* Extra CTAs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8 flex gap-4"
        >
          <button className="text-white hover:text-gold transition-colors text-sm uppercase tracking-widest border-b border-white/30 hover:border-gold pb-1">
            Khám phá danh mục
          </button>
          <span className="text-white/30">|</span>
          <button className="text-white hover:text-gold transition-colors text-sm uppercase tracking-widest border-b border-white/30 hover:border-gold pb-1">
            Đặt lịch xem nhà
          </button>
        </motion.div>

      </div>
    </section>
  );
}
