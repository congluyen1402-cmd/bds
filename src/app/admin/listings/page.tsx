"use client";

import { useState } from "react";
import { Search, Plus, Filter, Edit, Trash2, Eye } from "lucide-react";

export default function ListingsManager() {
  const [listings, setListings] = useState([
    { id: "VTX-PH-01", title: "Penthouse The Vertex", type: "Căn hộ", price: "85 Tỷ", status: "ACTIVE", agent: "Quang Minh" },
    { id: "TD-VIL-09", title: "Biệt Thự Ven Sông", type: "Biệt thự", price: "150 Tỷ", status: "DRAFT", agent: "Quang Minh" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0A1628]">Quản Lý Bất Động Sản</h1>
        <button className="bg-[#0A1628] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A2638] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm BĐS
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, mã BĐS..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B]"
          />
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Lọc
        </button>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4 font-semibold">Mã BĐS</th>
              <th className="px-6 py-4 font-semibold">Tên Dự Án</th>
              <th className="px-6 py-4 font-semibold">Loại Hình</th>
              <th className="px-6 py-4 font-semibold">Mức Giá</th>
              <th className="px-6 py-4 font-semibold">Trạng Thái</th>
              <th className="px-6 py-4 font-semibold">Chuyên Viên</th>
              <th className="px-6 py-4 font-semibold text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listings.map(l => (
              <tr key={l.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{l.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{l.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{l.type}</td>
                <td className="px-6 py-4 text-sm text-[#C8A96B] font-semibold">{l.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${l.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {l.status === 'ACTIVE' ? 'Đang bán' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{l.agent}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-gray-400">
                    <button className="hover:text-blue-500" title="Xem trước"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-green-500" title="Sửa"><Edit className="w-4 h-4" /></button>
                    <button className="hover:text-red-500" title="Xóa"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
