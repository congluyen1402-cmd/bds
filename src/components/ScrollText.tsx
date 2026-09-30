"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, MotionValue } from "framer-motion";
import { EASE } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

type EffectType = "fill" | "lines" | "chars" | "highlight" | "counter" | "outline" | "marquee";

interface ScrollTextProps {
  text?: string;
  effect: EffectType;
  className?: string;
  highlightWords?: string[];
  endValue?: number; // for counter
  prefix?: string; // for counter
  suffix?: string; // for counter
}

const splitToWords = (text: string) => text.split(" ");
const splitToChars = (text: string) => text.split("");

function CounterEffect({ value, prefix = "", suffix = "", className }: { value: number, prefix?: string, suffix?: string, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  useEffect(() => {
    return springProgress.on("change", (latest) => {
      if (ref.current) {
        const num = Math.round(latest * value);
        ref.current.textContent = `${prefix}${new Intl.NumberFormat('vi-VN').format(num)}${suffix}`;
      }
    });
  }, [springProgress, value, prefix, suffix]);

  return <span ref={ref} className={cn("tabular-nums", className)}>{prefix}0{suffix}</span>;
}

export default function ScrollText({ text = "", effect, className, highlightWords = [], endValue = 0, prefix, suffix }: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"] // Scrub range
  });

  if (prefersReducedMotion) {
    if (effect === "counter") return <span className={className}>{prefix}{new Intl.NumberFormat('vi-VN').format(endValue)}{suffix}</span>;
    return <div className={className}>{text}</div>;
  }

  // Effect: Word Fill
  if (effect === "fill") {
    const words = splitToWords(text);
    return (
      <div ref={containerRef} className={cn("flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]", className)} aria-label={text}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          const isHighlight = highlightWords.includes(word.replace(/[^a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]/g, ""));
          
          return (
            <WordFill key={i} word={word} progress={scrollYProgress} range={[start, end]} isHighlight={isHighlight} />
          );
        })}
      </div>
    );
  }

  // Effect: Chars Blur-to-Sharp (used usually for Hero, so we animate in rather than scrub, but prompt asks for scrub/stagger)
  if (effect === "chars") {
    const chars = splitToChars(text);
    return (
      <div ref={containerRef} className={cn("flex flex-wrap", className)} aria-label={text}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ filter: "blur(12px)", opacity: 0, y: 40 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.03, duration: 0.8, ease: EASE.luxury }}
            className={char === " " ? "w-[0.3em]" : "inline-block"}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  }

  // Effect: Lines Mask Reveal
  if (effect === "lines") {
    // Removed overflow-hidden as it clips custom fonts (like Cormorant) with large line-heights.
    return (
      <div ref={containerRef} aria-label={text} className={className}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE.luxury }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // Effect: Highlight Sweep
  if (effect === "highlight") {
    return (
      <span ref={containerRef} className={cn("relative inline-block whitespace-nowrap", className)}>
        <motion.span 
          className="absolute inset-0 bg-gold/20 -z-10 rounded-sm origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        {text}
      </span>
    );
  }

  // Effect: Outline to Fill
  if (effect === "outline") {
    return (
      <div ref={containerRef} className={cn("relative", className)}>
        {/* Outline base */}
        <span className="text-transparent !bg-clip-text font-outline-1 absolute inset-0" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          {text}
        </span>
        {/* Fill wipe */}
        <motion.span 
          className="text-white relative whitespace-nowrap block"
          style={{ clipPath: useTransform(scrollYProgress, [0, 1], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]) }}
        >
          {text}
        </motion.span>
      </div>
    );
  }

  // Effect: Counter
  if (effect === "counter") {
    return <CounterEffect value={endValue} prefix={prefix} suffix={suffix} className={className} />;
  }

  // Effect: Marquee
  if (effect === "marquee") {
    return <MarqueeEffect text={text} className={className} />;
  }

  return <div className={className}>{text}</div>;
}

// Sub-component for individual word scrub
function WordFill({ word, progress, range, isHighlight }: { word: string, progress: MotionValue<number>, range: [number, number], isHighlight: boolean }) {
  const opacity = useTransform(progress, range, [0.25, 1]); // Minimum 25% opacity so it's readable mid-scroll
  
  return (
    <motion.span 
      className={cn("inline-block", isHighlight ? "text-gold" : "text-white")}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

import { useVelocity, useAnimationFrame } from "framer-motion";

function MarqueeEffect({ text, className }: { text: string, className?: string }) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.05 * (delta / 10);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.current += moveBy;
    if (baseX.current <= -50) baseX.current += 50;
    else if (baseX.current > 0) baseX.current -= 50;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap pointer-events-none">
      <motion.div className={cn("flex flex-nowrap whitespace-nowrap gap-16 pr-16", className)} style={{ x }}>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
