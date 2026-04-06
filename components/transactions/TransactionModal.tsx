"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import type { Transaction, TransactionType } from "@/types/interfaces";
import type { Category } from "@/types/types";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction; // if editing
}

const inputClass =
  "w-full bg-[color:var(--muted)] border border-[color:var(--card-border)] rounded-xl px-4 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted-fg)] focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all";

const labelClass = "block text-sm font-medium text-[color:var(--muted-fg)] mb-1.5";

export default function TransactionModal({
  open,
  onClose,
  transaction,
}: TransactionModalProps) {
  const isEditing = !!transaction;
  const { addTransaction, editTransaction } = useStore();

  const [form, setForm] = useState({
    title: transaction?.title ?? "",
    amount: transaction?.amount?.toString() ?? "",
    type: transaction?.type ?? ("expense" as TransactionType),
    category: transaction?.category ?? ("Food" as Category),
    date: transaction?.date ?? new Date().toISOString().split("T")[0],
    note: transaction?.note ?? "",
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const availableCategories =
    form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = "Enter a valid positive amount";
    if (!form.date) errs.date = "Date is required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const data = {
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      note: form.note,
    };

    if (isEditing && transaction) {
      editTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  }

  function handleTypeChange(type: TransactionType) {
    const defaultCat = type === "income" ? "Salary" : "Food";
    setForm((f) => ({ ...f, type, category: defaultCat }));
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-(--card-border) rounded-2xl shadow-2xl py-4 px-6 p z-10 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {isEditing ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="text-xs text-muted-fg mt-0.5">
              {isEditing ? "Update the transaction details" : "Record a new transaction"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white
             hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Type toggle */}
          <div>
            <label className={labelClass}>Type</label>
            <div className="flex gap-2 p-1 bg-(--option) rounded-xl border border-white/10">
              {(["expense", "income"] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={cn(
                    "flex-1 py-1 px-4 rounded-lg text-sm font-medium capitalize transition-all",
                    form.type === t
                      ? t === "income"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-violet-500/20 text-(--income-text) border border-violet-500/30"
                      : "text-foreground hover:bg-(--frg-hover) "
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={labelClass}>Title *</label>
            <input
              className={cn(inputClass, errors.title && "border-red-500/50")}
              placeholder="e.g. Grocery run"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            {errors.title && (
              <p className="text-xs text-red-400 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Amount + Category row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Amount *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                <input
                  className={cn(inputClass, "pl-7", errors.amount && "border-red-500/50")}
                  placeholder="0.00"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value as Category }))
                }
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c} className="bg-slate-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={labelClass}>Date *</label>
            <input
              type="date"
              className={cn(inputClass, errors.date && "border-red-500/50")}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            {errors.date && (
              <p className="text-xs text-red-400 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className={labelClass}>Note (optional)</label>
            <textarea
              className={cn(inputClass, "h-20 resize-none")}
              placeholder="Any additional details..."
              value={form.note}
              onChange={(e) =>
                setForm((f) => ({ ...f, note: e.target.value }))
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
             bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold 
             transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            {isEditing ? "Save Changes" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
