"use client";

import { useState } from "react";
import { Edit2, Trash2, MoreVertical, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import TransactionModal from "./TransactionModal";
import { Transaction } from "@/types/interfaces";

const CATEGORY_COLORS: Record<string, string> = {
  Salary: "text-emerald-400 bg-emerald-400/10",
  Freelance: "text-teal-400 bg-teal-400/10",
  Investment: "text-blue-400 bg-blue-400/10",
  Food: "text-orange-400 bg-orange-400/10",
  Transport: "text-yellow-400 bg-yellow-400/10",
  Housing: "text-purple-400 bg-purple-400/10",
  Entertainment: "text-pink-400 bg-pink-400/10",
  Healthcare: "text-red-400 bg-red-400/10",
  Shopping: "text-indigo-400 bg-indigo-400/10",
  Utilities: "text-cyan-400 bg-cyan-400/10",
  Education: "text-violet-400 bg-violet-400/10",
  Other: "text-slate-400 bg-slate-400/10",
};

interface TransactionRowProps {
  transaction: Transaction;
  isAdmin: boolean;
}

function TransactionRow({ transaction: tx, isAdmin }: TransactionRowProps) {
  const { deleteTransaction } = useStore();
  const [editOpen, setEditOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isIncome = tx.type === "income";

  return (
    <>
      <tr className="table-row-hover border-b border-white/5 transition-colors group">
        {/* Icon + Title */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                isIncome
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-violet-500/15 text-violet-400"
              )}
            >
              {isIncome ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownLeft className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground leading-tight">{tx.title}</p>
              {tx.note && (
                <p className="text-xs text-muted-fg mt-0.5 truncate max-w-48">{tx.note}</p>
              )}
            </div>
          </div>
        </td>

        {/* Category */}
        <td className="px-5 py-4 hidden md:table-cell">
          <span
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full",
              CATEGORY_COLORS[tx.category] ?? "text-slate-400 bg-slate-400/10"
            )}
          >
            {tx.category}
          </span>
        </td>

        {/* Date */}
        <td className="px-5 py-4 hidden sm:table-cell text-sm text-slate-400">
          {formatDate(tx.date)}
        </td>

        {/* Amount */}
        <td className="px-5 py-4 text-right">
          <span
            className={cn(
              "text-sm font-semibold",
              isIncome ? "text-emerald-400" : "text-foreground"
            )}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(tx.amount)}
          </span>
        </td>

        {/* Actions (Admin only) */}
        {isAdmin && (
          <td className="px-5 py-4 text-right">
            <div className="relative inline-block">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-20 min-w-36 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <button
                      onClick={() => { setEditOpen(true); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-fg hover:text-foreground hover:bg-white/8 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => { deleteTransaction(tx.id); setMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </td>
        )}
      </tr>

      <TransactionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        transaction={tx}
      />
    </>
  );
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const { role } = useStore();
  const isAdmin = role === "Admin";

  if (transactions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto mb-4">
          <ArrowLeftRight className="w-7 h-7 text-slate-600" />
        </div>
        <p className="text-slate-400 font-medium">No transactions found</p>
        <p className="text-sm text-slate-600 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/8">
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-fg uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-fg uppercase tracking-wider hidden md:table-cell">
              Category
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-muted-fg uppercase tracking-wider hidden sm:table-cell">
              Date
            </th>
            <th className="px-5 py-3 text-right text-xs font-semibold text-muted-fg uppercase tracking-wider">
              Amount
            </th>
            {isAdmin && (
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} isAdmin={isAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Need this import at component level
function ArrowLeftRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );
}
