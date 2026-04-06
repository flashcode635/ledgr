"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface BalanceChartProps {
  data: { label: string; balance: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function BalanceChart({ data }: BalanceChartProps) {
  // Build running balance
  let running = 0;
  const chartData = data.map((d) => {
    running += d.balance;
    return { ...d, runningBalance: running };
  });

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="label"
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="runningBalance"
          stroke="#8B5CF6"
          strokeWidth={2.5}
          fill="url(#balanceGradient)"
          dot={false}
          activeDot={{ r: 5, fill: "#8B5CF6", stroke: "white", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
