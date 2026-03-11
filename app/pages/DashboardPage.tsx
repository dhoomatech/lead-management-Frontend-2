"use client";

import { useEffect } from "react";
import { Info, TrendingUp, ExternalLink } from "lucide-react";
import { useLeads } from "@/app/hooks/useLeads";
import { Avatar } from "@/app/_components/ui/Avatar";

const LEADERS = [
  { name: "Sneha Patel", email: "snehapatel@gmail.com", score: 82 },
  { name: "Ravi Kumar",  email: "ravikumar@gmail.com",  score: 74 },
  { name: "Priya Singh", email: "priya@dhooma.com",     score: 68 },
];

export function DashboardPage() {
  const { leadStats } = useLeads();

  const stats = [
    {
      label: "Total Leads",
      value: leadStats?.total ?? 0,
      variant: "default",
      tooltip: "All leads currently in the system across every status.",
    },
    {
      label: "Qualified Leads",
      value: leadStats?.byStatus.QUALIFIED ?? 0,
      variant: "green",
      tooltip: "Leads marked as qualified and ready for follow‑up.",
    },
    {
      label: "Disqualified Leads",
      value: leadStats?.byStatus.DISQUALIFIED ?? 0,
      variant: "red",
      tooltip: "Leads that have been disqualified and are not active.",
    },
    {
      label: "Pending Leads",
      value: leadStats?.byStatus.PENDING ?? 0,
      variant: "yellow",
      tooltip: "New or in‑review leads that still need a decision.",
    },
  ];

  const variantBg: Record<string, string> = {
    // Match pastel card colors from the design, with bolder borders
    // blue (Total), green (Qualified), purple (Disqualified), orange (Pending)
    default: "bg-indigo-50 border-indigo-400",
    green:   "bg-green-50 border-green-400",
    red:     "bg-purple-50 border-purple-400",
    yellow:  "bg-orange-50 border-orange-400",
  };

  const variantText: Record<string, string> = {
    default: "text-indigo-700",
    green:   "text-green-700",
    red:     "text-purple-700",
    yellow:  "text-orange-700",
  };

  return (
    <div>
      <h1 className="text-[22px] font-extrabold text-gray-900 mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`border rounded-2xl p-5 hover:shadow-md transition-shadow ${variantBg[s.variant]}`}
          >
            <div className={`flex items-center gap-1.5 text-[11px] font-semibold tracking-wide mb-2 ${variantText[s.variant]}`}>
              {s.label}
              <span className="relative group inline-flex">
                <Info size={13} className="opacity-70" />
                <div className="absolute left-1/2 -translate-x-1/2 top-5 w-56 rounded-lg bg-white text-[11px] text-gray-600 shadow-lg border border-gray-200 px-3 py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-10">
                  {s.tooltip}
                </div>
              </span>
            </div>
            <div className={`text-[34px] font-extrabold tracking-tight mb-1 leading-none ${variantText[s.variant]}`}>
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-2">
              <TrendingUp size={12} className="text-green-500" />
              <span className="text-green-600 font-semibold">+12.5%</span> growth in last month
            </div>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Leaderboard */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-[15px] font-bold text-gray-900 mb-4">Leader Board</h2>
          <div className="space-y-2.5">
            {LEADERS.map((l) => (
              <div key={l.email} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <Avatar initials={l.name.split(" ").map(w=>w[0]).join("")} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{l.name}</div>
                  <div className="text-xs text-gray-500 truncate">{l.email}</div>
                </div>
                <div className="flex items-center gap-1.5 mr-2">
                  <ExternalLink size={13} className="text-blue-500" />
                  <span className="font-bold text-gray-900">{l.score}</span>
                </div>
                <button className="px-3 py-1.5 border border-orange-400 text-orange-500 rounded-md text-xs font-semibold hover:bg-orange-500 hover:text-white transition-colors">
                  View details
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline">View all best performers →</span>
          </div>
        </div>

        {/* MQL */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-[15px] font-bold text-gray-900 mb-4">Marketing Qualified Leads (MQL)</h2>
          <div className="space-y-2.5">
            {LEADERS.map((l) => (
              <div key={l.email} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <Avatar initials={l.name.split(" ").map(w=>w[0]).join("")} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{l.name}</div>
                  <div className="text-xs text-gray-500 truncate">{l.email}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <span className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline">View all qualified leads →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
