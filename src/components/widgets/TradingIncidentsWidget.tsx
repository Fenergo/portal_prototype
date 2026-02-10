import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', incidents: 15 },
  { month: 'Feb', incidents: 12 },
  { month: 'Mar', incidents: 18 },
  { month: 'Apr', incidents: 9 },
  { month: 'May', incidents: 14 },
  { month: 'Jun', incidents: 11 },
];

export function TradingIncidentsWidget() {
  const avgIncidents = (data.reduce((sum, item) => sum + item.incidents, 0) / data.length).toFixed(1);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold" style={{ color: 'var(--fenergo-warning)' }}>
            {data[data.length - 1].incidents}
          </div>
          <div className="text-xs text-muted-foreground">This Month</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{avgIncidents}</div>
          <div className="text-xs text-muted-foreground">Avg</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="incidents"
            stroke="var(--fenergo-warning)"
            fill="var(--fenergo-warning)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
