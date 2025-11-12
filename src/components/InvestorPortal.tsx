import { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ShoppingCart,
  ClipboardList
} from 'lucide-react';
import { Button } from './ui/button';
import { InvestorHome } from './investor/InvestorHome';
import { InvestorInvest } from './investor/InvestorInvest';
import { InvestorTrades } from './investor/InvestorTrades';
import { InvestorDocuments } from './investor/InvestorDocuments';
import { InvestorMessages } from './investor/InvestorMessages';
import { InvestorSettings } from './investor/InvestorSettings';
import { AccountMaintenance } from './investor/AccountMaintenance';
import { useBranding } from './BrandingContext';

interface InvestorPortalProps {
  onLogout: () => void;
}

type InvestorView = 'home' | 'invest' | 'trades' | 'documents' | 'requests' | 'messages' | 'settings';

export function InvestorPortal({ onLogout }: InvestorPortalProps) {
  const [currentView, setCurrentView] = useState<InvestorView>('home');
  const { branding } = useBranding();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'invest' as const, label: 'Invest', icon: TrendingUp },
    { id: 'trades' as const, label: 'Trades', icon: ShoppingCart },
    { id: 'documents' as const, label: 'Documents', icon: FileText },
    { id: 'requests' as const, label: 'Requests', icon: ClipboardList },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <InvestorHome onNavigate={setCurrentView} />;
      case 'invest':
        return <InvestorInvest />;
      case 'trades':
        return <InvestorTrades />;
      case 'documents':
        return <InvestorDocuments />;
      case 'requests':
        return <AccountMaintenance />;
      case 'messages':
        return <InvestorMessages />;
      case 'settings':
        return <InvestorSettings />;
      default:
        return <InvestorHome onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div 
              className="size-8 rounded-lg flex items-center justify-center"
              style={{ 
                background: `linear-gradient(to bottom right, ${branding.primaryColor}, ${branding.primaryColor}dd)` 
              }}
            >
              {branding.logoUrl === 'fenergo' ? (
                <img 
                  src="data:image/png;base64,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"
                  alt={branding.companyName}
                  className="h-5 brightness-0 invert"
                />
              ) : (
                <TrendingUp className="size-5 text-white" />
              )}
            </div>
            <div>
              <div className="text-slate-900">{branding.companyName}</div>
              <div className="text-slate-500">Investor Portal</div>
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
                    ? 'text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                style={isActive ? { backgroundColor: branding.primaryColor } : undefined}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
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