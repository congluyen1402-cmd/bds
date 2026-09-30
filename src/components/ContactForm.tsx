"use client";

import { useState } from "react";
import { Send, MapPin, Clock, Phone, Mail, CheckCircle2 } from "lucide-react";
import ScrollText from "./ScrollText";
import { IMAGES } from "@/data/images";

export default function ContactForm({ siteImages }: { siteImages?: any }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-navy" id="contact">
      {/* Background with real photo */}
      <div className="absolute inset-0 z-0">
        <img 
          src={siteImages?.contact_office?.imageUrl || IMAGES.contact.office} 
          alt={siteImages?.contact_office?.altText || "Office"} 
          style={siteImages?.contact_office ? { objectPosition: `${siteImages.contact_office.focalPointX}% ${siteImages.contact_office.focalPointY}%` } : {}}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-navy/85" />
      </div>

      <div className="absolute top-1/4 left-0 w-full whitespace-nowrap opacity-10 pointer-events-none z-0 flex justify-center">
        <ScrollText effect="outline" text="KẾT NỐI VỚI CHÚNG TÔI" className="font-serif text-[12vw] font-bold text-white tracking-widest" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <ScrollText effect="lines" text="Khởi Đầu Của Sự Hoàn Mỹ" className="font-serif text-3xl md:text-5xl text-white mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto">
            Hãy để chúng tôi lắng nghe nhu cầu của bạn. Mỗi khách hàng là một vị khách quý, mỗi yêu cầu đều được chăm sóc với chuẩn mực cao nhất.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Form Column */}
          <div className="flex-1 glass-panel p-8 md:p-12 rounded-[2rem]">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-white">Đã Gửi Thành Công</h3>
                <p className="text-white/70 max-w-sm">Chuyên viên của chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm transition-colors mt-4"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Họ và tên</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Số điện thoại</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="0909 123 456" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Dịch vụ quan tâm</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option className="bg-navy text-white">Mua bất động sản</option>
                      <option className="bg-navy text-white">Ký gửi bán/cho thuê</option>
                      <option className="bg-navy text-white">Tư vấn đầu tư</option>
                      <option className="bg-navy text-white">Thẩm định pháp lý</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Dự án / Mã sản phẩm</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors" placeholder="VD: Biệt thự Thảo Điền..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Ngày dự kiến</label>
                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 uppercase tracking-widest">Khung giờ</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option className="bg-navy text-white">Sáng (08:00 - 12:00)</option>
                      <option className="bg-navy text-white">Chiều (13:00 - 17:00)</option>
                      <option className="bg-navy text-white">Tối (18:00 - 21:00)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60 uppercase tracking-widest">Ghi chú thêm</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Bạn có yêu cầu đặc biệt nào không?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-gradient-to-r from-gold to-[#D4B982] text-navy font-bold uppercase tracking-widest rounded-xl py-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>Gửi yêu cầu <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="glass-panel p-8 md:p-12 rounded-[2rem] space-y-8 h-full">
              <div>
                <h3 className="font-serif text-2xl text-white mb-6">Trụ Sở Chính</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-white/70">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <span>Tầng 45, The Landmark 81, Vinhomes Central Park, Bình Thạnh, TP.HCM</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <Clock className="w-5 h-5 text-gold shrink-0" />
                    <span>Thứ 2 - Thứ 7: 08:30 - 18:00</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <Phone className="w-5 h-5 text-gold shrink-0" />
                    <a href="tel:0909123456" className="hover:text-gold transition-colors">0909 123 456</a>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <Mail className="w-5 h-5 text-gold shrink-0" />
                    <a href="mailto:contact@brand.vn" className="hover:text-gold transition-colors">contact@brand.vn</a>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="font-serif text-2xl text-white mb-6">Chuyên Viên Tư Vấn</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Minh Anh", role: "Biệt thự", img: IMAGES.agents.agent1 },
                    { name: "Hoàng Phong", role: "Căn hộ", img: IMAGES.agents.agent2 },
                    { name: "Bảo Trần", role: "Đầu tư", img: IMAGES.agents.agent3 },
                  ].map((agent, i) => (
                    <div key={i} className="text-center group">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full overflow-hidden border border-white/20 group-hover:border-gold transition-colors">
                        <img src={agent.img} alt={agent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="text-white text-sm font-medium">{agent.name}</div>
                      <div className="text-white/50 text-xs">{agent.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
