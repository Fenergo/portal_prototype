import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';

const cases = [
  { id: 'KYC-2401', type: 'Approval', client: 'Acme Corp', status: 'pending', time: '2h', priority: 'high' },
  { id: 'AML-2402', type: 'Escalation', client: 'TechStart Ltd', status: 'review', time: '4h', priority: 'critical' },
  { id: 'KYC-2403', type: 'Approval', client: 'Global Industries', status: 'pending', time: '6h', priority: 'medium' },
  { id: 'TRD-2404', type: 'Escalation', client: 'Finance Co', status: 'review', time: '8h', priority: 'high' },
];

const priorityColors: { [key: string]: string } = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

export function OpenCasesWidget() {
  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto">
      {cases.map((item) => (
        <div
          key={item.id}
          className="p-2 rounded border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="text-xs py-0 px-1.5">
                {item.id}
              </Badge>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityColors[item.priority]}`} />
            </div>
            <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              {item.time}
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="font-medium text-xs">{item.client}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {item.type === 'Escalation' ? (
                <AlertTriangle className="h-2.5 w-2.5 text-orange-500" />
              ) : (
                <CheckCircle2 className="h-2.5 w-2.5 text-blue-500" />
              )}
              <span>{item.type}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
