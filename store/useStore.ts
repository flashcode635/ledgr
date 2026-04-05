import { MOCK_TRANSACTIONS } from "@/lib/transactions";
import { StoreState } from "@/types/interfaces";
import { Category } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      role: "Admin",
      theme: "dark",
      filters: {
        type: "all",
        category: "all",
        search: "",
        sort: "date-desc",
        month: "all",
      },
      addTransaction: (t) =>
        set((s) => ({
          transactions: [{ ...t, id: generateId() }, ...s.transactions],
        })),
      editTransaction: (id, t) =>
        set((s) => ({
          transactions: s.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...t } : tx
          ),
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((tx) => tx.id !== id),
        })),
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setFilters: (f) =>
        set((s) => ({ filters: { ...s.filters, ...f } })),
    }),
    {
      name: "ledgr-storage",
    }
  )
);

export const CATEGORIES: Category[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Utilities",
  "Education",
  "Other",
];

export const INCOME_CATEGORIES: Category[] = ["Salary", "Freelance", "Investment"];
export const EXPENSE_CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Utilities",
  "Education",
  "Other",
];
