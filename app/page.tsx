"use client";

import { useState } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { LoginPage } from "@/app/pages/LoginPage";
import { DashboardPage } from "@/app/pages/DashboardPage";
import { LeadsPage } from "@/app/pages/LeadsPage";
import { LeadDetailPage } from "@/app/pages/LeadDetailPage";
import { AdminPage } from "@/app/pages/AdminPage";
import { ReportsPage } from "@/app/pages/ReportsPage";
import { Sidebar, AppPage } from "@/app/_components/layout/Sidebar";
import { Header } from "@/app/_components/layout/Header";
import { Toast } from "@/app/_components/ui/Toast";
import { Lead } from "@/src/entities/models/Lead";

type PageState = AppPage | "lead-detail";

export default function Home() {
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const [page, setPage]               = useState<PageState>("dashboard");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  const navigate = (p: AppPage) => setPage(p);

  const viewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setPage("lead-detail");
  };

  const activeSidebarPage: AppPage =
    page === "lead-detail" ? "leads" : (page as AppPage);

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar activePage={activeSidebarPage} onNavigate={navigate} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-[248px]">
            <Sidebar activePage={activeSidebarPage} onNavigate={(p) => { navigate(p); setSidebarOpen(false); }} />
          </div>
          <button
            aria-label="Close sidebar"
            className="flex-1 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col md:ml-[248px]">
        <Header onNavigate={navigate} onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 p-4 md:p-7">
          {page === "dashboard"   && <DashboardPage />}
          {page === "leads"       && <LeadsPage onViewLead={viewLead} />}
          {page === "lead-detail" && selectedLead && (
            <LeadDetailPage lead={selectedLead} onBack={() => setPage("leads")} />
          )}
          {page === "admin"   && <AdminPage />}
          {page === "reports" && <ReportsPage />}
        </main>
      </div>

      <Toast />
    </div>
  );
}
