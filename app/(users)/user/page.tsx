import { redirect } from "next/navigation";

export default function UserPage() {
  redirect("/user/dashboard");
}
//       <div className="rounded-2xl bg-linear-to-r from-violet-600/20 via-purple-600/10 
//       to-transparent border border-violet-500/20 p-6 flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-foreground">
//             Good {getGreeting()}, User 👋
//           </h2>
//           <p className="text-muted-fg text-sm mt-1">
//             Here's what's happening with your finances today.
//           </p>
//         </div>
//         <div className="hidden sm:flex items-center gap-3">
//           <div className="text-right">
//             <p className="text-xs text-muted-fg mb-0.5">Net Worth</p>
//             <p
//               className={`text-xl font-bold ${
//                 totalBalance >= 0 ? "text-emerald-400" : "text-red-400"
//               }`}
//             >
//               {formatCurrency(totalBalance)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ── Stat Cards ─────────────────────────────────────── */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
//         <StatCard
//           title="Total Balance"
//           value={totalBalance}
//           icon={<Wallet className="w-5 h-5" />}
//           gradient="bg-gradient-to-br from-violet-500 to-purple-700"
//           subtitle="All time"
//           delay={0}
//         />
//         <StatCard
//           title="Income (This Month)"
//           value={curIncome}
//           icon={<TrendingUp className="w-5 h-5" />}
//           gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
//           change={incomePct}
//           subtitle="vs last month"
//           delay={0.1}
//         />
//         <StatCard
//           title="Expenses (This Month)"
//           value={curExpenses}
//           icon={<TrendingDown className="w-5 h-5" />}
//           gradient="bg-gradient-to-br from-pink-500 to-rose-600"
//           change={expensePct}
//           subtitle={`Savings rate: ${savingsRate.toFixed(0)}%`}
//           delay={0.2}
//         />
//       </div>

//       {/* ── Charts Row ─────────────────────────────────────── */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
//         {/* Balance Trend (wider) */}
//         <div className="lg:col-span-3 rounded-2xl surface border border-(--card-border) p-5">
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <h3 className="text-base font-semibold text-foreground">Balance Trend</h3>
//               <p className="text-xs text-muted-fg mt-0.5">Running balance over time</p>
//             </div>
//           </div>
//           <div className="h-56 min-h-50 w-full">
//             <BalanceChart data={monthly} />
//           </div>
//         </div>

//         {/* Spending by Category (narrower) */}
//         <div className="lg:col-span-2 rounded-2xl surface border border-(--card-border) p-5">
//           <div className="mb-2">
//             <h3 className="text-base font-semibold text-foreground">Spending Breakdown</h3>
//             <p className="text-xs text-muted-fg mt-0.5">By category (all time)</p>
//           </div>
//           <div className="h-54 mt-4 min-h-50 w-full">
//             <SpendingChart data={categoryBreakdown} />
//           </div>
//         </div>
//       </div>

//       {/* ── Recent Transactions ────────────────────────────── */}
//       <div className="rounded-2xl surface border border-(--card-border) p-5">
//         <div className="flex items-center justify-between mb-5">
//           <div>
//             <h3 className="text-base font-semibold text-foreground">Recent Transactions</h3>
//             <p className="text-xs text-muted-fg mt-0.5">Latest 6 entries</p>
//           </div>
//           {/* <div
//             className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
//           >
//             View all <ArrowRight className="w-3.5 h-3.5" />
//           </div> */}
//         </div>

//         <div className="space-y-2">
//           {recentTxs.map((tx) => {
//             const isIncome = tx.type === "income";
//             return (
//               <div
//                 key={tx.id}
//                 className="flex items-center gap-3 p-3 rounded-xl hover:bg-(--muted)/70 transition-colors group"
//               >
//                 <div
//                   className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
//                     isIncome
//                       ? "bg-emerald-500/15 text-emerald-400"
//                       : "bg-violet-500/15 text-violet-400"
//                   }`}
//                 >
//                   {isIncome ? (
//                     <ArrowUpRight className="w-4 h-4" />
//                   ) : (
//                     <ArrowDownLeft className="w-4 h-4" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-foreground truncate">{tx.title}</p>
//                   <p className="text-xs text-muted-fg">{formatDate(tx.date)}</p>
//                 </div>
//                 <div className="text-right shrink-0">
//                   <p
//                     className={`text-sm font-semibold ${
//                       isIncome ? "text-emerald-400" : "text-foreground"
//                     }`}
//                   >
//                     {isIncome ? "+" : "-"}{formatCurrency(tx.amount)}
//                   </p>
//                   <p className="text-xs text-muted-fg">{tx.category}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}