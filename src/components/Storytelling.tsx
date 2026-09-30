"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ScrollText from "./ScrollText";
import { IMAGES } from "@/data/images";
import { AnimatePresence } from "framer-motion";

export default function Storytelling({ siteImages }: { siteImages?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const timelineWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  const chapters = [
    {
      title: "I. Tầm Nhìn",
      desc: "Vượt lên trên những chuẩn mực thông thường, chúng tôi tìm kiếm và kiến tạo những di sản sống độc bản, nơi mỗi chi tiết đều tôn vinh vị thế của chủ nhân.",
      img: siteImages?.story_chapter_1?.imageUrl || IMAGES.story.vision,
      focal: siteImages?.story_chapter_1
    },
    {
      title: "II. Chọn Lọc",
      desc: "Chỉ 1% bất động sản tinh hoa vượt qua 120 tiêu chí khắt khe về vị trí, kiến trúc, phong thủy và pháp lý để gia nhập bộ sưu tập của chúng tôi.",
      img: siteImages?.story_chapter_2?.imageUrl || IMAGES.story.selection,
      focal: siteImages?.story_chapter_2
    },
    {
      title: "III. Đồng Hành",
      desc: "Tư vấn chuyên sâu bằng sự am hiểu thị trường, bảo mật tuyệt đối thông tin và thiết kế lộ trình sở hữu được cá nhân hóa cho từng khách hàng.",
      img: siteImages?.story_chapter_3?.imageUrl || IMAGES.story.companion,
      focal: siteImages?.story_chapter_3
    },
    {
      title: "IV. Bàn Giao",
      desc: "Khoảnh khắc nhận chìa khóa không phải là kết thúc, mà là khởi đầu cho đặc quyền chăm sóc và quản lý gia sản trọn đời từ chúng tôi.",
      img: siteImages?.story_chapter_4?.imageUrl || IMAGES.story.handover,
      focal: siteImages?.story_chapter_4
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-navy h-[400vh]" id="story">
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden">
        
        {/* Background Images Crossfade */}
        <div className="absolute inset-0 z-0 bg-navy">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={chapters[activeIndex].img}
              alt={chapters[activeIndex].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={chapters[activeIndex].focal ? { objectPosition: `${chapters[activeIndex].focal.focalPointX}% ${chapters[activeIndex].focal.focalPointY}%` } : {}}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-navy/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-20 flex flex-col items-center">
          
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-serif text-3xl md:text-5xl text-white">Hành Trình Kiến Tạo Di Sản</h2>
          </div>

          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* The Gold Timeline (Horizontal, clearly separated) */}
            <div className="w-full relative h-[2px] bg-white/20 mb-16 rounded-full">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-gold via-gold to-[#D4B982] shadow-[0_0_10px_rgba(200,169,107,0.5)] rounded-full" 
                style={{ width: timelineWidth }}
              />
              {/* Timeline Nodes */}
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 border-2 rounded-full transform rotate-45 transition-colors duration-300"
                  style={{ 
                    left: `${(i * 33.33)}%`,
                    backgroundColor: 'var(--color-navy)',
                    borderColor: activeIndex >= i ? "var(--color-gold)" : "rgba(255,255,255,0.3)"
                  }}
                />
              ))}
            </div>

            {/* Chapters decisively snapping with AnimatePresence (No Overlap) */}
            <div className="relative w-full h-[25vh] md:h-[30vh]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center text-center px-4"
                >
                  <h3 className="font-serif text-3xl md:text-4xl text-gold mb-6">{chapters[activeIndex].title}</h3>
                  <p className="text-white/80 leading-relaxed text-lg md:text-2xl max-w-2xl font-medium drop-shadow-md">
                    {chapters[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-16 max-w-3xl mx-auto text-center w-full">
            <div>
              <ScrollText effect="counter" endValue={1200} suffix="+" className="font-serif text-3xl md:text-5xl text-gold mb-2 block" />
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/70">Giao dịch</div>
            </div>
            <div>
              <ScrollText effect="counter" endValue={15} suffix=" Năm" className="font-serif text-3xl md:text-5xl text-gold mb-2 block" />
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/70">Kinh nghiệm</div>
            </div>
            <div>
              <ScrollText effect="counter" endValue={98} suffix="%" className="font-serif text-3xl md:text-5xl text-gold mb-2 block" />
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/70">Khách giới thiệu</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
