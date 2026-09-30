"use client";

import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, MessageSquare, Phone } from "lucide-react";

export default function CRM() {
  const columns = [
    { id: "NEW", title: "Khách Mới", color: "bg-blue-100 text-blue-800" },
    { id: "CONTACTED", title: "Đã Liên Hệ", color: "bg-yellow-100 text-yellow-800" },
    { id: "VIEWING", title: "Hẹn Xem", color: "bg-purple-100 text-purple-800" },
    { id: "NEGOTIATING", title: "Đàm Phán", color: "bg-orange-100 text-orange-800" },
    { id: "WON", title: "Chốt", color: "bg-green-100 text-green-800" },
  ];

  const initialLeads = [
    { id: 1, name: "Nguyễn Văn A", phone: "0901234567", budget: "90 Tỷ", status: "NEW", type: "Căn hộ" },
    { id: 2, name: "Trần Thị B", phone: "0987654321", budget: "200 Tỷ", status: "NEGOTIATING", type: "Biệt thự" },
    { id: 3, name: "Lê Văn C", phone: "0912345678", budget: "50 Tỷ", status: "CONTACTED", type: "Nhà phố" },
  ];

  const [leads, setLeads] = useState(initialLeads);

  const onDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("leadId", id.toString());
  };

  const onDrop = (e: React.DragEvent, statusId: string) => {
    const id = parseInt(e.dataTransfer.getData("leadId"));
    setLeads(leads.map(l => l.id === id ? { ...l, status: statusId } : l));
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0A1628]">Khách Hàng (CRM)</h1>
        <button className="bg-[#0A1628] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1A2638] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Thêm Khách Mới
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm theo tên, SĐT..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B]"
          />
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Lọc
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div 
            key={col.id} 
            className="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-4 flex flex-col h-full border border-gray-100"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, col.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${col.color}`}>
                {col.title} ({leads.filter(l => l.status === col.id).length})
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {leads.filter(l => l.status === col.id).map(lead => (
                <div 
                  key={lead.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, lead.id)}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-move hover:border-[#C8A96B] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{lead.name}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{lead.budget}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{lead.type}</p>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="flex gap-2 text-gray-400">
                      <button className="hover:text-blue-500"><Phone className="w-4 h-4" /></button>
                      <button className="hover:text-green-500"><MessageSquare className="w-4 h-4" /></button>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#0A1628] text-white flex items-center justify-center text-xs font-bold" title="Agent: Quang Minh">
                      Q
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
