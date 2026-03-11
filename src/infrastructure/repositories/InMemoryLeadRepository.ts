import { Lead, CreateLeadDTO, UpdateLeadDTO, LeadStatus } from "@/src/entities/models/Lead";
import { ILeadRepository, LeadFilters } from "@/src/application/repositories/ILeadRepository";

const SEED: Lead[] = [
  { id: 1,  name: "Sneha Patel",  phone: "+91 8606 200441", email: "snehapatel@gmail.com", source: "Facebook",  status: "QUALIFIED",    assignTo: "Sneha Patel", dateAdded: "12-04-2026" },
  { id: 2,  name: "Ravi Kumar",   phone: "+91 9876 543210", email: "ravi@gmail.com",       source: "Instagram", status: "NEW",          assignTo: "Mike Chen",   dateAdded: "11-04-2026" },
  { id: 3,  name: "Priya Singh",  phone: "+91 9123 456789", email: "priya@gmail.com",      source: "Google",    status: "PENDING",      assignTo: "Sneha Patel", dateAdded: "10-04-2026" },
  { id: 4,  name: "Arjun Nair",   phone: "+91 9988 776655", email: "arjun@gmail.com",      source: "Facebook",  status: "DISQUALIFIED", assignTo: "Mike Chen",   dateAdded: "09-04-2026" },
  { id: 5,  name: "Meera Das",    phone: "+91 8765 432109", email: "meera@gmail.com",      source: "Google",    status: "QUALIFIED",    assignTo: "Sneha Patel", dateAdded: "08-04-2026" },
  { id: 6,  name: "Sam Thomas",   phone: "+91 8899 001122", email: "sam@gmail.com",        source: "Facebook",  status: "NEW",          assignTo: "Mike Chen",   dateAdded: "07-04-2026" },
  { id: 7,  name: "Lakshmi P",    phone: "+91 7788 223344", email: "lakshmi@gmail.com",    source: "Instagram", status: "QUALIFIED",    assignTo: "Sneha Patel", dateAdded: "06-04-2026" },
  { id: 8,  name: "Vikram R",     phone: "+91 9900 112233", email: "vikram@gmail.com",     source: "Google",    status: "PENDING",      assignTo: "Mike Chen",   dateAdded: "05-04-2026" },
  { id: 9,  name: "Ananya M",     phone: "+91 6677 889900", email: "ananya@gmail.com",     source: "Facebook",  status: "QUALIFIED",    assignTo: "Sneha Patel", dateAdded: "04-04-2026" },
];

let store: Lead[] = [...SEED];
let nextId = 10;

export class InMemoryLeadRepository implements ILeadRepository {
  async findAll(filters?: LeadFilters): Promise<Lead[]> {
    let results = [...store];
    if (filters?.status) results = results.filter((l) => l.status === filters.status);
    if (filters?.source) results = results.filter((l) => l.source === filters.source);
    if (filters?.assignTo) results = results.filter((l) => l.assignTo === filters.assignTo);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
      );
    }
    return results;
  }

  async findById(id: number): Promise<Lead | null> {
    return store.find((l) => l.id === id) ?? null;
  }

  async create(data: CreateLeadDTO): Promise<Lead> {
    const lead: Lead = {
      id: nextId++,
      name: data.name,
      phone: data.phone,
      email: data.email,
      source: data.source,
      status: "NEW",
      assignTo: data.assignTo ?? "Unassigned",
      dateAdded: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    };
    store = [lead, ...store];
    return lead;
  }

  async update(id: number, data: UpdateLeadDTO): Promise<Lead> {
    store = store.map((l) => (l.id === id ? { ...l, ...data } : l));
    return store.find((l) => l.id === id)!;
  }

  async delete(id: number): Promise<void> {
    store = store.filter((l) => l.id !== id);
  }

  async count(): Promise<number> {
    return store.length;
  }

  async countByStatus(): Promise<Record<LeadStatus, number>> {
    return {
      NEW:          store.filter((l) => l.status === "NEW").length,
      QUALIFIED:    store.filter((l) => l.status === "QUALIFIED").length,
      DISQUALIFIED: store.filter((l) => l.status === "DISQUALIFIED").length,
      PENDING:      store.filter((l) => l.status === "PENDING").length,
    };
  }
}
