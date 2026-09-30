"use client";

import { ArrowUpRight, ArrowDownRight, Users, Eye, Heart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Khách hàng mới (Tuần này)", value: "24", change: "+12%", up: true, icon: <Users className="w-6 h-6 text-blue-500" /> },
    { name: "Lượt xem tin (Tuần này)", value: "1,240", change: "+18%", up: true, icon: <Eye className="w-6 h-6 text-green-500" /> },
    { name: "Lượt lưu yêu thích", value: "85", change: "-5%", up: false, icon: <Heart className="w-6 h-6 text-red-500" /> },
    { name: "Doanh thu dự kiến (Tỷ)", value: "350", change: "+42%", up: true, icon: <DollarSign className="w-6 h-6 text-yellow-500" /> },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0A1628]">Tổng Quan</h1>
        <div className="text-sm text-gray-500">
          Dữ liệu cập nhật: {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.name}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#0A1628]">{stat.value}</span>
                <span className={`flex items-center text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pipeline Funnel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A1628] mb-6">Phễu Chuyển Đổi</h2>
          {/* Skeleton representation of a chart */}
          <div className="h-64 flex flex-col justify-end gap-2 items-center">
             <div className="w-full bg-blue-100 rounded-t-lg flex items-center justify-between px-4" style={{ height: '30%' }}>
                <span className="text-sm font-medium text-blue-800">100 Leads Mới</span>
             </div>
             <div className="w-4/5 bg-blue-200 flex items-center justify-between px-4" style={{ height: '25%' }}>
                <span className="text-sm font-medium text-blue-800">60 Đã liên hệ</span>
             </div>
             <div className="w-3/5 bg-blue-300 flex items-center justify-between px-4" style={{ height: '25%' }}>
                <span className="text-sm font-medium text-blue-800">30 Hẹn xem</span>
             </div>
             <div className="w-2/5 bg-blue-500 rounded-b-lg flex items-center justify-between px-4 text-white" style={{ height: '20%' }}>
                <span className="text-sm font-medium">10 Đàm phán / Chốt</span>
             </div>
          </div>
        </div>

        {/* Top Listings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A1628] mb-6">Top BĐS Yêu Thích</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80`} alt="thumb" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">Penthouse The Vertex</h3>
                  <p className="text-xs text-gray-500">Quận 1, TP.HCM</p>
                  <p className="text-xs font-semibold text-[#C8A96B] mt-1">85 Tỷ</p>
                </div>
                <div className="text-center bg-gray-50 px-2 py-1 rounded">
                  <Heart className="w-4 h-4 mx-auto text-red-500 mb-1" />
                  <span className="text-xs font-bold text-gray-700">42</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
