"use client";

import { useState } from "react";
import { Bell, Settings, ChevronDown, Check, Menu } from "lucide-react";
import { useAppStore } from "@/app/store/useAppStore";
import { authService } from "@/app/services/authService";
import { AppPage } from "./Sidebar";
import { Modal } from "@/app/_components/ui/Modal";

const WORKSPACES = [
  { id: "a", label: "Acme Corp", initial: "A", color: "bg-green-600" },
  { id: "b", label: "Beta Inc", initial: "B", color: "bg-purple-600" },
  { id: "c", label: "CloudX", initial: "C", color: "bg-orange-500" },
];

interface HeaderProps {
  onNavigate: (page: AppPage) => void;
  onToggleSidebar?: () => void;
}

export function Header({ onNavigate, onToggleSidebar }: HeaderProps) {
  const user = useAppStore((s) => s.user);
  const showToast = useAppStore((s) => s.showToast);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [companyId, setCompanyId] = useState("");

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">

      {/* ── Left: Workspace / App Switcher ── */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Menu size={18} />
          </button>
        )}

        <div className="relative">
        <button
          onClick={() => setWorkspaceOpen((v) => !v)}
          className="flex items-center gap-1.5 px-1 py-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div
            className={`w-8 h-8 rounded-full ${activeWorkspace.color} text-white flex items-center justify-center font-bold text-sm select-none`}
          >
            {activeWorkspace.initial}
          </div>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-200 ${workspaceOpen ? "rotate-180" : ""}`}
          />
        </button>

        {workspaceOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setWorkspaceOpen(false)} />
            <div className="absolute left-0 top-[calc(100%+8px)] bg-white border border-gray-200 rounded-xl shadow-xl min-w-[210px] overflow-hidden z-20 py-1">
              <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Workspaces
              </p>
              {WORKSPACES.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws);
                    setWorkspaceOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full ${ws.color} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                  >
                    {ws.initial}
                  </div>
                  <span className="flex-1 text-left font-medium">{ws.label}</span>
                  {activeWorkspace.id === ws.id && (
                    <Check size={14} className="text-green-600 shrink-0" />
                  )}
                </button>
              ))}

              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setShowConnectionModal(true);
                  setWorkspaceOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
              >
                New Connection Request
              </button>
            </div>
          </>
        )}
        </div>
      </div>

      {/* ── Right: Bell + User + Settings ── */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="w-[38px] h-[38px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 relative transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* User pill */}
        <div className="flex items-center gap-2 pl-1 pr-1 py-1">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm select-none">
            {user?.initials ?? "SP"}
          </div>
          <span className="text-sm font-semibold text-gray-800">
            {user?.name ?? "Sneha Prakash"}
          </span>
        </div>

        {/* Settings gear — opens dropdown */}
        <div className="relative">
          <button
            onClick={() => setSettingsOpen((v) => !v)}
            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} />
          </button>

          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 top-[calc(100%+8px)] bg-white border border-gray-200 rounded-xl shadow-xl min-w-[190px] overflow-hidden z-20 py-1">
                <button
                  onClick={() => { onNavigate("admin"); setSettingsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => { onNavigate("admin"); setSettingsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => { showToast("Help & Support coming soon"); setSettingsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Help &amp; Support
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => { authService.logout(); setSettingsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showConnectionModal && (
        <Modal
          title="New Connection Request"
          onClose={() => setShowConnectionModal(false)}
          footer={
            <>
              <button
                onClick={() => {
                  setShowConnectionModal(false);
                  setCompanyId("");
                }}
                className="px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!companyId.trim()) return;
                  showToast(`Connection request sent for Company ID: ${companyId.trim()}`);
                  setCompanyId("");
                  setShowConnectionModal(false);
                }}
                className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Request
              </button>
            </>
          }
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p className="text-xs text-gray-500">
              Enter the company ID you received from your partner or workspace admin to
              send a connection request.
            </p>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Company ID
              </label>
              <input
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="e.g. COMP-00123"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
}