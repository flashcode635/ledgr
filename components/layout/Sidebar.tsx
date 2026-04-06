"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Shield,
  Eye,
  Sun,
  Moon,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import image from "@/public/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/buttons";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, setRole, theme, setTheme } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract base path from current pathname, not from role state
  const pathSegments = pathname.split("/").filter(Boolean);
  const basePath = (pathSegments[0] === "admin" || pathSegments[0] === "user") ? `/${pathSegments[0]}` : (role === "Admin" ? "/admin" : "/user");
  const currentSection = pathSegments[1] || "dashboard";
  const navLinks = [
    { href: `${basePath}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `${basePath}/transactions`, label: "Transactions", icon: ArrowLeftRight },
    { href: `${basePath}/insights`, label: "Insights", icon: BarChart3 },
  ];

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleRole = () => {
    const nextRole = role === "Admin" ? "Viewer" : "Admin";
    setRole(nextRole);
    const nextRoute = nextRole === "Admin" ? "/admin" : "/user";
    const section = currentSection === "admin" || currentSection === "user" ? "dashboard" : currentSection;
    router.push(`${nextRoute}/${section}`);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5.25 border-b border-white/10 bg-background">
        <div className="w-9 h-9 p-1 rounded-xl bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">

          <Image src={image} alt="description" style={{ objectFit: 'fill', borderRadius: "12px" }} />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">Ledgr</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 bg-background">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-violet-600/90 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/8"
              )}
            >
              <Icon
                className={cn(
                  "w-4.5 h-4.5 transition-colors",
                  active ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Controls */}
      <div className="px-3 py-5 border-t border-white/10 space-y-2 bg-background">
        {/* Role switcher */}
        {/* <button
          onClick={toggleRole}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            {role === "Admin" ? (
              <Shield className="w-4 h-4 text-violet-400" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-sm font-bold text-foreground">{role}</span>
          </div>
          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
            Switch
          </span>
        </button> */}
        <Button
          onClick={toggleRole}
          variant="ghost"
          size="md"
          layout="full"
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {role === "Admin" ? (
              <Shield className="w-4 h-4 text-violet-400" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-sm font-bold text-foreground">{role}</span>
          </div>
          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
            Switch
          </span>
        </Button>

        {/* Theme toggle */}
        {/* <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-sm font-bold text-foreground">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button> */}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="md"
          layout="full"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-400" />
          )}
          <span className="text-sm font-bold text-foreground">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-(--card)/95 backdrop-blur-xl border-r border-(--card-border) shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* Tablet Sidebar */}
      <aside className="hidden md:flex lg:hidden flex-col w-16 h-screen sticky top-0 bg-(--card)/95 backdrop-blur-xl border-r border-(--card-border) shrink-0 z-30">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center px-2 py-6 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  title={label}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-xl transition-all duration-200",
                    active
                      ? "bg-violet-600/90 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/8"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>
          <div className="px-2 py-4 border-t border-white/10 space-y-1 text-foreground ">
            {/* <button
              onClick={toggleRole}
              title={`Role: ${role}`}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              {role === "Admin" ? (
                <Shield className="w-4 h-4 text-violet-400" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-sm font-semibold">{role}</span>
            </button> */}
            <Button
              onClick={toggleRole}
              variant="ghost"
              size="md"
              layout="full"
              title={`Role: ${role}`}
              className="flex items-center justify-center gap-2"
            >
              {role === "Admin" ? (
                <Shield className="w-4 h-4 text-violet-400" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-sm font-semibold">{role}</span>
            </Button>
            {/* <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-400" />
              )}
            </button> */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="md"
              layout="full"
              title="Toggle Theme"
              className="flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        {/* <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-(--card)/90 backdrop-blur-sm border border-(--card-border) text-foreground"
        >
          <Menu className="w-5 h-5" />
        </button> */}
        <Button
          onClick={() => setMobileOpen(true)}
          variant="ghost"
          size="icon"
          layout="default"
          className="fixed top-4 left-4 z-50 bg-(--card)/90 backdrop-blur-sm border border-(--card-border) text-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Drawer */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-full w-72 z-50 bg-card border-r border-(--card-border) transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <SidebarContent />
        </aside>
      </div>
    </>
  );
}
