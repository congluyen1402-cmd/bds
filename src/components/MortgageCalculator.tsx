"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

import ScrollText from "./ScrollText";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(50000000000); // 50 Tỷ
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [termYears, setTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);

  const downPayment = price * (downPaymentPct / 100);
  const loanAmount = price - downPayment;
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = termYears * 12;

  // Standard mortgage math
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <section className="py-24 relative z-10" id="calculator">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
            <div className="bg-gold/20 p-3 rounded-full text-gold">
              <Calculator className="w-8 h-8" />
            </div>
            <div>
              <ScrollText effect="lines" text="Dự Toán Tài Chính" className="font-serif text-3xl text-white" />
              <p className="text-white/60 mt-2">Tính toán khoản vay và lãi suất dự kiến</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white/70">Giá trị tài sản</label>
                  <span className="text-white font-medium">{formatCurrency(price)}</span>
                </div>
                <input 
                  type="range" min={5000000000} max={200000000000} step={1000000000}
                  value={price} onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white/70">Vốn tự có ({downPaymentPct}%)</label>
                  <span className="text-white font-medium">{formatCurrency(downPayment)}</span>
                </div>
                <input 
                  type="range" min={10} max={90} step={5}
                  value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white/70">Thời hạn vay</label>
                  <span className="text-white font-medium">{termYears} năm</span>
                </div>
                <input 
                  type="range" min={5} max={35} step={1}
                  value={termYears} onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-white/70">Lãi suất (ước tính)</label>
                  <span className="text-white font-medium">{interestRate}% / năm</span>
                </div>
                <input 
                  type="range" min={4} max={15} step={0.1}
                  value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-navy/50 rounded-2xl p-8 border border-white/5 flex flex-col justify-center text-center">
              <div className="mb-8">
                <p className="text-white/50 uppercase tracking-widest text-sm mb-2">Thanh toán dự kiến</p>
                <p className="font-serif text-4xl text-gold">{formatCurrency(monthlyPayment)}<span className="text-xl text-white/50 font-sans"> /tháng</span></p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Số tiền vay</span>
                  <span className="text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Tổng lãi dự kiến</span>
                  <span className="text-white">{formatCurrency(monthlyPayment * numberOfPayments - loanAmount)}</span>
                </div>
              </div>

              <button className="w-full border border-gold text-gold hover:bg-gold hover:text-navy font-semibold py-4 rounded-lg transition-colors uppercase tracking-widest text-sm">
                Nhận Tư Vấn Vay Chuyên Sâu
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
