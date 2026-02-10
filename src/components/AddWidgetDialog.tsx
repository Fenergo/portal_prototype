import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus, BarChart3, PieChart, TrendingUp, AlertTriangle, FileCheck, Activity, Users, Target } from 'lucide-react';
import { useState } from 'react';

export interface WidgetType {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
}

const availableWidgets: WidgetType[] = [
  {
    id: 'kyc-backlog',
    name: 'KYC Backlog',
    description: 'Monitor KYC verification backlog',
    icon: FileCheck,
    category: 'Compliance',
  },
  {
    id: 'aml-alerts',
    name: 'AML Alerts',
    description: 'Track AML alerts over time',
    icon: AlertTriangle,
    category: 'Compliance',
  },
  {
    id: 'kyc-metric',
    name: 'KYC Due (12h)',
    description: 'Quick metric for KYC due in 12 hours',
    icon: FileCheck,
    category: 'Metrics',
  },
  {
    id: 'high-risk-clients',
    name: 'High-Risk Clients',
    description: 'Count of high-risk client accounts',
    icon: AlertTriangle,
    category: 'Metrics',
  },
  {
    id: 'open-cases-metric',
    name: 'Open Cases Count',
    description: 'Quick metric for open cases',
    icon: BarChart3,
    category: 'Metrics',
  },
  {
    id: 'trading-exceptions',
    name: 'Trading Exceptions',
    description: 'Quick metric for trading exceptions',
    icon: Activity,
    category: 'Metrics',
  },
  {
    id: 'risk-appetite',
    name: 'Risk Appetite',
    description: 'Compare risk appetite vs actual',
    icon: TrendingUp,
    category: 'Risk',
  },
  {
    id: 'alerts-severity',
    name: 'Alerts by Severity',
    description: 'Breakdown of alerts by severity level',
    icon: PieChart,
    category: 'Analytics',
  },
  {
    id: 'exposure-heatmap',
    name: 'Exposure Heatmap',
    description: 'Regional and business exposure matrix',
    icon: Activity,
    category: 'Risk',
  },
  {
    id: 'open-cases',
    name: 'Open Cases',
    description: 'List of pending approvals and escalations',
    icon: Users,
    category: 'Operations',
  },
  {
    id: 'trading-incidents',
    name: 'Trading Incidents',
    description: 'Track trading incidents and coverage',
    icon: Target,
    category: 'Operations',
  },
];

interface AddWidgetDialogProps {
  onAddWidget: (widgetId: string) => void;
  existingWidgets: string[];
}

export function AddWidgetDialog({ onAddWidget, existingWidgets }: AddWidgetDialogProps) {
  const [open, setOpen] = useState(false);

  const handleAddWidget = (widgetId: string) => {
    onAddWidget(widgetId);
    setOpen(false);
  };

  const categories = Array.from(new Set(availableWidgets.map((w) => w.category)));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Widget to Dashboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableWidgets
                  .filter((w) => w.category === category)
                  .map((widget) => {
                    const Icon = widget.icon;
                    const isAdded = existingWidgets.includes(widget.id);
                    return (
                      <div
                        key={widget.id}
                        className={`p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer ${
                          isAdded ? 'opacity-50' : ''
                        }`}
                        onClick={() => !isAdded && handleAddWidget(widget.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded bg-primary/10">
                            <Icon className="h-5 w-5" style={{ color: 'var(--fenergo-primary)' }} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-1">{widget.name}</div>
                            <div className="text-sm text-muted-foreground">{widget.description}</div>
                            {isAdded && (
                              <div className="text-xs text-primary mt-2">Already added</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}