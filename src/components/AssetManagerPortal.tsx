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
import { useBranding } from './BrandingContext';

interface AssetManagerPortalProps {
  onLogout: () => void;
}

type AMView = 'overview' | 'investors' | 'orders' | 'launches' | 'dd' | 'monitoring' | 'reports' | 'admin';

export function AssetManagerPortal({ onLogout }: AssetManagerPortalProps) {
  const [currentView, setCurrentView] = useState<AMView>('overview');
  const { branding } = useBranding();

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
      <aside 
        className="w-64 text-white flex flex-col"
        style={{ backgroundColor: branding.primaryColor }}
      >
        <div className="p-4 border-b border-white/20">
          <div>
            <div className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>FundFlow</div>
            <div className="text-white/70 text-xs">Asset Manager</div>
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
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/20">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10"
            onClick={onLogout}
          >
            <LogOut className="size-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/portal_prototype/fen_logo.jpg" 
              alt="Fenergo"
              className="h-8 object-contain"
            />
            <span className="text-slate-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>FundFlow</span>
          </div>
          <div className="h-8 flex items-center">
            <img 
              src={branding.logoUrl === 'fenergo' 
                ? '/portal_prototype/fen_logo.jpg' 
                : branding.logoUrl === 'br' 
                ? '/portal_prototype/BR_logo.png'
                : '/portal_prototype/fen_logo.jpg'
              } 
              alt={branding.companyName}
              className="h-8 object-contain"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}