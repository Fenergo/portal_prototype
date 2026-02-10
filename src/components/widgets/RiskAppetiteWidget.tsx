import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { Badge } from '../ui/badge';

const data = [
  { name: 'Credit', appetite: 85, actual: 72, status: 'good' },
  { name: 'Market', appetite: 70, actual: 78, status: 'warning' },
  { name: 'Op Risk', appetite: 60, actual: 55, status: 'good' },
  { name: 'Liquid', appetite: 90, actual: 88, status: 'good' },
];

export function RiskAppetiteWidget() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} onMouseMove={(e) => e?.activeTooltipIndex !== undefined && setActiveIndex(e.activeTooltipIndex)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '11px' }} />
          <Bar dataKey="appetite" fill="var(--fenergo-accent)" radius={[4, 4, 0, 0]} name="Appetite">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} opacity={activeIndex === index || activeIndex === null ? 1 : 0.4} />
            ))}
          </Bar>
          <Bar dataKey="actual" fill="var(--fenergo-primary)" radius={[4, 4, 0, 0]} name="Actual">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} opacity={activeIndex === index || activeIndex === null ? 1 : 0.4} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
