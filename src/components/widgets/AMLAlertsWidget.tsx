import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { TrendingUp } from 'lucide-react';

const data = [
  { time: '00:00', alerts: 12, resolved: 8, pending: 4 },
  { time: '04:00', alerts: 8, resolved: 6, pending: 2 },
  { time: '08:00', alerts: 24, resolved: 18, pending: 6 },
  { time: '12:00', alerts: 18, resolved: 14, pending: 4 },
  { time: '16:00', alerts: 32, resolved: 24, pending: 8 },
  { time: '20:00', alerts: 28, resolved: 22, pending: 6 },
  { time: '24:00', alerts: 15, resolved: 12, pending: 3 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
        <p className="font-semibold">{payload[0].payload.time}</p>
        <p className="text-emerald-300">{payload[0].value} alerts</p>
      </div>
    );
  }
  return null;
};

export function AMLAlertsWidget() {
  const [selectedPoint, setSelectedPoint] = useState<typeof data[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const total = data.reduce((sum, item) => sum + item.alerts, 0);

  const handleClick = (e: any) => {
    if (e?.activePayload?.[0]) {
      setSelectedPoint(e.activePayload[0].payload);
      setDetailOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{total}</span>
            <span className="text-[11px] text-slate-400 font-medium">alerts today</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">
            <TrendingUp className="h-3 w-3" />
            78% resolved
          </div>
        </div>
        <div className="flex-1 min-h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} onClick={handleClick}>
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="alertGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#21CFB2" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="url(#alertGradient)"
                strokeWidth={2.5}
                dot={{ fill: '#6366F1', strokeWidth: 0, r: 3, cursor: 'pointer' }}
                activeDot={{ r: 5, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-0 gap-0 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-[#6366F1] to-[#4F46E5]">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold">
                Alert Details · {selectedPoint?.time}
              </DialogTitle>
            </DialogHeader>
          </div>
          {selectedPoint && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Total', value: selectedPoint.alerts, bg: 'bg-slate-50' },
                  { label: 'Resolved', value: selectedPoint.resolved, bg: 'bg-emerald-50' },
                  { label: 'Pending', value: selectedPoint.pending, bg: 'bg-amber-50' },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
                    <div className="text-xl font-bold text-slate-900">{item.value}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-[11px] text-slate-500 font-medium mb-1">Resolution Rate</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${(selectedPoint.resolved / selectedPoint.alerts) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-emerald-600">
                    {((selectedPoint.resolved / selectedPoint.alerts) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
