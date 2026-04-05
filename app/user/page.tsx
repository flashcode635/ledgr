"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ShieldOff,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import {
  calcBalance,
  calcIncome,
  calcExpenses,
  getMonthlyData,
  getCategoryBreakdown,
  formatCurrency,
  formatDate,
  getMonthKey,
} from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import BalanceChart from "@/components/charts/BalanceChart";
import SpendingChart from "@/components/charts/SpendingChart";

export default function UserPage() {
  const { transactions, role } = useStore();

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(transactions),
    [transactions]
  );

  const totalBalance = calcBalance(transactions);
  const totalIncome = calcIncome(transactions);
  const totalExpenses = calcExpenses(transactions);
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // This month
  const thisMonthKey = getMonthKey(new Date().toISOString());
  // Use latest month from data as fallback
  const latestMonth = monthly.length > 0 ? monthly[monthly.length - 1].month : thisMonthKey;
  const displayMonth = transactions.some((t) => t.date.startsWith(thisMonthKey))
    ? thisMonthKey
    : latestMonth;

  const monthTxs = transactions.filter((t) => t.date.startsWith(displayMonth));
  const monthIncome = calcIncome(monthTxs);
  const monthExpenses = calcExpenses(monthTxs);

  // Last 5 transactions
  const recentTxs = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  // Top spending category
  const topCategory = categoryBreakdown[0];

  return (
    <div className="space-y-8 w-full px-20 py-5 overflow-x-hidden">

      {/* ── Role Notice ─────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
        <Eye className="w-4 h-4 shrink-0" />
        <span>
          You're in <strong>Viewer mode</strong>. You can browse all financial data
          but cannot add, edit, or delete transactions.
        </span>
      </div>

      {/* ── Summary Banner ─────────────────────────────────── */}
      <div className="rounded-2xl bg-linear-to-r from-violet-600/20 via-purple-600/10 to-transparent border border-violet-500/20 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400 mb-1">Your total net worth</p>
            <p
              className={`text-4xl font-bold ${
                totalBalance >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {formatCurrency(totalBalance)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Across {transactions.length} transactions
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-0.5">Savings Rate</p>
              <p className="text-xl font-bold text-violet-400">
                {savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Net Balance"
          value={totalBalance}
          icon={<Wallet className="w-5 h-5" />}
          gradient="bg-linear-to-br from-violet-500 to-purple-700"
          delay={0}
        />
        <StatCard
          title="Total Income"
          value={totalIncome}
          icon={<TrendingUp className="w-5 h-5" />}
          gradient="bg-linear-to-br from-emerald-500 to-teal-600"
          delay={0.1}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon={<TrendingDown className="w-5 h-5" />}
          gradient="bg-linear-to-br from-pink-500 to-rose-600"
          delay={0.2}
        />
      </div>

      {/* ── Charts ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <h3 className="text-base font-semibold text-white mb-1">Balance Over Time</h3>
          <p className="text-xs text-slate-500 mb-4">Cumulative running balance</p>
          <div className="h-56">
            <BalanceChart data={monthly} />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <h3 className="text-base font-semibold text-white mb-1">Spending by Category</h3>
          <p className="text-xs text-slate-500">All-time breakdown</p>
          <div className="h-56">
            <SpendingChart data={categoryBreakdown} />
          </div>
        </div>
      </div>

      {/* ── This Month Snapshot + Top Category ─────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* This Month */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-semibold text-white">Latest Month Snapshot</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <span className="text-sm text-slate-400">Income</span>
              <span className="text-sm font-semibold text-emerald-400">
                +{formatCurrency(monthIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-white/5">
              <span className="text-sm text-slate-400">Expenses</span>
              <span className="text-sm font-semibold text-slate-200">
                -{formatCurrency(monthExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-sm text-slate-400">Net</span>
              <span
                className={`text-sm font-bold ${
                  monthIncome - monthExpenses >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {formatCurrency(monthIncome - monthExpenses)}
              </span>
            </div>
          </div>
        </div>

        {/* Top Spending Category */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldOff className="w-4 h-4 text-pink-400" />
            <h3 className="text-base font-semibold text-white">Top Spending Areas</h3>
          </div>
          <div className="space-y-3">
            {categoryBreakdown.slice(0, 4).map((cat, i) => {
              const pct =
                totalExpenses > 0
                  ? (cat.total / totalExpenses) * 100
                  : 0;
              return (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{cat.category}</span>
                    <span className="text-slate-400">{pct.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-500 to-purple-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Recent Transactions ────────────────────────────── */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/8 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-white">Recent Transactions</h3>
          <Link
            href="/transactions"
            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {recentTxs.map((tx) => {
            const isIncome = tx.type === "income";
            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/4 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isIncome
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-violet-500/15 text-violet-400"
                  }`}
                >
                  {isIncome ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{tx.title}</p>
                  <p className="text-xs text-slate-500">{formatDate(tx.date)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-semibold ${
                      isIncome ? "text-emerald-400" : "text-slate-200"
                    }`}
                  >
                    {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-slate-500">{tx.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
