"use client"
import { useCounter } from "@/hooks/useCounter";
import { Shield } from "lucide-react"

export const BadgeOne = () => {
    
  const counter1 = useCounter(12, 1800);
    return(
        <>
             <div ref={counter1.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Shield className="w-5 h-5 text-violet-600" />
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-serif, 'Georgia', serif)" }}>
                  SIPC/FINRA
                </h3>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Verified Membership
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Your assets are protected under the highest regulatory standards
                in the finance industry.
              </p>
            </div>
        </>
    )
}