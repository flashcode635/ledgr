

"use client";

import Link from "next/link";
import { Shield, Eye, ArrowRight, Wallet } from "lucide-react";
import Image from "next/image";
import image from "@/public/image.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 p-1 rounded-xl bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Image src={image} alt="Ledgr" style={{ objectFit: 'fill', borderRadius: "12px" }} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Ledgr</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Take Control of Your <span className="bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Finances</span>
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              Manage your money with confidence and clarity
            </p>
            <p className="text-slate-400">
              Choose your role to get started
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Admin Card */}
            <Link
              href="/admin/dashboard"
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30 hover:border-violet-400/60 transition-all duration-300 p-8 hover:shadow-2xl hover:shadow-violet-600/30"
            >
              <div className="absolute inset-0 bg-linear-to-br from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-violet-500/50 transition-all">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Admin</h2>
                <p className="text-slate-300 mb-6">
                  Full access to manage transactions, view insights, and control the system.
                </p>
                <div className="flex items-center text-violet-400 group-hover:text-violet-300 transition-colors">
                  <span>Enter as Admin</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* User Card */}
            <Link
              href="/user/dashboard"
              className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 p-8 hover:shadow-2xl hover:shadow-blue-600/30"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Viewer</h2>
                <p className="text-slate-300 mb-6">
                  View your transactions, analyze the  insights, and track your overall spendings.
                </p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span>Enter as Viewer</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <p className="text-slate-400 text-sm mb-6 text-center uppercase tracking-widest">
              Why Choose Ledgr
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-violet-400 font-semibold mb-2">📊 Analytics</div>
                <p className="text-sm text-slate-300">
                  Get detailed insights into your spending patterns
                </p>
              </div>
              <div>
                <div className="text-violet-400 font-semibold mb-2">🔐 Secure</div>
                <p className="text-sm text-slate-300">
                  Your financial data is safe and encrypted
                </p>
              </div>
              <div>
                <div className="text-violet-400 font-semibold mb-2">⚡ Fast</div>
                <p className="text-sm text-slate-300">
                  Quick access to all your financial information
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-slate-500 text-sm border-t border-white/10">
        <p>© 2026 Ledgr. Manage your finances with confidence.</p>
      </footer>
    </div>
  );
}
