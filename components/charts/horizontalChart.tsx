"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

interface HorizontalChartProps {
  data: { category: string; total: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{payload[0].payload.category}</p>
        <p className="text-sm font-semibold text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function HorizontalChart({ data }: HorizontalChartProps) {
  const chartData = data
    .slice(0, 8)
    .sort((a, b) => b.total - a.total)
    .map((item) => ({ ...item }));

  return (
    <ResponsiveContainer width="100%" aspect={1.3}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis
          type="number"
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <YAxis
          dataKey="category"
          type="category"
          width={120}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
        <Bar dataKey="total" radius={[10, 10, 10, 10]} barSize={16}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
