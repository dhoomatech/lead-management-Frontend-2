"use client";

import { useState } from "react";
import { ChevronLeft, Phone, Mail, Calendar, Clock } from "lucide-react";
import { Lead, LeadStatus, LeadSource } from "@/src/entities/models/Lead";
import { useLeads } from "@/app/hooks/useLeads";
import { useFeedback } from "@/app/hooks/useFeedback";
import { useAppStore } from "@/app/store/useAppStore";
import { Button } from "@/app/_components/ui/Button";

interface LeadDetailPageProps {
  lead: Lead;
  onBack: () => void;
}

export function LeadDetailPage({ lead, onBack }: LeadDetailPageProps) {
  const { updateLead } = useLeads();
  const showToast = useAppStore((s) => s.showToast);
  const user = useAppStore((s) => s.user);
  const { feedbackList, addFeedback } = useFeedback(lead.id);

  const [status, setStatus]     = useState<LeadStatus>(lead.status);
  const [assignTo, setAssignTo] = useState(lead.assignTo);
  const [source, setSource]     = useState<LeadSource>(lead.source);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const [timeline] = useState([
    { title: "Lead Auto-Assigned",  desc: "Lead automatically assigned based on Facebook source rules", by: "System",                                time: "1/15/2024, 2:30:00 PM" },
    { title: "Lead Created",        desc: "Lead automatically assigned based on Facebook source rules", by: "Raneesha Rahman, Digital Marketer",     time: "1/15/2024, 2:28:00 PM" },
  ]);

  const handleSave = async () => {
    await updateLead(lead.id, { status, assignTo, source });
    showToast("Lead updated");
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackMsg.trim()) return;
    await addFeedback({
      leadId: lead.id,
      message: feedbackMsg,
      createdBy: user?.name ?? "Unknown",
    });
    setFeedbackMsg("");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
          <ChevronLeft size={16} /> Back to Leads
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-sm text-gray-600">Profile Settings</span>
      </div>

      <h1 className="text-[22px] font-extrabold text-gray-900 mb-6">Profile Settings</h1>

      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* ── Left column ── */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 relative">
            <div className="absolute top-5 right-5 flex gap-2">
              <button onClick={() => showToast(`Calling ${lead.name}…`)} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <Phone size={14} />
              </button>
              <button onClick={() => showToast(`Emailing ${lead.name}…`)} className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <Mail size={14} />
              </button>
            </div>
            <div className="w-[52px] h-[52px] rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xl mb-3">{lead.name[0]}</div>
            <div className="text-lg font-bold text-gray-900">{lead.name}</div>
            <div className="text-sm text-gray-500 mt-0.5">Digital Marketer</div>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-gray-700"><Phone size={15} className="text-blue-600" />{lead.phone}</div>
              <div className="flex items-center gap-2.5 text-sm text-gray-700"><Mail size={15} className="text-blue-600" />{lead.email}</div>
              <div className="flex items-center gap-2.5 text-sm text-gray-700"><Calendar size={15} className="text-gray-400" />Lead Added on {lead.dateAdded}</div>
            </div>
          </div>

          {/* Status selects */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            {[
              { label: "Status",     value: status,   onChange: (v: string) => setStatus(v as LeadStatus),   opts: ["NEW","QUALIFIED","DISQUALIFIED","PENDING"] },
              { label: "Assigned To",value: assignTo, onChange: (v: string) => setAssignTo(v),               opts: ["Sneha Patel","Mike Chen","Ravi Kumar"] },
              { label: "Source",     value: source,   onChange: (v: string) => setSource(v as LeadSource),   opts: ["Facebook","Instagram","Google","LinkedIn"] },
            ].map(({ label, value, onChange, opts }) => (
              <div key={label}>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
                <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none cursor-pointer">
                  {opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <Button onClick={handleSave} className="w-full justify-center">Save Changes</Button>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-4">
          {/* New feedback */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-4">Add new feedback</h3>
            <div className="flex gap-3 border border-gray-200 rounded-xl p-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <textarea
                value={feedbackMsg} onChange={(e) => setFeedbackMsg(e.target.value)}
                placeholder="Write your feedback here..."
                className="flex-1 border-none outline-none resize-none text-sm text-gray-700 min-h-[60px] bg-transparent placeholder:text-gray-400"
              />
            </div>
            <div className="mt-3">
              <Button onClick={handleFeedbackSubmit}>Submit</Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            {timeline.map((item, i) => (
              <div key={i} className={`flex gap-3.5 py-4 ${i < timeline.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {item.desc}<br /><strong>by {item.by}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                      <Clock size={11} /> {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Existing feedback list */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-3">Feedback</h3>
            {feedbackList.length === 0 ? (
              <div className="text-sm text-gray-400 italic">No feedback yet.</div>
            ) : (
              <div className="space-y-3">
                {feedbackList.map((fb) => (
                  <div key={fb.id} className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4">
                    <p>{fb.message}</p>
                    <p className="text-xs text-gray-400 mt-2">— {fb.createdBy} · {fb.createdAt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
