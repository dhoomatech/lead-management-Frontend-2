"use client";

import { LayoutDashboard, List, Users, LogOut, BarChart3 } from "lucide-react";
import { cn } from "@/app/utils/helpers";
import { useAppStore } from "@/app/store/useAppStore";
import { authService } from "@/app/services/authService";

export type AppPage = "dashboard" | "leads" | "admin" | "reports";

interface SidebarProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

const NAV = [
  { id: "dashboard" as AppPage, label: "Dashboard",       Icon: LayoutDashboard },
  { id: "leads"     as AppPage, label: "Lead Management", Icon: List            },
  { id: "admin"     as AppPage, label: "Admin Zone",      Icon: Users           },
  { id: "reports"   as AppPage, label: "Reports",         Icon: BarChart3       },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const leadStats = useAppStore((s) => s.leadStats);

  const newCount          = leadStats?.byStatus.NEW          ?? 8;
  const qualifiedCount    = leadStats?.byStatus.QUALIFIED    ?? 12;
  const disqualifiedCount = leadStats?.byStatus.DISQUALIFIED ?? 30;

  return (
    <aside className="fixed inset-y-0 left-0 w-[248px] bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-200 md:translate-x-0">
      {/* Logo */}
      <div className="px-5 py-[18px] border-b border-gray-200 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
        <div>
          <div className="text-[15px] font-bold text-gray-900 leading-tight">Dhooma Creative</div>
          <div className="text-[11px] text-gray-500">Digital Marketing Company</div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
              activePage === id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon size={18} /> {label}
          </button>
        ))}
        <button
          onClick={() => authService.logout()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all text-left"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>

      {/* Quick Status */}
      <div className="mx-3 mb-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-[11px] font-bold text-gray-500 tracking-[0.08em] uppercase mb-3">Quick Status</div>
        <div className="space-y-1">
          <div className="flex justify-between items-center py-0.5 text-sm">
            <span className="font-medium text-gray-700">New Lead</span>
            <span className="font-bold text-blue-600">{newCount}</span>
          </div>
          <div className="flex justify-between items-center py-0.5 text-sm">
            <span className="font-medium text-gray-700">Quality Leads</span>
            <span className="font-bold text-green-600">{qualifiedCount}</span>
          </div>
          <div className="flex justify-between items-center py-0.5 text-sm">
            <span className="font-medium text-gray-700">Non Quality Leads</span>
            <span className="font-bold text-red-600">{disqualifiedCount}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-3 border-t border-gray-200 text-[11px] text-gray-400 leading-relaxed">
        Session: Active<br />
        Version: v2.1.0<br />
        Monday, 2 March 2026
      </div>
    </aside>
  );
}
