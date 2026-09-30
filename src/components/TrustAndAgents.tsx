"use client";

import { CheckCircle2, Shield, Gem, Headphones, FileText } from "lucide-react";
import ScrollText from "./ScrollText";

export default function TrustAndAgents() {
  const commitments = [
    { icon: <FileText className="w-8 h-8" />, title: "Pháp Lý Rõ Ràng", desc: "100% sản phẩm được thẩm định hồ sơ, quy hoạch, không tranh chấp, không thế chấp ngầm." },
    { icon: <Gem className="w-8 h-8" />, title: "Giá Trị Thật", desc: "Mức giá được thẩm định sát với giá trị thực tế của thị trường, cam kết không kê giá." },
    { icon: <Shield className="w-8 h-8" />, title: "Không Phí Ẩn", desc: "Minh bạch tuyệt đối trong mọi khoản phí, không phát sinh chi phí ngoài hợp đồng." },
    { icon: <Headphones className="w-8 h-8" />, title: "Hỗ Trợ Sau Bán", desc: "Đồng hành quản lý, cho thuê và bảo dưỡng gia sản trọn đời sau khi nhận nhà." }
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden" id="trust">
      <div className="absolute top-40 left-0 w-full whitespace-nowrap opacity-20 pointer-events-none -z-10 flex justify-center">
        <ScrollText effect="outline" text="THỦ THIÊM · QUẬN 1 · THẢO ĐIỀN" className="font-serif text-[10vw] font-bold text-white tracking-widest opacity-50" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <ScrollText effect="lines" text="Bảo Chứng Của Niềm Tin" className="font-serif text-3xl md:text-5xl text-white mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto">
            Sự an tâm của khách hàng là tài sản vô giá nhất. Chúng tôi thiết lập những tiêu chuẩn cao nhất về sự minh bạch và chuyên nghiệp.
          </p>
        </div>

        {/* Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {commitments.map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-white/5 transition-colors">
              <div className="text-gold mb-6 bg-gold/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <ScrollText effect="highlight" text={item.title} className="font-serif text-xl text-white mb-3" />
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Agents */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-12 text-center">Đội Ngũ Chuyên Gia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-2xl overflow-hidden group">
                <div className="h-80 bg-white/5 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt="Agent" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-2xl text-white mb-1">Trần Quang Minh</h3>
                    <p className="text-gold text-sm uppercase tracking-widest">Giám đốc Khối Biệt Thự</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-white font-medium text-lg">4.9/5</div>
                      <div className="text-white/50 text-xs uppercase tracking-wider">Đánh giá</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-lg">150+</div>
                      <div className="text-white/50 text-xs uppercase tracking-wider">Giao dịch</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg py-3 text-sm transition-colors">
                      Zalo
                    </button>
                    <button className="flex-1 bg-gold text-navy font-semibold rounded-lg py-3 text-sm hover:opacity-90 transition-opacity">
                      Gọi ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
