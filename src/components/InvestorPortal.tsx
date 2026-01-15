import { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ShoppingCart,
  ClipboardList,
  Menu,
  ChevronLeft,
  Pin,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { InvestorHome } from './investor/InvestorHome';
import { InvestorInvest } from './investor/InvestorInvest';
import { InvestorTrades } from './investor/InvestorTrades';
import { InvestorDocuments } from './investor/InvestorDocuments';
import { InvestorMessages } from './investor/InvestorMessages';
import { InvestorSettings } from './investor/InvestorSettings';
import { AccountMaintenance } from './investor/AccountMaintenance';
import { FenBotPopup } from './investor/FenBotPopup';
import { useBranding } from './BrandingContext';

interface InvestorPortalProps {
  onLogout: () => void;
}

type InvestorView = 'home' | 'invest' | 'trades' | 'documents' | 'requests' | 'messages' | 'settings';

export function InvestorPortal({ onLogout }: InvestorPortalProps) {
  const [currentView, setCurrentView] = useState<InvestorView>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [isFenBotOpen, setIsFenBotOpen] = useState(false);
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
      <aside 
        className="bg-white border-r flex flex-col transition-all duration-300 ease-in-out relative overflow-hidden"
        style={{ 
          width: isSidebarCollapsed ? '64px' : '256px'
        }}
        onMouseEnter={() => {
          if (!isSidebarPinned) {
            setIsSidebarCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          if (!isSidebarPinned) {
            setIsSidebarCollapsed(true);
          }
        }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!isSidebarCollapsed ? (
            <div>
              <div className="text-slate-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}>fundflow</div>
              <div className="text-slate-500 text-xs font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Investor Portal</div>
            </div>
          ) : (
            <div className="text-slate-900 font-bold text-xl">ff</div>
          )}
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarPinned(!isSidebarPinned)}
              className="text-slate-400 hover:text-slate-900 transition-colors p-1 rounded"
              title={isSidebarPinned ? 'Unpin sidebar' : 'Pin sidebar'}
            >
              {isSidebarPinned ? <Pin className="size-4 fill-current" /> : <Pin className="size-4" />}
            </button>
          )}
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
                style={{
                  backgroundColor: isActive ? branding.primaryColor : undefined,
                  justifyContent: isSidebarCollapsed ? 'center' : 'flex-start'
                }}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <Icon className={isSidebarCollapsed ? "size-6" : "size-5"} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full gap-3"
            style={{ justifyContent: isSidebarCollapsed ? 'center' : 'flex-start' }}
            onClick={onLogout}
            title={isSidebarCollapsed ? 'Sign Out' : ''}
          >
            <LogOut className={isSidebarCollapsed ? "size-6" : "size-5"} />
            {!isSidebarCollapsed && 'Sign Out'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
          {isSidebarCollapsed && (
            <button
              onClick={() => {
                setIsSidebarCollapsed(false);
                setIsSidebarPinned(true);
              }}
              className="text-slate-600 hover:text-slate-900 transition-colors p-1 rounded hover:bg-slate-100"
              title="Expand sidebar"
            >
              <Menu className="size-6" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>powered by</span>
            <img 
              src="/portal_prototype/fen_logo.jpg" 
              alt="Fenergo"
              className="h-8 object-contain"
            />
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

      {/* FenBot Floating Button - Outside main flex container for proper fixed positioning */}
      {!isFenBotOpen && (
        <button
          onClick={() => setIsFenBotOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
          style={{
            background: `linear-gradient(to bottom right, ${branding.primaryColor}, ${branding.primaryColor}dd)`,
            zIndex: 9999
          }}
        >
          <Sparkles className="size-7 text-white" />
          <Badge 
            className="absolute -top-1 -right-1 bg-white text-xs px-1.5 animate-pulse"
            style={{ color: branding.primaryColor }}
          >
            AI
          </Badge>
        </button>
      )}

      {/* FenBot Popup */}
      <FenBotPopup 
        isOpen={isFenBotOpen}
        onClose={() => setIsFenBotOpen(false)}
        onMinimize={() => setIsFenBotOpen(false)}
      />
    </div>
  );
}