import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const data = [
  { name: 'Mon', value: 45, details: { pending: 25, inProgress: 15, blocked: 5 } },
  { name: 'Tue', value: 52, details: { pending: 30, inProgress: 18, blocked: 4 } },
  { name: 'Wed', value: 38, details: { pending: 20, inProgress: 13, blocked: 5 } },
  { name: 'Thu', value: 61, details: { pending: 35, inProgress: 20, blocked: 6 } },
  { name: 'Fri', value: 48, details: { pending: 28, inProgress: 15, blocked: 5 } },
  { name: 'Sat', value: 23, details: { pending: 15, inProgress: 6, blocked: 2 } },
  { name: 'Sun', value: 15, details: { pending: 10, inProgress: 4, blocked: 1 } },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-xl">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p className="text-slate-300">{payload[0].value} cases</p>
      </div>
    );
  }
  return null;
};

export function KYCBacklogWidget() {
  const [selectedBar, setSelectedBar] = useState<typeof data[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleBarClick = (entry: any) => {
    const barData = data.find(d => d.name === entry.name);
    if (barData) {
      setSelectedBar(barData);
      setDetailOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{total}</span>
          <span className="text-[11px] text-slate-400 font-medium">total backlog</span>
        </div>
        <div className="flex-1 min-h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="value"
                radius={[6, 6, 6, 6]}
                cursor="pointer"
                onClick={handleBarClick}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={selectedBar?.name === entry.name ? '#0EA78A' : '#21CFB2'}
                    opacity={selectedBar && selectedBar.name !== entry.name ? 0.4 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">Click a bar for details</p>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-0 gap-0 overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-[#21CFB2] to-[#0EA78A]">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold">
                {selectedBar?.name} · {selectedBar?.value} Cases
              </DialogTitle>
            </DialogHeader>
          </div>
          {selectedBar && (
            <div className="p-6 space-y-3">
              {[
                { label: 'Pending', value: selectedBar.details.pending, color: 'bg-amber-500' },
                { label: 'In Progress', value: selectedBar.details.inProgress, color: 'bg-blue-500' },
                { label: 'Blocked', value: selectedBar.details.blocked, color: 'bg-rose-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Total</span>
                  <span className="text-lg font-bold text-slate-900">{selectedBar.value}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
