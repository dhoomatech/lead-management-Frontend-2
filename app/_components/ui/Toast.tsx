"use client";

import { CheckCircle } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";

export function Toast() {
  const toast = useAppStore((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100]" style={{ animation: "slideUp .3s ease" }}>
      <div className="bg-gray-900 text-white px-4 py-3 rounded-xl flex items-center gap-2.5 shadow-2xl text-sm font-medium">
        <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
        {toast}
      </div>
    </div>
  );
}
