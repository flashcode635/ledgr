import { Category, Role, Theme } from "./types";

export type TransactionType = "income" | "expense";




export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO string
  note?: string;
}

export interface Filters {
  type: "all" | TransactionType;
  category: "all" | Category;
  search: string;
  sort: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
  month: string; // "YYYY-MM" or "all"
}

export interface StoreState {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  filters: Filters;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Partial<Omit<Transaction, "id">>) => void;
  deleteTransaction: (id: string) => void;
  setRole: (role: Role) => void;
  setTheme: (theme: Theme) => void;
  setFilters: (f: Partial<Filters>) => void;
}