// Button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils"; // or replace with clsx/twMerge

// --- Variant definitions ---
// Each key maps to a complete Tailwind class string for that style axis

const variantStyles = {
  solid:   "bg-violet-600 hover:bg-violet-500 text-white border border-violet-500/50 shadow-lg shadow-violet-600/20",
  ghost:   "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10",
  danger:  "bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 border-0",
  outline: "bg-slate-800/30 hover:bg-slate-600/20 text-white border border-slate-400",
} as const;

const sizeStyles = {
  sm:   "px-3 py-2 text-xs gap-1.5",
  md:   "px-4 py-2 text-sm gap-2",
  lg:   "px-4 py-3 text-sm gap-2.5",
  icon: "w-9 h-9 p-0",          // square icon button
} as const;

const layoutStyles = {
  default: "inline-flex items-center",
  full:    "w-full flex items-center",
  center:  "w-full flex items-center justify-center",
} as const;

// --- Prop types ---

type Variant = keyof typeof variantStyles;
type Size    = keyof typeof sizeStyles;
type Layout  = keyof typeof layoutStyles;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?:    Size;
  layout?:  Layout;
  onClick?: () => void;
  ref: React.Ref<HTMLButtonElement>;
}

// --- Component ---

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "ghost",
      size    = "md",
      layout  = "default",
      className,
      children,
      onClick,
      ...props
    },
    ref:React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={cn(
          // Base — shared across all buttons
          "rounded-xl font-medium transition-all",
          // Axes — each resolved independently
          variantStyles[variant],
          sizeStyles[size],
          layoutStyles[layout],
          // Caller overrides last
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";