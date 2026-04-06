"use client";

import { useMemo, useState } from "react";
import { Shield, Plus, Download } from "lucide-react";
import { useStore } from "@/store/useStore";
import { calcBalance, calcIncome, calcExpenses, getMonthlyData, getCategoryBreakdown, formatCurrency } from "@/lib/utils";
import FiltersBar from "@/components/transactions/FiltersBar";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionModal from "@/components/transactions/TransactionModal";

export default function AdminTransactionsPage() {
  const { transactions, filters, role } = useStore();
  const [addOpen, setAddOpen] = useState(false);

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  const totalBalance = calcBalance(transactions);
  const totalIncome = calcIncome(transactions);
  const totalExpenses = calcExpenses(transactions);

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

  const isAdmin = role === "Admin";

  return (
    <div className="space-y-6 max-w-7xl px-6 py-6 bg-background">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--card-border) bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Admin Transactions</p>
            <p className="text-xs text-muted-fg">View, filter, export, and manage all transactions.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          {isAdmin && (
            <button
              onClick={() => setAddOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-(--card-border) bg-card p-5">
        <FiltersBar />
        <div className="mt-4">
          <TransactionTable transactions={filtered} />
        </div>
      </div>

      <TransactionModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
