import { useState } from 'react';

const regions = ['EMEA', 'APAC', 'Amer'];
const businesses = ['Bank', 'Trade', 'Wealth'];

const exposureData: { [key: string]: number } = {
  'EMEA-Bank': 85,
  'EMEA-Trade': 92,
  'EMEA-Wealth': 67,
  'APAC-Bank': 78,
  'APAC-Trade': 88,
  'APAC-Wealth': 71,
  'Amer-Bank': 95,
  'Amer-Trade': 82,
  'Amer-Wealth': 89,
};

const getColor = (value: number) => {
  if (value >= 90) return 'bg-red-500';
  if (value >= 80) return 'bg-orange-500';
  if (value >= 70) return 'bg-yellow-500';
  return 'bg-green-500';
};

export function ExposureHeatmapWidget() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-1 text-left font-medium text-muted-foreground"></th>
              {businesses.map((business) => (
                <th key={business} className="p-1 text-center font-medium text-muted-foreground">
                  {business}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr key={region}>
                <td className="p-1 text-xs font-medium text-muted-foreground">{region}</td>
                {businesses.map((business) => {
                  const key = `${region}-${business}`;
                  const value = exposureData[key];
                  return (
                    <td key={key} className="p-1">
                      <div
                        className={`h-8 flex items-center justify-center rounded cursor-pointer transition-all text-xs ${getColor(
                          value
                        )} ${selected === key ? 'ring-2 ring-primary scale-105' : ''}`}
                        onClick={() => setSelected(selected === key ? null : key)}
                      >
                        <span className="text-white font-semibold">{value}%</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="p-2 rounded bg-secondary/50 text-xs">
          <strong>{selected.replace('-', ' - ')}</strong>: {exposureData[selected]}% exposure
        </div>
      )}
    </div>
  );
}
