import { cn } from "@/app/utils/helpers";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md";
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
  outline: "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 bg-white",
  ghost:   "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent bg-transparent",
  danger:  "border-red-400 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-lg border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
