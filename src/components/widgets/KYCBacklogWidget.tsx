import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';

const data = [
  { name: 'Mon', value: 45, details: { pending: 25, inProgress: 15, blocked: 5 } },
  { name: 'Tue', value: 52, details: { pending: 30, inProgress: 18, blocked: 4 } },
  { name: 'Wed', value: 38, details: { pending: 20, inProgress: 13, blocked: 5 } },
  { name: 'Thu', value: 61, details: { pending: 35, inProgress: 20, blocked: 6 } },
  { name: 'Fri', value: 48, details: { pending: 28, inProgress: 15, blocked: 5 } },
  { name: 'Sat', value: 23, details: { pending: 15, inProgress: 6, blocked: 2 } },
  { name: 'Sun', value: 15, details: { pending: 10, inProgress: 4, blocked: 1 } },
];

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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold" style={{ color: 'var(--fenergo-primary)' }}>
              {total}
            </div>
            <div className="text-xs text-muted-foreground">Total Backlog</div>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            Click bars
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--fenergo-primary)" radius={[4, 4, 0, 0]} cursor="pointer" onClick={handleBarClick}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={selectedBar?.name === entry.name ? 'var(--fenergo-secondary)' : 'var(--fenergo-primary)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Backlog Details - {selectedBar?.name}</DialogTitle>
          </DialogHeader>
          {selectedBar && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 text-center">
                <div className="text-3xl font-semibold" style={{ color: 'var(--fenergo-primary)' }}>
                  {selectedBar.value}
                </div>
                <div className="text-sm text-muted-foreground">Total Cases</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Pending
                    </Badge>
                  </div>
                  <span className="font-semibold">{selectedBar.details.pending}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                      In Progress
                    </Badge>
                  </div>
                  <span className="font-semibold">{selectedBar.details.inProgress}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                      Blocked
                    </Badge>
                  </div>
                  <span className="font-semibold">{selectedBar.details.blocked}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
