"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

interface SpendingChartProps {
  data: { category: string; total: number }[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{payload[0].name}</p>
        <p className="text-sm font-bold text-white">{formatCurrency(payload[0].value)}</p>
        <p className="text-xs text-slate-400">{payload[0].payload.percent?.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

export default function SpendingChart({ data }: SpendingChartProps) {
  const total = data.reduce((sum, d) => sum + d.total, 0);
  const chartData = data.slice(0, 8).map((d) => ({
    ...d,
    percent: (d.total / total) * 100,
  }));

  return (
    <>
      <ResponsiveContainer width="100%" height="110%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="45%"
            outerRadius={90}
            innerRadius={55}
            paddingAngle={0}
            strokeWidth={0}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", paddingTop: "0px" }}
            formatter={(val) => <span style={{ color: "#94a3b8" }}>
              {val}  </span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
