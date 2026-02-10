import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', incidents: 15 },
  { month: 'Feb', incidents: 12 },
  { month: 'Mar', incidents: 18 },
  { month: 'Apr', incidents: 9 },
  { month: 'May', incidents: 14 },
  { month: 'Jun', incidents: 11 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
        <p className="font-semibold">{payload[0].payload.month}</p>
        <p className="text-amber-300">{payload[0].value} incidents</p>
      </div>
    );
  }
  return null;
};

export function TradingIncidentsWidget() {
  const current = data[data.length - 1].incidents;
  const avgIncidents = (data.reduce((sum, item) => sum + item.incidents, 0) / data.length).toFixed(1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{current}</span>
          <span className="text-[11px] text-slate-400 font-medium">this month</span>
        </div>
        <div className="text-right">
          <span className="text-[14px] font-bold text-slate-600">{avgIncidents}</span>
          <span className="text-[11px] text-slate-400 ml-1">avg</span>
        </div>
      </div>
      <div className="flex-1 min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#F59E0B"
              strokeWidth={2.5}
              fill="url(#incidentGradient)"
              dot={{ fill: '#F59E0B', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
