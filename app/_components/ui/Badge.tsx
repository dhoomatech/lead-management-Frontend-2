import { cn } from "@/app/utils/helpers";
import { LeadStatus, LeadSource } from "@/src/entities/models/Lead";

const statusStyles: Record<LeadStatus, string> = {
  QUALIFIED:    "bg-green-50 text-green-700",
  NEW:          "bg-blue-50 text-blue-600",
  DISQUALIFIED: "bg-red-50 text-red-600",
  PENDING:      "bg-amber-50 text-amber-700",
};

const sourceStyles: Record<LeadSource, string> = {
  Facebook:  "bg-blue-50 text-blue-700",
  Instagram: "bg-pink-50 text-pink-700",
  Google:    "bg-yellow-50 text-yellow-700",
  LinkedIn:  "bg-indigo-50 text-indigo-700",
};

interface StatusBadgeProps {
  status: LeadStatus;
  withCaret?: boolean;
}

interface SourceBadgeProps {
  source: LeadSource;
  withCaret?: boolean;
}

const Caret = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function StatusBadge({ status, withCaret }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold", statusStyles[status])}>
      {status} {withCaret && <Caret />}
    </span>
  );
}

export function SourceBadge({ source, withCaret }: SourceBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold", sourceStyles[source])}>
      {source} {withCaret && <Caret />}
    </span>
  );
}
