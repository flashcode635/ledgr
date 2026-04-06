"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { calcBalance, calcIncome, calcExpenses, getMonthlyData, getCategoryBreakdown, formatCurrency } from "@/lib/utils";
import FiltersBar from "@/components/transactions/FiltersBar";
import TransactionTable from "@/components/transactions/TransactionTable";

export default function UserTransactionsPage() {
  const { transactions, filters } = useStore();

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

  return (
    <div className="space-y-6 max-w-7xl px-6 py-6 bg-background">
      <div className="rounded-2xl border border-(--card-border) bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <span className="text-violet-400 font-semibold">TX</span>
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">My Transactions</p>
            <p className="text-xs text-muted-fg">Browse every transaction with filters and table view.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-(--card-border) bg-card p-5">
        <FiltersBar />
        <div className="mt-4">
          <TransactionTable transactions={filtered} />
        </div>
      </div>
    </div>
  );
}
