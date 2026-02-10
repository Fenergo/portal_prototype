import { useState } from 'react';

const regions = ['EMEA', 'APAC', 'Americas'];
const businesses = ['Banking', 'Trading', 'Wealth'];

const exposureData: { [key: string]: number } = {
  'EMEA-Banking': 85,
  'EMEA-Trading': 92,
  'EMEA-Wealth': 67,
  'APAC-Banking': 78,
  'APAC-Trading': 88,
  'APAC-Wealth': 71,
  'Americas-Banking': 95,
  'Americas-Trading': 82,
  'Americas-Wealth': 89,
};

const getColor = (value: number) => {
  if (value >= 90) return { bg: '#FEE2E2', text: '#DC2626', ring: '#FECACA' };
  if (value >= 80) return { bg: '#FEF3C7', text: '#D97706', ring: '#FDE68A' };
  if (value >= 70) return { bg: '#EDE9FE', text: '#7C3AED', ring: '#DDD6FE' };
  return { bg: '#D1FAE5', text: '#059669', ring: '#A7F3D0' };
};

export function ExposureHeatmapWidget() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* Grid header */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        <div />
        {businesses.map((business) => (
          <div key={business} className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {business}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      <div className="space-y-2 flex-1">
        {regions.map((region) => (
          <div key={region} className="grid grid-cols-4 gap-2 items-center">
            <div className="text-[12px] font-semibold text-slate-600">{region}</div>
            {businesses.map((business) => {
              const key = `${region}-${business}`;
              const value = exposureData[key];
              const colors = getColor(value);
              const isSelected = selected === key;
              return (
                <button
                  key={key}
                  className={`h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
                    isSelected ? 'scale-105 shadow-md ring-2' : 'hover:scale-105 hover:shadow-sm'
                  }`}
                  style={{
                    backgroundColor: colors.bg,
                    ringColor: isSelected ? colors.ring : undefined,
                  }}
                  onClick={() => setSelected(selected === key ? null : key)}
                >
                  <span className="text-[14px] font-bold" style={{ color: colors.text }}>
                    {value}%
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100">
        {[
          { label: 'Low', color: '#D1FAE5' },
          { label: 'Medium', color: '#EDE9FE' },
          { label: 'High', color: '#FEF3C7' },
          { label: 'Critical', color: '#FEE2E2' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
