"use client"
import { useCounter } from "@/hooks/useCounter";
import { Lock } from "lucide-react"

export const BadgeTwo = () => {
const counter2 = useCounter(256, 1800);
    return(
        <>
             <div ref={counter2.ref}>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Lock className="w-5 h-5 text-violet-600" />
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-serif, 'Georgia', serif)" }}>
                  {counter2.value}-Bit
                </h3>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Institutional-Grade Security
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Military-grade encryption and multi-layer authorization for
                every transaction within your estate.
              </p>
            </div>
        </>
    )
}