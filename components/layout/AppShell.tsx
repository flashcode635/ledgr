"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useStore((s) => s.theme);

  // Sync theme to html data attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}
