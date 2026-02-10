import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { LayoutDashboard, FileCheck, AlertCircle, TrendingUp, Users, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileCheck, label: 'KYC', badge: 45 },
  { icon: AlertCircle, label: 'AML', badge: 28 },
  { icon: TrendingUp, label: 'Trading', badge: 12 },
  { icon: Users, label: 'Onboarding' },
  { icon: Settings, label: 'Reports' },
];

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 bg-sidebar text-sidebar-foreground">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-sidebar-foreground">Fenergo</h1>
              <p className="text-xs text-sidebar-foreground/70">Control</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 ${
                item.active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
