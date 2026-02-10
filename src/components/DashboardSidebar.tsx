import { LayoutDashboard, FileCheck, AlertCircle, TrendingUp, Users, Settings, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Badge } from './ui/badge';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileCheck, label: 'KYC', badge: 45 },
  { icon: AlertCircle, label: 'AML', badge: 28 },
  { icon: TrendingUp, label: 'Trading', badge: 12 },
  { icon: Users, label: 'Onboarding' },
  { icon: Settings, label: 'Reports' },
];

export function DashboardSidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col ${
        expanded ? 'w-64' : 'w-20'
      } hidden md:flex`}
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          {expanded && (
            <div>
              <h1 className="font-semibold text-lg">Fenergo</h1>
              <p className="text-xs text-sidebar-foreground/70">Control</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? 'default' : 'ghost'}
            className={`w-full justify-start gap-3 ${!expanded && 'justify-center px-2'} ${
              item.active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {expanded && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setExpanded(!expanded)}
        >
          <Filter className="h-5 w-5" />
          {expanded && <span>Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
