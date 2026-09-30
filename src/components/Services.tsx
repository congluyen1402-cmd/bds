"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, FileSignature, Landmark, Calculator, Key, Wrench, ChevronDown, ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/images";
import ScrollText from "./ScrollText";
import { cn } from "@/lib/utils";

export default function Services({ siteImages }: { siteImages?: any }) {
  const getServicesData = () => [
    {
      id: "investment",
      icon: <LineChart className="w-8 h-8" />,
      title: "Tư vấn đầu tư",
      desc: "Phân tích xu hướng thị trường, đánh giá tiềm năng tăng giá và tư vấn danh mục đầu tư bất động sản tối ưu tỷ suất lợi nhuận.",
      img: siteImages?.services_investment?.imageUrl || IMAGES.services.investment,
      focal: siteImages?.services_investment
    },
    {
      id: "legal",
      icon: <FileSignature className="w-8 h-8" />,
      title: "Thẩm định pháp lý",
      desc: "Kiểm tra chi tiết quy hoạch, tính pháp lý của dự án, đảm bảo giao dịch an toàn và minh bạch tuyệt đối 100%.",
      img: siteImages?.services_legal?.imageUrl || IMAGES.services.legal,
      focal: siteImages?.services_legal
    },
    {
      id: "mortgage",
      icon: <Landmark className="w-8 h-8" />,
      title: "Hỗ trợ vay ngân hàng",
      desc: "Thiết kế giải pháp tài chính cá nhân hóa với các ngân hàng đối tác chiến lược, ưu đãi lãi suất độc quyền.",
      img: siteImages?.services_mortgage?.imageUrl || IMAGES.services.mortgage,
      focal: siteImages?.services_mortgage
    },
    {
      id: "valuation",
      icon: <Calculator className="w-8 h-8" />,
      title: "Định giá bất động sản",
      desc: "Khảo sát và định giá tài sản sát thực tế nhất dựa trên cơ sở dữ liệu giao dịch khổng lồ và kinh nghiệm thực chiến.",
      img: siteImages?.services_valuation?.imageUrl || IMAGES.services.valuation,
      focal: siteImages?.services_valuation
    },
    {
      id: "rental",
      icon: <Key className="w-8 h-8" />,
      title: "Quản lý cho thuê",
      desc: "Tìm kiếm khách thuê chất lượng, soạn thảo hợp đồng, thu tiền thuê và xử lý mọi vấn đề phát sinh trong quá trình vận hành.",
      img: siteImages?.services_rental?.imageUrl || IMAGES.services.rental,
      focal: siteImages?.services_rental
    },
    {
      id: "aftersales",
      icon: <Wrench className="w-8 h-8" />,
      title: "Chăm sóc sau bán",
      desc: "Đồng hành sửa chữa, bảo dưỡng, nâng cấp không gian sống để gia sản của bạn luôn trong tình trạng hoàn hảo nhất.",
      img: siteImages?.services_aftersales?.imageUrl || IMAGES.services.aftersales,
      focal: siteImages?.services_aftersales
    }
  ];

  const servicesList = getServicesData();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 relative z-10 bg-navy" id="services">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-16">
          <ScrollText effect="lines" text="Dịch Vụ Đặc Quyền" className="font-serif text-4xl md:text-5xl text-white mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Hệ sinh thái dịch vụ bất động sản toàn diện, được cá nhân hóa để mang lại trải nghiệm hoàn hảo cho giới tinh hoa.
          </p>
        </div>

        {/* Desktop Split Layout */}
        <div className="hidden md:flex bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden min-h-[600px] shadow-2xl">
          {/* Left: List */}
          <div className="w-5/12 p-8 lg:p-12 border-r border-white/10 flex flex-col justify-center">
            <div className="space-y-2">
              {servicesList.map((s, i) => (
                <div 
                  key={s.id}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 group",
                    activeIndex === i ? "bg-white/10 shadow-lg" : "hover:bg-white/5"
                  )}
                >
                  <div className={cn("mt-1 transition-colors", activeIndex === i ? "text-gold" : "text-white/40 group-hover:text-white/80")}>
                    {s.icon}
                  </div>
                  <div>
                    <h3 className={cn("font-serif text-2xl transition-colors mb-2", activeIndex === i ? "text-white" : "text-white/60 group-hover:text-white/90")}>
                      {s.title}
                    </h3>
                    {activeIndex === i && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-white/70 text-sm leading-relaxed"
                      >
                        {s.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4">
              <a href="#calculator" className="text-white/60 hover:text-gold text-sm uppercase tracking-widest flex items-center justify-between group">
                Tính toán khoản vay
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <a href="#contact" className="bg-gold text-navy rounded-full py-4 px-8 text-center text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Nhận tư vấn ngay
              </a>
            </div>
          </div>

          {/* Right: Images */}
          <div className="w-7/12 relative overflow-hidden bg-navy">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={servicesList[activeIndex].img}
                alt={servicesList[activeIndex].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/20 to-transparent" />
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4">
          {servicesList.map((s, i) => (
            <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button 
                className="w-full p-6 flex items-center justify-between text-left"
                onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
              >
                <div className="flex items-center gap-4">
                  <span className={activeIndex === i ? "text-gold" : "text-white/50"}>{s.icon}</span>
                  <span className="font-serif text-xl text-white">{s.title}</span>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-white/50 transition-transform", activeIndex === i ? "rotate-180" : "")} />
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-white/70 text-sm leading-relaxed">
                      {s.desc}
                      <img src={s.img} alt={s.title} className="w-full h-48 object-cover rounded-xl mt-4" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <a href="#contact" className="block mt-8 bg-gold text-navy rounded-full py-4 text-center text-sm font-bold uppercase tracking-widest active:scale-95 transition-transform">
            Nhận tư vấn ngay
          </a>
        </div>

      </div>
    </section>
  );
}
