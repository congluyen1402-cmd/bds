"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Maximize, Ruler, Bed, Bath, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollText from "./ScrollText";
import { IMAGES } from "@/data/images";

const FILTERS = ["Tất cả", "Căn hộ cao cấp", "Biệt thự", "Nhà phố", "Đất nền"];

const PROPERTIES = [
  { id: "p1", title: "Biệt Thự Ven Sông Thảo Điền", type: "Biệt thự", price: "150 Tỷ", area: 800, beds: 6, baths: 7, loc: "Quận 2, TP.HCM", images: IMAGES.collection.prop1, badges: ["Độc quyền"], featured: true },
  { id: "p2", title: "Penthouse The Vertex", type: "Căn hộ cao cấp", price: "85 Tỷ", area: 450, beds: 4, baths: 5, loc: "Quận 1, TP.HCM", images: IMAGES.collection.prop2, badges: ["Mới"], featured: true },
  { id: "p3", title: "Nhà Phố Hiện Đại", type: "Nhà phố", price: "45 Tỷ", area: 200, beds: 4, baths: 5, loc: "Quận 3, TP.HCM", images: IMAGES.collection.prop3, badges: ["Đã thẩm định pháp lý"], featured: true },
  { id: "p4", title: "Căn Hộ Hạng Sang", type: "Căn hộ cao cấp", price: "32 Tỷ", area: 150, beds: 3, baths: 3, loc: "Quận 1, TP.HCM", images: IMAGES.collection.prop4, badges: [], featured: false },
  { id: "p5", title: "Biệt Thự Vườn", type: "Biệt thự", price: "110 Tỷ", area: 600, beds: 5, baths: 6, loc: "Quận 7, TP.HCM", images: IMAGES.collection.prop5, badges: ["Mới"], featured: false },
  { id: "p6", title: "Căn Hộ Ven Sông", type: "Căn hộ cao cấp", price: "28 Tỷ", area: 120, beds: 2, baths: 2, loc: "Thủ Thiêm, TP. Thủ Đức", images: IMAGES.collection.prop6, badges: [], featured: false },
];

function PropertyCard({ property, className }: { property: typeof PROPERTIES[0], className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  return (
    <div 
      className={cn("glass-panel rounded-2xl overflow-hidden group flex flex-col h-full cursor-pointer relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden perspective-1000" onClick={nextImg}>
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImgIndex}
            src={property.images[currentImgIndex]} 
            alt={property.title}
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1, rotateY: isHovered ? 2 : 0, rotateX: isHovered ? -2 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover origin-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
        
        {/* Slider Dots */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
          {property.images.map((_, i) => (
            <div 
              key={i} 
              className={cn("h-1.5 rounded-full transition-all duration-300", currentImgIndex === i ? "bg-gold w-4" : "bg-white/50 w-1.5")} 
            />
          ))}
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.badges.map(b => (
            <span key={b} className="glass px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white rounded-md">
              {b}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
            className="glass p-2 rounded-full hover:bg-white/20 transition-colors active:scale-90"
          >
            <Heart className={cn("w-5 h-5", isFavorited ? "fill-gold text-gold" : "text-white")} />
          </button>
        </div>
        
        {/* Price overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="text-gold font-serif text-3xl">{property.price}</p>
            <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" /> {property.loc}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/20">
        <h3 className="text-xl font-serif text-white mb-4 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-white/10 py-4">
          <div className="flex flex-col items-center gap-1">
            <Ruler className="w-5 h-5 text-white/50" />
            <span className="text-white text-sm font-medium">{property.area} m²</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-white/10">
            <Bed className="w-5 h-5 text-white/50" />
            <span className="text-white text-sm font-medium">{property.beds} PN</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bath className="w-5 h-5 text-white/50" />
            <span className="text-white text-sm font-medium">{property.baths} PT</span>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <label className="flex-1 glass rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 active:bg-white/5 transition-colors text-sm py-2.5">
            <input 
              type="checkbox" 
              checked={isCompared}
              onChange={() => setIsCompared(!isCompared)}
              className="accent-gold w-4 h-4"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="text-white font-medium">So sánh</span>
          </label>
          <button className="flex-1 bg-white/5 border border-white/20 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 active:bg-white/5 transition-colors text-sm py-2.5 text-white font-medium">
            <Maximize className="w-4 h-4" /> 360°
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedListings({ listings }: { listings?: any[] }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const displayProperties = (listings && listings.length > 0) ? listings.map(l => ({
    id: l.id,
    title: l.title,
    type: l.type,
    price: `${l.price} Tỷ`,
    area: l.area,
    beds: l.bedrooms || 0,
    baths: l.bathrooms || 0,
    loc: l.address,
    images: l.images ? JSON.parse(l.images) : [],
    badges: l.badges ? JSON.parse(l.badges) : [],
    featured: l.isExclusive
  })) : PROPERTIES;

  const filtered = activeFilter === "Tất cả" 
    ? displayProperties 
    : displayProperties.filter(p => p.type === activeFilter);

  const featured = filtered.filter(p => p.featured);
  const others = filtered.filter(p => !p.featured);

  return (
    <section className="py-24 relative z-10" id="collection">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <ScrollText effect="lines" text="Bộ Sưu Tập Tinh Hoa" className="font-serif text-4xl md:text-5xl text-white mb-4" />
            <p className="text-white/60 max-w-lg text-lg">
              Tuyển chọn những bất động sản đẳng cấp nhất, thỏa mãn tiêu chuẩn khắt khe về không gian sống và giá trị đầu tư.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === f 
                    ? "bg-gold text-navy shadow-[0_0_15px_rgba(200,169,107,0.4)]" 
                    : "glass text-white hover:bg-white/10 active:scale-95"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Stacking Top 3 */}
        {featured.length > 0 && (
          <div className="mb-8 hidden md:block">
            {featured.map((property, idx) => (
              <div 
                key={property.id} 
                className="sticky flex justify-center mb-8"
                style={{ top: `${100 + idx * 30}px`, zIndex: idx }}
              >
                <div className="w-full max-w-5xl shadow-2xl">
                  <PropertyCard property={property} />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile top 3 fallback */}
        <div className="grid grid-cols-1 gap-8 mb-8 md:hidden">
          {featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Responsive Grid for the rest */}
        {others.length > 0 && (
           <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
             <AnimatePresence>
               {others.map(property => (
                 <motion.div
                   layout
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.5 }}
                   key={property.id}
                 >
                   <PropertyCard property={property} />
                 </motion.div>
               ))}
             </AnimatePresence>
           </motion.div>
        )}

        <div className="mt-16 flex justify-center relative z-10">
          <button className="glass px-8 py-4 rounded-full text-white uppercase tracking-widest text-sm font-semibold hover:bg-white/10 active:scale-95 transition-all flex items-center gap-3 group border-gold/30 hover:border-gold">
            Xem toàn bộ danh mục
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}
