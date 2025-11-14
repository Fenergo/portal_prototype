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
          <div>
            <div className="text-slate-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>FundFlow</div>
            <div className="text-slate-500 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>Investor Portal</div>
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
                : branding.logoUrl === 'azg'
                ? '/portal_prototype/AzG_logo.png'
                : '/portal_prototype/fen_logo.jpg'
              } 
              alt={branding.companyName}
              className="h-8 object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          {renderView()}
        </div>
      </main>
    </div>
  );
}