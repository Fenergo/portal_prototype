import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardWidgetProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  color?: string;
}

export function MetricCardWidget({ title, value, change, icon: Icon, color = 'var(--fenergo-primary)' }: MetricCardWidgetProps) {
  const isPositive = change && change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{title}</div>
        {Icon && <Icon className="h-4 w-4" style={{ color }} />}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold" style={{ color }}>
          {value}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
