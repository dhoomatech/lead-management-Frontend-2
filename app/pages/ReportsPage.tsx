 "use client";

import { useState } from "react";
import { Clock, ListChecks, MailQuestion } from "lucide-react";

type ReportsTab = "activity" | "history" | "pending";

const TABS: { id: ReportsTab; label: string; description: string; Icon: any }[] = [
  { id: "activity", label: "Activity Logs",            description: "Recent actions across your workspace",        Icon: Clock },
  { id: "history",  label: "Leads History",           description: "Timeline of lead creation and updates",       Icon: ListChecks },
  { id: "pending",  label: "Pending Connection Requests", description: "Companies or leads waiting for approval", Icon: MailQuestion },
];

export function ReportsPage() {
  const [tab, setTab] = useState<ReportsTab>("activity");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const activityRows = Array.from({ length: 22 }).map((_, i) => ({
    id: i + 1,
    time: "2026-03-10 14:3" + (i % 10),
    user: i % 2 === 0 ? "Sneha Patel" : "Ravi Kumar",
    action: i % 3 === 0 ? "Created lead" : i % 3 === 1 ? "Updated status" : "Logged in",
    details: i % 3 === 0 ? "Lead imported from Facebook" : "Changed status from NEW to QUALIFIED",
  }));

  const historyRows = Array.from({ length: 19 }).map((_, i) => ({
    id: i + 1,
    lead: `Lead #${1000 + i}`,
    change: i % 2 === 0 ? "Status changed" : "Owner updated",
    from: i % 2 === 0 ? "PENDING" : "Sneha",
    to: i % 2 === 0 ? "QUALIFIED" : "Mike",
    at: "2026-03-0" + ((i % 7) + 1),
  }));

  const pendingRows = Array.from({ length: 13 }).map((_, i) => ({
    id: i + 1,
    company: `Company ${String.fromCharCode(65 + (i % 5))}`,
    requestedBy: i % 2 === 0 ? "Sneha Patel" : "System import",
    type: i % 2 === 0 ? "Workspace connection" : "Lead sync",
    since: "2026-03-0" + ((i % 5) + 2),
  }));

  const dataForTab =
    tab === "activity" ? activityRows : tab === "history" ? historyRows : pendingRows;

  const totalPages = Math.max(1, Math.ceil(dataForTab.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const pageRows = dataForTab.slice(startIndex, startIndex + pageSize);

  const showingFrom = dataForTab.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pageSize, dataForTab.length);

  const changeTab = (next: ReportsTab) => {
    setTab(next);
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-[22px] font-extrabold text-gray-900 mb-6">Reports</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(({ id, label, description, Icon }) => (
          <button
            key={id}
            onClick={() => changeTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
              tab === id
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            <div className="text-left">
              <div className="font-semibold">{label}</div>
              <div className="text-[11px] opacity-80 hidden sm:block">{description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6">
        {tab === "activity" && (
          <div>
            <p className="mb-4 text-sm font-semibold text-gray-900">Workspace activity</p>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border-collapse text-xs text-gray-700">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {["Time", "User", "Action", "Details"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold text-[11px] text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row: any) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.user}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.action}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "history" && (
          <div>
            <p className="mb-4 text-sm font-semibold text-gray-900">Leads history</p>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border-collapse text-xs text-gray-700">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {["Lead", "Change", "From", "To", "Date"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold text-[11px] text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row: any) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.lead}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.change}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.from}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.to}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "pending" && (
          <div>
            <p className="mb-4 text-sm font-semibold text-gray-900">
              Pending connection requests
            </p>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border-collapse text-xs text-gray-700">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {["Company", "Requested By", "Type", "Since"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold text-[11px] text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row: any) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.company}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.requestedBy}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{row.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 text-[11px] text-gray-500">
          <div>
            {dataForTab.length === 0 ? (
              <span>No records.</span>
            ) : (
              <span>
                Showing{" "}
                <span className="font-semibold text-gray-700">{showingFrom}</span>
                {" - "}
                <span className="font-semibold text-gray-700">{showingTo}</span> of{" "}
                <span className="font-semibold text-gray-700">
                  {dataForTab.length}
                </span>{" "}
                items
              </span>
            )}
          </div>
          {dataForTab.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <span>
                Page <span className="font-semibold text-gray-700">{page}</span> of{" "}
                <span className="font-semibold text-gray-700">{totalPages}</span>
              </span>
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

