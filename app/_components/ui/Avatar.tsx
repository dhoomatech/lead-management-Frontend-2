import { cn } from "@/app/utils/helpers";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-9 h-9 text-sm",
  lg: "w-[52px] h-[52px] text-lg",
  xl: "w-[72px] h-[72px] text-2xl",
};

export function Avatar({ initials, size = "md", color = "bg-blue-600", className }: AvatarProps) {
  return (
    <div className={cn("rounded-full text-white flex items-center justify-center font-bold flex-shrink-0", sizeMap[size], color, className)}>
      {initials}
    </div>
  );
}
