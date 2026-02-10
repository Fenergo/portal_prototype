import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Critical', value: 12, color: 'var(--fenergo-danger)' },
  { name: 'High', value: 28, color: 'var(--fenergo-warning)' },
  { name: 'Medium', value: 45, color: 'var(--fenergo-secondary)' },
  { name: 'Low', value: 67, color: 'var(--fenergo-success)' },
];

export function AlertsBySeverityWidget() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-1">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-secondary/50 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
