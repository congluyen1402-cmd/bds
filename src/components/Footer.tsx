"use client";

export default function Footer() {
  return (
    <footer className="relative z-10 glass-panel border-t border-white/10 pt-16 pb-8 mt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <path d="M50 10 L90 90 L10 90 Z" fill="transparent" stroke="#C8A96B" strokeWidth="4" />
                  <path d="M50 30 L75 80 L25 80 Z" fill="transparent" stroke="#C8A96B" strokeWidth="2" />
                </svg>
                <span className="font-serif text-2xl tracking-[0.2em] text-white uppercase mt-1">
                  [Brand]
                </span>
              </div>
              <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
                Thương hiệu phân phối bất động sản hạng sang hàng đầu, đồng hành cùng quý khách trên hành trình kiến tạo di sản.
              </p>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li>0909 123 456</li>
              <li>vip@luxuryrealestate.vn</li>
              <li>Tầng 68, The Landmark, Quận 1, TP.HCM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Khám Phá</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Bộ sưu tập</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Dịch vụ đặc quyền</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Góc báo chí</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Tuyển dụng</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} [Brand]. Bản quyền thuộc về [Brand].</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-gold transition-colors">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
