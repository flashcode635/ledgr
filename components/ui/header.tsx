"use client"

import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { Button } from "./buttons";
import Image from "next/image";
import logo from "@/public/logo.png";


export const Header = () => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);   
const [scrolled, setScrolled] = useState(false);
 useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
    return (
        <>
             <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-md shadow-violet-500/20 p-0.5">
              <Image src={logo} alt="Ledgr" width={28} height={28} style={{ borderRadius: "6px" }} />
            </div>
            <span className="text-[1.15rem] font-bold tracking-tight text-slate-900">
              Ledgr
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Dashboard", href: "/admin/dashboard" },
              { label: "Transactions", href: "/admin/transactions" },
              { label: "Insights", href: "/admin/insights" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors duration-200 rounded-lg hover:bg-violet-50"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/user/dashboard"
              className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link href="/admin/dashboard">
              <Button variant="solid" size="md">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-2 shadow-lg">
            {[
              { label: "Dashboard", href: "/admin/dashboard" },
              { label: "Transactions", href: "/admin/transactions" },
              { label: "Insights", href: "/admin/insights" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 flex gap-3">
              <Link href="/user/dashboard" className="flex-1 text-center text-sm font-medium py-2.5 text-slate-600 border border-slate-200 rounded-lg hover:border-violet-300 transition-colors">Sign in</Link>
              <Link href="/admin/dashboard" className="flex-1">
                <Button layout="full" variant="solid" className="py-2.5 justify-center">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
        </>
    )
}