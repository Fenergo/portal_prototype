import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Credit', appetite: 85, actual: 72, status: 'good' },
  { name: 'Market', appetite: 70, actual: 78, status: 'warning' },
  { name: 'Op Risk', appetite: 60, actual: 55, status: 'good' },
  { name: 'Liquidity', appetite: 90, actual: 88, status: 'good' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl space-y-1">
        <p className="font-semibold">{payload[0]?.payload?.name}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RiskAppetiteWidget() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const breaches = data.filter(d => d.actual > d.appetite).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{breaches}</span>
          <span className="text-[11px] text-slate-400 font-medium">{breaches === 1 ? 'breach' : 'breaches'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="text-[10px] text-slate-400">Appetite</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#21CFB2]" />
            <span className="text-[10px] text-slate-400">Actual</span>
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="25%"
            barGap={2}
            onMouseMove={(e) => e?.activeTooltipIndex !== undefined && setActiveIndex(e.activeTooltipIndex)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar dataKey="appetite" fill="#E2E8F0" radius={[4, 4, 4, 4]} name="Appetite">
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                />
              ))}
            </Bar>
            <Bar dataKey="actual" radius={[4, 4, 4, 4]} name="Actual">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.actual > entry.appetite ? '#EF4444' : '#21CFB2'}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
