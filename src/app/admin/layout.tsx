"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, Calendar, Settings, LogOut, Menu, X, Bell, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { name: "Tổng quan", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Bất động sản", href: "/admin/listings", icon: <Building2 className="w-5 h-5" /> },
    { name: "Khách hàng (CRM)", href: "/admin/crm", icon: <Users className="w-5 h-5" /> },
    { name: "Lịch hẹn", href: "/admin/calendar", icon: <Calendar className="w-5 h-5" /> },
    { name: "Hình ảnh website", href: "/admin/images", icon: <ImageIcon className="w-5 h-5" /> },
    { name: "Cài đặt", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#0A1628] flex font-sans">
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1628] text-white transition-transform duration-300 ease-in-out flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:flex-shrink-0"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <span className="font-serif text-xl tracking-[0.2em] text-[#C8A96B] uppercase">Admin</span>
          <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-[#C8A96B] text-[#0A1628]" : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-white/70">
            <div className="w-8 h-8 rounded-full bg-[#C8A96B] text-[#0A1628] flex items-center justify-center font-bold">
              Q
            </div>
            <div>
              <p className="font-medium text-white">Quang Minh</p>
              <p className="text-xs opacity-70">Agent</p>
            </div>
          </div>
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-40">
          <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </div>

      </main>
    </div>
  );
}
