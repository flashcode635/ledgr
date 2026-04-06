"use client";

import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import gsap from "gsap";

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  change?: number;  // percentage MoM
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  icon,
  gradient,
  delay = 0,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const valueEl = valueRef.current;
    if (!card || !valueEl) return;

    // Entry animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out" }
    );

    // Count-up animation
    const target = Math.abs(value);
gsap.fromTo(
  { val: 0 },
  { val: 0 }, // fromVars
  {           // toVars
    val: target,
    duration: 1.2,
    delay: delay + 0.2,
    ease: "power2.out",
    onUpdate: function () {
      if (valueEl) {
        const sign = value < 0 ? -1 : 1;
        valueEl.textContent = formatCurrency(this._targets[0].val * sign);
      }
    },
  }
);
  }, [value, delay]);

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl p-6 surface border border-(--card-border) backdrop-blur-sm hover:border-white/15 transition-all duration-300 group cursor-default"
    >
      {/* Gradient glow */}
      <div
        className={cn(
          "absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-25",
          gradient
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg",
          gradient
        )}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-muted-fg mb-1">{title}</p>
      <span
        ref={valueRef}
        className="text-2xl font-bold text-foreground block"
      >
        {formatCurrency(value)}
      </span>

      {(change !== undefined || subtitle) && (
        <div className="flex items-center gap-2 mt-2">
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                isPositive
                  ? "text-emerald-400 bg-emerald-400/10"
                  : isNegative
                  ? "text-red-400 bg-red-400/10"
                  : "text-slate-400 bg-slate-400/10"
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : isNegative ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <Minus className="w-3 h-3" />
              )}
              {Math.abs(change).toFixed(1)}%
            </div>
          )}
          {subtitle && (
            <span className="text-xs text-slate-500">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
