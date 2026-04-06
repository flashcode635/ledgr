"use client";

import { useStore, CATEGORIES } from "@/store/useStore";
import { TransactionType } from "@/types/interfaces";
import { Category } from "@/types/types";
import { Search, X } from "lucide-react";

const inputClass =
  "bg-[color:var(--muted)] border border-[color:var(--card-border)] rounded-xl px-3.5 py-2 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-fg)] focus:outline-none focus:border-violet-500/60 transition-all";

const selectClass =
  "bg-[color:var(--muted)] border border-[color:var(--card-border)] rounded-xl px-3 py-2 text-sm text-[color:var(--foreground)] focus:outline-none focus:border-violet-500/60 transition-all cursor-pointer";

export default function FiltersBar() {
  const { filters, setFilters, transactions } = useStore();

  // Build unique months from all transactions
  const months = [...new Set(transactions.map((t) => t.date.slice(0, 7)))].sort().reverse();

  function clearFilters() {
    setFilters({ type: "all", category: "all", search: "", sort: "date-desc", month: "all" });
  }

  const hasActiveFilters =
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.search !== "" ||
    filters.month !== "all";

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          className={`${inputClass} w-full pl-10`}
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>

      {/* Type */}
      <select
        className={selectClass}
        value={filters.type}
        onChange={(e) => setFilters({ type: e.target.value as "all" | TransactionType })}
      >
        <option value="all" className="bg-slate-800">All Types</option>
        <option value="income" className="bg-slate-800">Income</option>
        <option value="expense" className="bg-slate-800">Expense</option>
      </select>

      {/* Category */}
      <select
        className={selectClass}
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value as "all" | Category })}
      >
        <option value="all" className="bg-slate-800">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c} className="bg-slate-800">{c}</option>
        ))}
      </select>

      {/* Month */}
      <select
        className={selectClass}
        value={filters.month}
        onChange={(e) => setFilters({ month: e.target.value })}
      >
        <option value="all" className="bg-slate-800">All Months</option>
        {months.map((m) => {
          const [year, month] = m.split("-");
          const label = new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
          });
          return (
            <option key={m} value={m} className="bg-slate-800">{label}</option>
          );
        })}
      </select>

      {/* Sort */}
      <select
        className={selectClass}
        value={filters.sort}
        onChange={(e) => setFilters({ sort: e.target.value as any })}
      >
        <option value="date-desc" className="bg-slate-800">Newest First</option>
        <option value="date-asc" className="bg-slate-800">Oldest First</option>
        <option value="amount-desc" className="bg-slate-800">Highest Amount</option>
        <option value="amount-asc" className="bg-slate-800">Lowest Amount</option>
      </select>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-white/10"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
