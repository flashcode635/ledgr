"use client";

import { useMemo } from "react";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import {
  calcBalance,
  calcIncome,
  calcExpenses,
  getMonthlyData,
  getCategoryBreakdown,
} from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import HorizontalChart from "@/components/charts/horizontalChart";
import BalanceChart from "@/components/charts/BalanceChart";

export default function AdminInsightsPage() {
  const { transactions } = useStore();

  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(transactions),
    [transactions]
  );

  const totalBalance = calcBalance(transactions);
  const totalIncome = calcIncome(transactions);
  const totalExpenses = calcExpenses(transactions);

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

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="space-y-6 max-w-7xl px-6 py-6 bg-background">
      <div className="rounded-2xl border border-(--card-border) bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">Admin Insights</p>
            <p className="text-xs text-muted-fg">Charts and business metrics for your admin view.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Net Balance"
          value={totalBalance}
          icon={<Wallet className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-violet-500 to-purple-700"
        />
        <StatCard
          title="Income"
          value={totalIncome}
          icon={<TrendingUp className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          change={incomePct}
          subtitle="vs prev month"
        />
        <StatCard
          title="Expenses"
          value={totalExpenses}
          icon={<TrendingDown className="w-5 h-5" />}
          gradient="bg-gradient-to-br from-pink-500 to-rose-600"
          change={expensePct}
          subtitle="vs prev month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-2xl border border-(--card-border) bg-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-3">Income vs Expenses</h3>
          <div className="h-56 w-full">
            <IncomeExpenseChart data={monthly} />
          </div>
        </div>
        <div className="lg:col-span-2 rounded-2xl border border-(--card-border) bg-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-3">Expense Breakdown</h3>
          <div className="h-56 w-full">
            <HorizontalChart data={categoryBreakdown} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-(--card-border) bg-card p-5">
        <h3 className="text-base font-semibold text-foreground mb-3">Balance Trend</h3>
        <div className="h-56 w-full">
          <BalanceChart data={monthly} />
        </div>
      </div>
    </div>
  );
}
