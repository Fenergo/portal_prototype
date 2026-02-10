import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Critical', value: 12, color: '#EF4444' },
  { name: 'High', value: 28, color: '#F59E0B' },
  { name: 'Medium', value: 45, color: '#6366F1' },
  { name: 'Low', value: 67, color: '#21CFB2' },
];

export function AlertsBySeverityWidget() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Donut */}
        <div className="relative w-[130px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={58}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                    className="transition-opacity duration-200"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[20px] font-bold text-slate-900 leading-none">
              {activeIndex !== null ? data[activeIndex].value : total}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
              {activeIndex !== null ? data[activeIndex].name : 'Total'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center gap-2.5 flex-1">
          {data.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center justify-between cursor-default transition-opacity duration-200 ${
                activeIndex !== null && activeIndex !== index ? 'opacity-40' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] text-slate-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-slate-900 tabular-nums">{item.value}</span>
                <span className="text-[10px] text-slate-400 tabular-nums w-8 text-right">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
