import { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardWidgetProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  color?: string;
}

export function MetricCardWidget({ title, value, change, icon: Icon, color = '#21CFB2' }: MetricCardWidgetProps) {
  const isPositive = change !== undefined && change > 0;
  const isDown = change !== undefined && change < 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <p className="text-[12px] font-medium text-slate-500 tracking-wide uppercase">{title}</p>
        {Icon && (
          <div
            className="h-8 w-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}10` }}
          >
            <Icon className="h-4 w-4" style={{ color }} />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-end gap-3">
          <span className="text-[32px] font-bold tracking-tight leading-none text-slate-900">
            {value}
          </span>
          {change !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold mb-1 ${
              isDown ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
