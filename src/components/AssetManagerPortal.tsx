import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Rocket,
  FileSearch,
  Shield,
  BarChart3,
  Settings,
  LogOut,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { AMOverview } from './asset-manager/AMOverview';
import { AMInvestors } from './asset-manager/AMInvestors';
import { AMOrders } from './asset-manager/AMOrders';
import { AMFundLaunches } from './asset-manager/AMFundLaunches';
import { AMDueDiligence } from './asset-manager/AMDueDiligence';
import { AMMonitoring } from './asset-manager/AMMonitoring';
import { AdminBranding } from './asset-manager/AdminBranding';

interface AssetManagerPortalProps {
  onLogout: () => void;
}

type AMView = 'overview' | 'investors' | 'orders' | 'launches' | 'dd' | 'monitoring' | 'reports' | 'admin';

export function AssetManagerPortal({ onLogout }: AssetManagerPortalProps) {
  const [currentView, setCurrentView] = useState<AMView>('overview');

  const navItems = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'investors' as const, label: 'Investors', icon: Users },
    { id: 'orders' as const, label: 'Orders', icon: ShoppingCart },
    { id: 'launches' as const, label: 'Fund Launches', icon: Rocket },
    { id: 'dd' as const, label: 'Due Diligence', icon: FileSearch },
    { id: 'monitoring' as const, label: 'Monitoring', icon: Shield },
    { id: 'reports' as const, label: 'Reports', icon: BarChart3 },
    { id: 'admin' as const, label: 'Admin', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <AMOverview onNavigate={setCurrentView} />;
      case 'investors':
        return <AMInvestors />;
      case 'orders':
        return <AMOrders />;
      case 'launches':
        return <AMFundLaunches />;
      case 'dd':
        return <AMDueDiligence />;
      case 'monitoring':
        return <AMMonitoring />;
      case 'admin':
        return <AdminBranding />;
      default:
        return <AMOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <div className="text-white">FundFlow</div>
              <div className="text-slate-400">Asset Manager</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={onLogout}
          >
            <LogOut className="size-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}