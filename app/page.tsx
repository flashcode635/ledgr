"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Clock,
  ChevronRight,
  Lock,
  Eye,
  Layers,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   Animated counter hook
   ────────────────────────────────────────────── */
function useCounter(end: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setValue(end);
              clearInterval(timer);
            } else {
              setValue(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { value, ref };
}

/* ──────────────────────────────────────────────
   Landing Page
   ────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const counter1 = useCounter(12, 1800);
  const counter2 = useCounter(256, 1800);

  return (
    <div className="min-h-screen bg-cream text-slate-900" style={{ fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)" }}>
      {/* ────────── Navigation ────────── */}
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
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-slate-700 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
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

      {/* ────────── Hero Section ────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-bl from-violet-100/60 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-blue-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                Premier Asset Management
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6">
                The Digital{" "}
                <span
                  className="italic bg-linear-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-serif, 'Georgia', serif)" }}
                >
                  Atelier
                </span>{" "}
                of Your Wealth.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-8">
                Refined financial management for the discerning investor.
                Ledgr transforms complex market data into curated narratives of
                your financial legacy.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/admin/dashboard">
                  <Button variant="solid" size="lg" className="group">
                    Explore Admin Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/user/dashboard">
                  <Button variant="ghost" size="lg" className="group text-slate-700 hover:text-violet-600 border-2 border-slate-300 bg-transparent hover:bg-transparent px-2">
                    User Dashboard
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right — Hero Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-slate-100">
                <Image
                  src="/hero-cityscape.png"
                  alt="Futuristic financial cityscape"
                  width={640}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-100 px-5 py-4 flex items-center gap-4 animate-[float_3s_ease-in-out_infinite]">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Total Return</p>
                  <p className="text-lg font-bold text-emerald-600">+12.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Curated Intelligence ────────── */}
      <section className="py-20 md:py-28 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Curated Intelligence
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A suite of Ledgr-built tools designed to provide clarity across
              your entire financial portfolio.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 — Portfolio Intelligence */}
            <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
              <div className="p-7 pb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Intelligence</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Unified visibility across all portfolios, equities, and
                  entities within a single editorial frame.
                </p>
              </div>
              <div className="px-7 pb-7">
                <div className="rounded-xl overflow-hidden border border-slate-100">
                  <Image
                    src="/portfolio-dashboard.png"
                    alt="Portfolio dashboard"
                    width={560}
                    height={300}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Card 2 — Financial Performance (accent card) */}
            <div className="group bg-linear-to-br from-violet-600 to-purple-700 rounded-2xl overflow-hidden text-white hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-300">
              <div className="p-7">
                <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Financial Performance Insights
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Predictive modeling and attribution analysis rendered with
                  mathematical precision.
                </p>
                {/* Mini chart visual */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex items-end justify-between gap-2 h-24 mb-3">
                    {[40, 65, 45, 80, 60, 90, 70, 95, 75, 85, 92, 78].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-white/30 group-hover:bg-white/50 transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            transitionDelay: `${i * 40}ms`,
                          }}
                        />
                      )
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Net Annualized</span>
                    <span className="text-sm font-bold text-emerald-300">
                      +8.9%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — The Sovereign Ledger (full width) */}
            <div className="md:col-span-2 group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-4">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">The Sovereign Ledger</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    The ultimate source of truth for your wealth. Every
                    transaction, asset movement, and portfolio rebalance
                    documented in a high-fidelity permanent record.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-violet-500" />
                      Immutable historical logging
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      Automated reconciliation
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/asset-management.png"
                    alt="Asset management"
                    width={560}
                    height={360}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Trust Badges ────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-3 gap-10 lg:gap-16 text-center">
            {/* Badge 1 */}
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

            {/* Badge 2 */}
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

            {/* Badge 3 */}
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Eye className="w-5 h-5 text-violet-600" />
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-serif, 'Georgia', serif)" }}>
                  24/7
                </h3>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Concierge Surveillance
              </p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Proactive risk monitoring and fraud detection systems operating
                at the speed of the global markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── CTA Banner ────────── */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-serif, 'Georgia', serif)" }}>
                Experience the New Standard in Financial Editorial.
              </h2>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">
                Join an exclusive collective of high-net-worth individuals and
                family offices who prioritize clarity, authority, and aesthetic
                excellence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/admin/dashboard">
                  <Button variant="solid" size="lg" className="bg-white text-violet-700 hover:bg-slate-50 shadow-black/10 border-none hover:text-violet-800">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/user/dashboard">
                  <Button variant="outline" size="lg" className="text-white border-white/30 hover:border-white/60 hover:bg-white/10 bg-transparent">
                    User Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Footer ────────── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>

              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-purple-700 flex items-center justify-center p-0.5">
                  <Image src={logo} alt="Ledgr" width={24} height={24} style={{ borderRadius: "4px" }} />
                </div>
                <span className="text-sm font-bold text-slate-900">Ledgr</span>
              </div>
              <p className="text-center text-xs text-slate-400 mt-6">
              © 2026 Ledgr. The Digital Atelier of Wealth.
            </p>
            </div>
            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Editorial Standards",
                "Contact",
                "Press",
              ].map((label) => (
                <span
                  key={label}
                  className="hover:text-violet-600 cursor-pointer transition-colors"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </footer>

      {/* ────────── Global Inline Styles for Animations ────────── */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
