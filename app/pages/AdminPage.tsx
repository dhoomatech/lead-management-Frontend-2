"use client";

import { useState } from "react";
import { Camera, MoreHorizontal, Pencil } from "lucide-react";
import { useTeamMembers } from "@/app/hooks/useTeamMembers";
import { useAppStore } from "@/app/store/useAppStore";
import { UserRole } from "@/src/entities/models/TeamMember";
import { Avatar } from "@/app/_components/ui/Avatar";
import { Button } from "@/app/_components/ui/Button";
import { Modal } from "@/app/_components/ui/Modal";
import { cn } from "@/app/utils/helpers";

type Tab = "profile" | "company" | "team" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "company", label: "Company Profiles" },
  { id: "team",    label: "Team Members" },
  { id: "settings",label: "Settings" },
];

interface AddMemberForm {
  name: string;
  designation: UserRole;
  email: string;
  contactNumber: string;
  workingLocation: string;
}

const EMPTY_MEMBER: AddMemberForm = {
  name: "",
  designation: "Digital Marketer",
  email: "",
  contactNumber: "",
  workingLocation: "",
};

const COMPANIES = [
  { id: 1, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
  { id: 2, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
  { id: 3, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
  { id: 4, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
  { id: 5, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
  { id: 6, name: "ABC Company", email: "abccompany@gmail.com", did: "COMP011" },
];

interface SocialProfileRow {
  id: number;
  name: string;
  iconBg: string;
  initial: string;
  placeholder: string;
}

const INITIAL_SOCIAL_PROFILES: SocialProfileRow[] = [
  { id: 1, name: "WhatsApp",  iconBg: "bg-green-500",  initial: "W",  placeholder: "WhatsApp link" },
  { id: 2, name: "Facebook",  iconBg: "bg-blue-600",   initial: "f",  placeholder: "Facebook page URL" },
  { id: 3, name: "Instagram", iconBg: "bg-pink-500",   initial: "I",  placeholder: "Instagram profile URL" },
  { id: 4, name: "LinkedIn",  iconBg: "bg-sky-700",    initial: "in", placeholder: "LinkedIn page URL" },
  { id: 5, name: "YouTube",   iconBg: "bg-red-600",    initial: "▶",  placeholder: "YouTube channel URL" },
];

export function AdminPage() {
  const { teamMembers, addMember, removeMember } = useTeamMembers();
  const showToast = useAppStore((s) => s.showToast);

  const [tab, setTab]               = useState<Tab>("profile");
  const [showModal, setShowModal]   = useState(false);
  const [form, setForm]             = useState<AddMemberForm>(EMPTY_MEMBER);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0]);
  const [memberFilter, setMemberFilter]       = useState("All List");
  const [socialProfiles, setSocialProfiles]   = useState<SocialProfileRow[]>(INITIAL_SOCIAL_PROFILES);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const handleAddMember = async () => {
    try {
      await addMember({ name: form.name, email: form.email, role: form.designation });
      setShowModal(false);
      setForm(EMPTY_MEMBER);
      setFormErrors({});
    } catch (e: any) {
      if (e.fields) setFormErrors(e.fields);
    }
  };

  return (
    <div>
      <h1 className="text-[22px] font-extrabold text-gray-900 mb-6">Admin Zone</h1>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-center transition-all",
              tab === t.id
                ? "bg-white text-gray-900 font-semibold shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="text-lg font-bold text-gray-900 mb-6">Profile</div>
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-2xl font-bold select-none">S</div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Camera size={11} className="text-white" />
                </button>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Sneha Patel</div>
                <div className="text-sm text-gray-500">Digital Marketer</div>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              { label: "First Name",    val: "Afthabu Rahman",              span: false },
              { label: "Last Name",     val: "Afthabu Rahman",              span: false },
              { label: "Email:",        val: "afthaburahman313@gmail.com",  span: false },
              { label: "Designation",   val: "Manager",                     span: false },
              { label: "Phone Number",  val: "+91 8606200441",              span: false },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="text-sm font-semibold text-gray-700 mb-2">{label}</div>
                <input readOnly defaultValue={val} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600 outline-none cursor-default" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Profiles */}
      {tab === "company" && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Left panel */}
            <div className="border-r border-gray-200">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <input type="checkbox" className="accent-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Active Companies ({COMPANIES.length})</h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
                {COMPANIES.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCompany(c)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors",
                      selectedCompany.id === c.id && "bg-blue-50/60"
                    )}
                  >
                    <input type="checkbox" className="accent-blue-600 flex-shrink-0" onClick={(e) => e.stopPropagation()} />
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">MC</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{c.name}</div>
                      <div className="text-xs text-gray-500 truncate">{c.email}</div>
                      <div className="text-xs text-gray-400">DID: {c.did}</div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="p-7">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-bold">MC</div>
                    <button className="absolute bottom-1 right-1 w-7 h-7 bg-teal-600/80 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                      <Camera size={13} className="text-white" />
                    </button>
                    <div className="text-xs text-blue-500 font-semibold text-center mt-1 cursor-pointer hover:underline">Change</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{selectedCompany.name}</span>
                      <button className="text-blue-500 hover:text-blue-700"><Pencil size={15} /></button>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">{selectedCompany.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDisconnectModal(true)}
                  >
                    Disconnect Company
                  </Button>
                  <Button onClick={() => showToast("Changes saved")}>Save Changes</Button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-base font-bold text-gray-900">Details</span>
                  <button className="text-blue-500 hover:text-blue-700"><Pencil size={14} /></button>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-[160px_1fr] items-start gap-4">
                    <div className="text-sm font-semibold text-gray-800 pt-2.5">Description</div>
                    <textarea
                      defaultValue="Lorem ipsum dolor sit amet consectetur. Condimentum vitae et gravida malesuada. Gravida vel enim id tellus interdum famespibus. Cras eu tristique tortor phasellus senectus sollicitudin pulvinar jilyg urabitur nibh risus tempus erat sed coms ut ac nec enim."
                      rows={4}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 resize-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                    <div className="text-sm font-semibold text-gray-800">Category</div>
                    <input defaultValue="Category here" className="w-full max-w-[280px] px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                    <div className="text-sm font-semibold text-gray-800">Account Owner</div>
                    <select
                      className="w-full max-w-[280px] px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 bg-white cursor-pointer transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select employee
                      </option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                    <div className="text-sm font-semibold text-gray-800">Support Contact</div>
                    <select
                      className="w-full max-w-[280px] px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 bg-white cursor-pointer transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select employee (optional)
                      </option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                    <div className="text-sm font-semibold text-gray-800">Physical address</div>
                    <input defaultValue="dcjhbchb, dcjhbdcbcd, cdjhbdjhcbd, sjdhcbjhdbc" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors" />
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                    <div className="text-sm font-semibold text-gray-800">Website</div>
                    <div className="flex items-center gap-3">
                      <input defaultValue="www.abccompany.com" className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-blue-400 transition-colors" />
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        connect <a href="#" className="text-blue-500 hover:underline" onClick={(e) => e.preventDefault()}>dhoomatech.com</a>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-[160px_1fr] items-start gap-4 pt-2">
                    <div className="text-sm font-semibold text-gray-800 pt-1">Social Profiles</div>
                    <div className="space-y-2.5 w-full">
                      {socialProfiles.map((profile, index) => (
                        <div
                          key={profile.id}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50"
                        >
                          <span
                            className={`flex items-center justify-center rounded-full ${profile.iconBg} text-white text-xs font-semibold w-7 h-7`}
                          >
                            {profile.initial}
                          </span>
                          <input
                            placeholder={profile.placeholder}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 placeholder:text-gray-400"
                          />
                          {index >= INITIAL_SOCIAL_PROFILES.length && (
                            <button
                              type="button"
                              onClick={() =>
                                setSocialProfiles((rows) =>
                                  rows.filter((row) => row.id !== profile.id)
                                )
                              }
                              className="ml-1 text-xs font-semibold text-gray-400 hover:text-red-500"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setSocialProfiles((rows) => [
                            ...rows,
                            {
                              id: Date.now(),
                              name: "New profile",
                              iconBg: "bg-gray-500",
                              initial: "+",
                              placeholder: "Another social link",
                            },
                          ])
                        }
                        className="mt-1 inline-flex items-center justify-center px-3 py-2 rounded-lg border border-dashed border-gray-300 text-xs font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        + Add social profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      {tab === "team" && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage team role and permissions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={memberFilter}
                  onChange={(e) => setMemberFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none cursor-pointer focus:border-blue-400 transition-colors"
                >
                  <option>All List</option>
                  <option>Digital Marketer</option>
                  <option>Sales Persons</option>
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <Button onClick={() => setShowModal(true)}>Add Member</Button>
            </div>
          </div>
          <div className="space-y-2.5">
            {teamMembers
              .filter((m) =>
                memberFilter === "All List" ||
                (memberFilter === "Digital Marketer" && m.role === "Digital Marketer") ||
                (memberFilter === "Sales Persons" && m.role === "Salesperson")
              )
              .map((m) => (
                <div key={m.id} className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center gap-3.5 hover:shadow-sm transition-shadow">
                  <Avatar initials={m.initials} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{m.role}</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1"><MoreHorizontal size={18} /></button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Disconnect company confirmation */}
      {showDisconnectModal && (
        <Modal
          title="Disconnect company"
          onClose={() => setShowDisconnectModal(false)}
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setShowDisconnectModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  showToast(`Company ${selectedCompany.name} disconnected`);
                  setShowDisconnectModal(false);
                }}
              >
                Disconnect
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Are you sure you want to disconnect{" "}
              <span className="font-semibold text-gray-900">
                {selectedCompany.name}
              </span>{" "}
              from this workspace?
            </p>
            <p className="text-xs text-gray-500">
              This will not delete any data, but the company will no longer be
              associated with your active accounts until reconnected.
            </p>
          </div>
        </Modal>
      )}

      {/* Settings */}
      {tab === "settings" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-7">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Account Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Manage your preferences and security</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Email Notifications",  desc: "Receive notifications for new leads",              on: true },
              { label: "Lead Auto-Assignment", desc: "Automatically assign leads based on source rules", on: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
                <div className={cn("relative w-11 h-6 rounded-full cursor-pointer", s.on ? "bg-blue-600" : "bg-gray-300")}>
                  <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all", s.on ? "left-6" : "left-1")} />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <div className="text-sm font-semibold text-gray-900">Two-Factor Authentication</div>
                <div className="text-xs text-gray-500 mt-0.5">Add an extra layer of security</div>
              </div>
              <Button size="sm" onClick={() => showToast("2FA setup coming soon")}>Enable 2FA</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50/30 rounded-xl">
              <div>
                <div className="text-sm font-semibold text-red-600">Delete Account</div>
                <div className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data</div>
              </div>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showModal && (
        <Modal
          title="Add Member"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button
                onClick={() => { setShowModal(false); showToast("Skipped"); }}
                className="px-4 py-2 text-sm font-semibold text-blue-600 hover:underline"
              >
                Skip now
              </button>
              <Button onClick={handleAddMember}>Save</Button>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="New"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
              />
              {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation</label>
              <div className="relative">
                <select
                  value={form.designation}
                  onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value as UserRole }))}
                  className="appearance-none w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-blue-400 cursor-pointer transition-colors"
                >
                  <option value="Digital Marketer">Digital Marketer</option>
                  <option value="Salesperson">Salesperson</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="email address here"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
              />
              {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Number</label>
              <input
                value={form.contactNumber}
                onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
                placeholder="contact number here"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Working Location</label>
              <input
                value={form.workingLocation}
                onChange={(e) => setForm((f) => ({ ...f, workingLocation: e.target.value }))}
                placeholder="input field"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
