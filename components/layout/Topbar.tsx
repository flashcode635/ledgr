"use client";

import { usePathname } from "next/navigation";
import { Bell, User, Shield, Eye, Sun, Moon } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function Topbar() {
  const pathname = usePathname();
  const { role, theme, setTheme } = useStore();
  const title =
    pathname === "/"
      ? "Home"
      : pathname.endsWith("/transactions")
      ? "Transactions"
      : pathname.endsWith("/insights")
      ? "Insights"
      : pathname.endsWith("/dashboard") || pathname === "/admin" || pathname === "/user"
      ? "Dashboard"
      : "Ledgr";
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-(--card)/95 backdrop-blur-xl border-b border-(--card-border)">
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        <p className="text-xs text-muted-fg mt-0.5">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Role badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
            role === "Admin"
              ? "bg-violet-500/15 border-violet-500/30 text-violet-300"
              : "bg-slate-500/15 border-slate-500/30 text-slate-300"
          }`}
        >
          {role === "Admin" ? (
            <Shield className="w-3.5 h-3.5" />
          ) : (
            <Eye className="w-3.5 h-3.5" />
          )}
          {role}
        </div>

        {/* Theme switch */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          {theme === "dark" ? (
            <Sun className="w-4.5 h-4.5" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/20 cursor-pointer">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}
