"use client";

import { useMemo, useState } from "react";
import {
  Shield,
  Plus,
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import {
  calcBalance,
  calcIncome,
  calcExpenses,
  getMonthlyData,
  getCategoryBreakdown,
  formatCurrency,
  getMonthKey,
} from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import SpendingChart from "@/components/charts/SpendingChart";
import BalanceChart from "@/components/charts/BalanceChart";
import TransactionTable from "@/components/transactions/TransactionTable";
import FiltersBar from "@/components/transactions/FiltersBar";
import TransactionModal from "@/components/transactions/TransactionModal";

export default function AdminPage() {
  const { transactions, filters, role } = useStore();
  const [addOpen, setAddOpen] = useState(false);

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(transactions),
    [transactions]
  );

  const totalBalance = calcBalance(transactions);
  const totalIncome = calcIncome(transactions);
  const totalExpenses = calcExpenses(transactions);

  // MoM stats
  const monthKeys = monthly.map((m) => m.month);
  const curMonth = monthKeys[monthKeys.length - 1] ?? "";
  const prevMonth = monthKeys[monthKeys.length - 2] ?? "";
  const curTxs = transactions.filter((t) => t.date.startsWith(curMonth));
  const prevTxs = transactions.filter((t) => t.date.startsWith(prevMonth));
  const curIncome = calcIncome(curTxs);
  const prevIncome = calcIncome(prevTxs);
  const curExpenses = calcExpenses(curTxs);
  const prevExpenses = calcExpenses(prevTxs);
  const incomePct = prevIncome ? ((curIncome - prevIncome) / prevIncome) * 100 : 0;
  const expensePct = prevExpenses ? ((curExpenses - prevExpenses) / prevExpenses) * 100 : 0;

  // Filtered transactions
  const filtered = useMemo(() => {
    let txs = [...transactions];
    if (filters.type !== "all") txs = txs.filter((t) => t.type === filters.type);
    if (filters.category !== "all") txs = txs.filter((t) => t.category === filters.category);
    if (filters.month !== "all") txs = txs.filter((t) => t.date.startsWith(filters.month));
    if (filters.search) {
      const q = filters.search.toLowerCase();
      txs = txs.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          (t.note ?? "").toLowerCase().includes(q)
      );
    }
    txs.sort((a, b) => {
      if (filters.sort === "date-desc") return b.date.localeCompare(a.date);
      if (filters.sort === "date-asc") return a.date.localeCompare(b.date);
      if (filters.sort === "amount-desc") return b.amount - a.amount;
      return a.amount - b.amount;
    });
    return txs;
  }, [transactions, filters]);

  // CSV export of filtered transactions
  function exportCSV() {
    const header = "ID,Title,Type,Category,Amount,Date,Note";
    const rows = filtered.map(
      (t) =>
        `${t.id},"${t.title}",${t.type},${t.category},${t.amount},${t.date},"${t.note ?? ""}"`
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ledgr-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Health alerts
  const highestExpense = categoryBreakdown[0];
  const savingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : 0;
  const avgMonthlyExpense =
    monthly.length > 0
      ? monthly.reduce((s, m) => s + m.expense, 0) / monthly.length
      : 0;

  const isAdmin = role === "Admin";

  return (
    <div className="space-y-5 max-w-7xl px-20 pt-10">

      {/* ── Admin Banner ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-linear-to-r from-violet-600/20 to-purple-900/10 border border-violet-500/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Control Panel</p>
            <p className="text-xs text-slate-400">
              Full access · {transactions.length} total transactions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          {isAdmin && (
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 border border-violet-500/50 transition-all shadow-lg shadow-violet-600/20"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Net Balance"
          value={totalBalance}
          icon={<Wallet className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
          delay={0}
        />
        <StatCard
          title="Total Income"
          value={totalIncome}
          icon={<TrendingUp className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          change={incomePct}
          subtitle="vs prev month"
          delay={0.08}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon={<TrendingDown className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          change={expensePct}
          subtitle="vs prev month"
          delay={0.16}
        />
        <StatCard
          title="Transactions"
          value={transactions.length}
          icon={<Activity className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
          subtitle={`${filtered.length} matching filters`}
          delay={0.24}
        />
      </div>

      {/* ── Charts Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <h3 className="text-base font-semibold text-white mb-1">Income vs Expenses</h3>
          <p className="text-xs text-slate-500 mb-5">Monthly comparison</p>
          <div className="h-56">
            <IncomeExpenseChart data={monthly} />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <h3 className="text-base font-semibold text-white mb-1">Expense Breakdown</h3>
          <p className="text-xs text-slate-500 mb-5">By category</p>
          <div className="h-56">
            <SpendingChart data={categoryBreakdown} />
          </div>
        </div>
      </div>

      {/* ── Balance Trend + Health Indicators ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <h3 className="text-base font-semibold text-white mb-1">Balance Trend</h3>
          <p className="text-xs text-slate-500 mb-5">Cumulative net over time</p>
          <div className="h-48">
            <BalanceChart data={monthly} />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/8 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-violet-400" />
            <h3 className="text-base font-semibold text-white">Financial Health</h3>
          </div>
          <div className="space-y-3">
            {/* Savings rate */}
            <HealthItem
              icon={
                savingsRate > 20 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )
              }
              label="Savings Rate"
              value={`${savingsRate.toFixed(1)}%`}
              status={savingsRate > 20 ? "good" : "warn"}
              hint={savingsRate > 20 ? "Healthy savings" : "Below 20% target"}
            />
            {/* Top expense category */}
            {highestExpense && (
              <HealthItem
                icon={<AlertTriangle className="w-4 h-4 text-pink-400" />}
                label="Highest Spend"
                value={highestExpense.category}
                status="warn"
                hint={formatCurrency(highestExpense.total) + " total"}
              />
            )}
            {/* Avg monthly expense */}
            <HealthItem
              icon={<Activity className="w-4 h-4 text-blue-400" />}
              label="Avg Monthly Expense"
              value={formatCurrency(avgMonthlyExpense)}
              status="info"
              hint={`Over ${monthly.length} months`}
            />
            {/* Total transactions */}
            <HealthItem
              icon={<CheckCircle2 className="w-4 h-4 text-violet-400" />}
              label="Total Transactions"
              value={`${transactions.length}`}
              status="good"
              hint={`${curTxs.length} this month`}
            />
          </div>
        </div>
      </div>

      {/* ── Transactions Management ─────────────────────────── */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/8 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-semibold text-white">All Transactions</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {filtered.length} of {transactions.length} shown
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
        </div>

        <FiltersBar />

        <div className="mt-4">
          <TransactionTable transactions={filtered} />
        </div>
      </div>

      {/* Add Transaction Modal */}
      <TransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

/* ── Health Item sub-component ──────────────────────────── */
function HealthItem({
  icon,
  label,
  value,
  status,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: "good" | "warn" | "info";
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/4 hover:bg-white/6 transition-colors">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
        {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}
