"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Phone, Mail, MoreHorizontal, Plus } from "lucide-react";
import { useLeads } from "@/app/hooks/useLeads";
import { Lead, CreateLeadDTO, LeadSource, LeadStatus } from "@/src/entities/models/Lead";
import { StatusBadge, SourceBadge } from "@/app/_components/ui/Badge";
import { Avatar } from "@/app/_components/ui/Avatar";
import { Button } from "@/app/_components/ui/Button";
import { Modal } from "@/app/_components/ui/Modal";
import { useAppStore } from "@/app/store/useAppStore";

interface LeadsPageProps {
  onViewLead: (lead: Lead) => void;
}

const EMPTY_FORM: CreateLeadDTO = { name: "", phone: "", email: "", source: "Facebook", assignTo: "Sneha Patel" };

const SOURCE_OPTIONS: { value: LeadSource; label: string; dotClass: string; textClass: string }[] = [
  { value: "Facebook",  label: "Facebook",  dotClass: "bg-blue-600",    textClass: "text-blue-700" },
  { value: "Instagram", label: "Instagram", dotClass: "bg-pink-600",    textClass: "text-pink-700" },
  { value: "Google",    label: "Google",    dotClass: "bg-amber-500",   textClass: "text-amber-700" },
  { value: "LinkedIn",  label: "LinkedIn",  dotClass: "bg-indigo-600",  textClass: "text-indigo-700" },
];

const STATUS_OPTIONS: { value: LeadStatus; label: string; dotClass: string; textClass: string }[] = [
  { value: "NEW",          label: "New",          dotClass: "bg-blue-500",    textClass: "text-blue-700" },
  { value: "QUALIFIED",    label: "Qualified",    dotClass: "bg-green-500",   textClass: "text-green-700" },
  { value: "PENDING",      label: "Pending",      dotClass: "bg-amber-500",   textClass: "text-amber-700" },
  { value: "DISQUALIFIED", label: "Disqualified", dotClass: "bg-red-500",     textClass: "text-red-700" },
];

export function LeadsPage({ onViewLead }: LeadsPageProps) {
  const { leads, createLead, updateLead } = useLeads();
  const showToast = useAppStore((s) => s.showToast);
  const [search, setSearch]       = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [form, setForm]           = useState<CreateLeadDTO>(EMPTY_FORM);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [openSourceFor, setOpenSourceFor] = useState<number | null>(null);
  const [openStatusFor, setOpenStatusFor] = useState<number | null>(null);
  const [callLead, setCallLead]   = useState<Lead | null>(null);
  const [page, setPage]           = useState(1);

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  // Reset to first page when search text changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const pageSize    = 10;
  const totalPages  = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex  = (page - 1) * pageSize;
  const pageLeads   = filtered.slice(startIndex, startIndex + pageSize);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo   = Math.min(startIndex + pageSize, filtered.length);

  const handleSubmit = async () => {
    try {
      await createLead(form);
      setShowModal(false);
      setForm(EMPTY_FORM);
      setErrors({});
    } catch (e: any) {
      if (e.fields) setErrors(e.fields);
    }
  };

  const field = (label: string, key: keyof CreateLeadDTO, type = "text") => (
    <div key={key}>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={(form as any)[key] ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:border-blue-500 transition-colors border-gray-200"
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-[22px] font-extrabold text-gray-900">Lead Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowBulkModal(true)}>
            Bulk Upload
          </Button>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={15} /> + New Lead
          </Button>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-5">
        <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-0">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text" placeholder="Search ..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none text-sm text-gray-700 w-full bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <Filter size={14} className="text-blue-600" /> Filter:
          </span>
          {["All Status", "All Sources", "All Assigned", "All Dates"].map((opt) => (
            <select key={opt} className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none cursor-pointer">
              <option>{opt}</option>
            </select>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-10 px-4 py-3"><input type="checkbox" className="accent-blue-600" /></th>
              {["Name","Phone Number","Email","Source","Status","Assign To","Date Added","Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3"><input type="checkbox" className="accent-blue-600" /></td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{lead.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{lead.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
                <td className="px-4 py-3">
                  <div className="relative inline-block text-xs font-bold">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSourceFor(openSourceFor === lead.id ? null : lead.id)
                      }
                      className="inline-flex items-center"
                    >
                      <SourceBadge source={lead.source} withCaret />
                    </button>
                    {openSourceFor === lead.id && (
                      <div className="absolute z-20 mt-1 w-40 rounded-lg bg-white border border-gray-200 shadow-lg py-1">
                        {SOURCE_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              if (opt.value !== lead.source) {
                                updateLead(lead.id, { source: opt.value });
                                showToast("Lead source updated");
                              }
                              setOpenSourceFor(null);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${opt.textClass}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${opt.dotClass}`} />
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="relative inline-block text-xs font-bold">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenStatusFor(openStatusFor === lead.id ? null : lead.id)
                      }
                      className="inline-flex items-center"
                    >
                      <StatusBadge status={lead.status} withCaret />
                    </button>
                    {openStatusFor === lead.id && (
                      <div className="absolute z-20 mt-1 w-44 rounded-lg bg-white border border-gray-200 shadow-lg py-1">
                        {STATUS_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              if (opt.value !== lead.status) {
                                updateLead(lead.id, { status: opt.value });
                                showToast("Lead status updated");
                              }
                              setOpenStatusFor(null);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-gray-50 ${opt.textClass}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${opt.dotClass}`} />
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                    <Avatar initials={lead.assignTo[0]} size="sm" />
                    {lead.assignTo}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{lead.dateAdded}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {[
                      { Icon: Phone,         title: "Call",  action: () => setCallLead(lead) },
                      {
                        Icon: Mail,
                        title: "Email",
                        action: () => {
                          const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                            lead.email
                          )}&su=${encodeURIComponent("Regarding your enquiry")}`;
                          window.open(url, "_blank", "noopener,noreferrer");
                        },
                      },
                      { Icon: MoreHorizontal,title: "View",  action: () => onViewLead(lead) },
                    ].map(({ Icon, title, action }) => (
                      <button key={title} onClick={action} title={title}
                        className="w-7 h-7 border border-gray-200 rounded-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 text-xs text-gray-500">
        <div>
          {filtered.length === 0 ? (
            <span>No leads found.</span>
          ) : (
            <span>
              Showing <span className="font-semibold text-gray-700">{showingFrom}</span>
              {" - "}
              <span className="font-semibold text-gray-700">{showingTo}</span> of{" "}
              <span className="font-semibold text-gray-700">{filtered.length}</span> leads
            </span>
          )}
        </div>
        {filtered.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-xs text-gray-500">
              Page <span className="font-semibold text-gray-700">{page}</span> of{" "}
              <span className="font-semibold text-gray-700">{totalPages}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Call popup */}
      {callLead && (
        <Modal
          title="Call Lead"
          onClose={() => setCallLead(null)}
          footer={
            <>
              <Button variant="outline" onClick={() => setCallLead(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  showToast(`Calling ${callLead.name} at ${callLead.phone}…`);
                  setCallLead(null);
                }}
              >
                Call
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              You are about to call{" "}
              <span className="font-semibold text-gray-900">{callLead.name}</span>.
            </p>
            <p>
              Phone number:{" "}
              <span className="font-mono font-semibold text-gray-900">
                {callLead.phone}
              </span>
            </p>
          </div>
        </Modal>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          title="Add New Lead"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Add Lead</Button>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {field("Name",  "name")}
            {field("Phone", "phone")}
            <div className="col-span-2">{field("Email", "email", "email")}</div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value as LeadSource }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none"
              >
                <option>Facebook</option><option>Instagram</option><option>Google</option><option>LinkedIn</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assign To</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none">
                <option>Sneha Patel</option><option>Mike Chen</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Bulk upload modal */}
      {showBulkModal && (
        <Modal
          title="Bulk Upload Leads"
          onClose={() => setShowBulkModal(false)}
          footer={
            <>
              <Button variant="outline" onClick={() => setShowBulkModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  showToast("Bulk upload processing coming soon");
                  setShowBulkModal(false);
                }}
              >
                Upload
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-sm text-gray-700">
            <p className="text-xs text-gray-500">
              Upload an Excel or CSV file with your leads. We currently support
              .xlsx, .xls and .csv formats.
            </p>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-700 mb-1.5">
                Choose file
              </span>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="block w-full text-xs text-gray-600 file:mr-3 file:px-4 file:py-2.5 file:rounded-lg file:border file:border-gray-200 file:bg-white file:text-xs file:font-semibold file:text-gray-700 hover:file:border-gray-400 hover:file:bg-gray-50"
              />
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}
