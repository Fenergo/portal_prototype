import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const data = [
  { time: '00:00', alerts: 12, resolved: 8, pending: 4 },
  { time: '04:00', alerts: 8, resolved: 6, pending: 2 },
  { time: '08:00', alerts: 24, resolved: 18, pending: 6 },
  { time: '12:00', alerts: 18, resolved: 14, pending: 4 },
  { time: '16:00', alerts: 32, resolved: 24, pending: 8 },
  { time: '20:00', alerts: 28, resolved: 22, pending: 6 },
  { time: '24:00', alerts: 15, resolved: 12, pending: 3 },
];

export function AMLAlertsWidget() {
  const [selectedPoint, setSelectedPoint] = useState<typeof data[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const total = data.reduce((sum, item) => sum + item.alerts, 0);
  const trend = ((data[data.length - 1].alerts - data[0].alerts) / data[0].alerts * 100).toFixed(1);

  const handleClick = (e: any) => {
    if (e?.activePayload?.[0]) {
      setSelectedPoint(e.activePayload[0].payload);
      setDetailOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold" style={{ color: 'var(--fenergo-secondary)' }}>
              {total}
            </div>
            <div className="text-xs text-muted-foreground">AML Alerts (24h)</div>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-xs">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="alerts" stroke="var(--fenergo-secondary)" strokeWidth={2} dot={{ fill: 'var(--fenergo-secondary)', cursor: 'pointer', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>AML Alert Details - {selectedPoint?.time}</DialogTitle>
          </DialogHeader>
          {selectedPoint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-blue-50 text-center border border-blue-200">
                  <div className="text-2xl font-semibold text-blue-600">
                    {selectedPoint.alerts}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Alerts</div>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 text-center border border-green-200">
                  <div className="text-2xl font-semibold text-green-600">
                    {selectedPoint.resolved}
                  </div>
                  <div className="text-sm text-muted-foreground">Resolved</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Pending Review</span>
                  </div>
                  <span className="text-xl font-semibold text-yellow-600">{selectedPoint.pending}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <strong>Resolution Rate:</strong>
                </div>
                <div className="text-2xl font-semibold text-green-600">
                  {((selectedPoint.resolved / selectedPoint.alerts) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
