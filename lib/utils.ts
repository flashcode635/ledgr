import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import type { Transaction } from "@/types/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, sign = true): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));
  if (sign && amount < 0) return `-${formatted}`;
  return formatted;
}

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM dd, yyyy");
  } catch {
    return dateStr;
  }
}

export function formatMonth(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "MMM yyyy");
  } catch {
    return dateStr;
  }
}

export function getMonthKey(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "yyyy-MM");
  } catch {
    return "";
  }
}

export function getUniqueMonths(transactions: Transaction[]): string[] {
  const months = [...new Set(transactions.map((t) => getMonthKey(t.date)))];
  return months.sort().reverse();
}

export function calcBalance(transactions: Transaction[]): number {
  return transactions.reduce(
    (acc, t) => acc + (t.type === "income" ? t.amount : -t.amount),
    0
  );
}

export function calcIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
}

export function calcExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
}

export function getMonthlyData(transactions: Transaction[]) {
  const map: Record<string, { income: number; expense: number; balance: number }> = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!map[key]) map[key] = { income: 0, expense: 0, balance: 0 };
    if (t.type === "income") {
      map[key].income += t.amount;
      map[key].balance += t.amount;
    } else {
      map[key].expense += t.amount;
      map[key].balance -= t.amount;
    }
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      label: format(parseISO(month + "-01"), "MMM yy"),
      ...data,
    }));
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const map: Record<string, number> = {};
  expenses.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .map(([category, total]) => ({ category, total }));
}
