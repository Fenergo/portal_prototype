import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Percent,
  Users,
  FileText,
  Clock,
  Rocket,
  Building2,
  Globe,
  Leaf,
  Play,
  Eye
} from 'lucide-react';

interface CounterpartyHomeProps {
  onNavigate: (view: string) => void;
}

export function CounterpartyHome({ onNavigate }: CounterpartyHomeProps) {
  const { branding } = useBranding();

  // Onboarding invites data
  const pendingInvites = [
    {
      id: 'INV-2024-001',
      assetManager: 'BlackRock Alternative Investors',
      status: 'in-progress' as const,
      progress: 45,
      stage: 'KYB',
      dueDate: '2025-12-24',
    },
    {
      id: 'INV-2024-003',
      assetManager: 'State Street Global Advisors',
      status: 'changes-requested' as const,
      progress: 72,
      stage: 'Agreements',
      dueDate: '2025-12-18',
    },
  ];

  const newInvites = [
    {
      id: 'INV-2024-002',
      assetManager: 'Aztec Group',
      relationship: 'Sub-distributor',
      markets: ['Ireland', 'Cayman'],
      dueDate: '2025-12-30',
    },
  ];

  // Asset Managers (approved)
  const assetManagers = [
    {
      name: 'BlackRock Alternative Investors',
      logo: '/portal_prototype/BR_logo.png',
      fundsCount: 3,
      marketsCount: 8,
      relationship: 'Distributor',
    },
    {
      name: 'Aztec Group',
      logo: '/portal_prototype/AzG_logo.png',
      fundsCount: 2,
      marketsCount: 4,
      relationship: 'Sub-distributor',
    },
  ];

  // Recent funds
  const recentFunds = [
    {
      id: 'FUND-001',
      name: 'Global Equity Fund',
      shareClass: 'Class A USD',
      assetManager: 'BlackRock Alternative Investors',
      amLogo: '/portal_prototype/BR_logo.png',
      esgClass: '8',
      status: 'active' as const,
    },
    {
      id: 'FUND-002',
      name: 'Sustainable Bond Fund',
      shareClass: 'Class I EUR',
      assetManager: 'BlackRock Alternative Investors',
      amLogo: '/portal_prototype/BR_logo.png',
      esgClass: '9',
      status: 'active' as const,
    },
  ];

  const tasks = [
    {
      id: '1',
      title: 'Complete KYB documentation - BlackRock Onboarding',
      type: 'action',
      priority: 'high',
      dueDate: '2025-12-15',
      category: 'onboarding',
    },
    {
      id: '2',
      title: 'Review agreement changes - State Street',
      type: 'action',
      priority: 'high',
      dueDate: '2025-12-18',
      category: 'onboarding',
    },
    {
      id: '3',
      title: 'Annual AML Policy Attestation - Global Equity Fund',
      type: 'action',
      priority: 'medium',
      dueDate: '2026-01-15',
      category: 'compliance',
    },
  ];

  const alerts = [
    {
      id: '1',
      message: 'New invitation received from Aztec Group',
      time: '2 hours ago',
      category: 'onboarding',
    },
    {
      id: '2',
      message: 'Sustainable Bond Fund - Q4 distribution analytics available',
      time: '4 hours ago',
      category: 'funds',
    },
    {
      id: '3',
      message: 'KYB screening completed for BlackRock onboarding',
      time: '1 day ago',
      category: 'onboarding',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Welcome back, John</h1>
        <p className="text-slate-600">Your counterparty distribution overview</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Building2 className="size-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600">Asset Managers</p>
              <p className="text-2xl font-bold text-slate-900">{assetManagers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="size-8 text-green-600" />
            <div>
              <p className="text-sm text-slate-600">Active Funds</p>
              <p className="text-2xl font-bold text-slate-900">5</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Rocket className="size-8 text-orange-600" />
            <div>
              <p className="text-sm text-slate-600">Pending Invites</p>
              <p className="text-2xl font-bold text-slate-900">{pendingInvites.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Globe className="size-8 text-purple-600" />
            <div>
              <p className="text-sm text-slate-600">Markets</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* New Invitations Alert */}
      {newInvites.length > 0 && (
        <Card 
          className="p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
          style={{ 
            background: `linear-gradient(to bottom right, ${branding.primaryColor}, ${branding.primaryColor}dd)` 
          }}
          onClick={() => onNavigate('onboarding')}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="size-5" />
                <h3 className="text-white font-bold">New Onboarding Invitation{newInvites.length > 1 ? 's' : ''}</h3>
              </div>
              {newInvites.map(invite => (
                <div key={invite.id} className="mb-2">
                  <p className="text-white/90">{invite.assetManager} - {invite.relationship}</p>
                  <p className="text-white/70 text-sm">Markets: {invite.markets.join(', ')} • Due: {invite.dueDate}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              View Invites
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Onboarding & Asset Managers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Onboarding */}
          {pendingInvites.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-900">Active Onboarding</h2>
                <Button variant="ghost" onClick={() => onNavigate('onboarding')}>
                  View All
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-3">
                {pendingInvites.map((invite) => (
                  <Card key={invite.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-slate-900 font-semibold">{invite.assetManager}</h3>
                          <p className="text-sm text-slate-600">{invite.id}</p>
                        </div>
                        <Badge className={
                          invite.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }>
                          {invite.status === 'in-progress' && <Play className="size-3 mr-1" />}
                          {invite.status === 'changes-requested' && <AlertCircle className="size-3 mr-1" />}
                          {invite.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600">{invite.progress}% - {invite.stage}</span>
                          <span className="text-slate-500">Due: {invite.dueDate}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all"
                            style={{
                              width: `${invite.progress}%`,
                              backgroundColor: branding.primaryColor,
                            }}
                          />
                        </div>
                      </div>

                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => onNavigate('onboarding')}
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        Resume Onboarding
                        <ArrowRight className="size-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Asset Managers */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900">Your Asset Managers</h2>
              <Button variant="ghost" onClick={() => onNavigate('funds-library')}>
                View Funds
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {assetManagers.map((am, idx) => (
                <Card 
                  key={idx} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate('funds-library')}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={am.logo} alt={am.name} className="h-10 object-contain" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{am.relationship}</p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="size-4 text-slate-400" />
                          <span className="text-slate-900">{am.fundsCount} funds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="size-4 text-slate-400" />
                          <span className="text-slate-900">{am.marketsCount} markets</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Funds */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-900">Recently Added Funds</h2>
              <Button variant="ghost" onClick={() => onNavigate('funds-library')}>
                Browse Library
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentFunds.map((fund) => (
                <Card 
                  key={fund.id} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onNavigate('funds-library')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full ${
                        fund.esgClass === '9' ? 'bg-green-600' :
                        fund.esgClass === '8' ? 'bg-green-500' :
                        'bg-blue-500'
                      } flex items-center justify-center text-white font-bold`}>
                        {fund.esgClass}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{fund.name}</h3>
                        <p className="text-sm text-slate-600">{fund.shareClass}</p>
                      </div>
                      <img src={fund.amLogo} alt={fund.assetManager} className="h-6 object-contain" />
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="size-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tasks & Alerts */}
        <div className="space-y-6">
          {/* Tasks */}
          <div>
            <h2 className="text-slate-900 mb-4">Action Items</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate(task.category === 'onboarding' ? 'onboarding' : 'funds-library')}
                >
                  <div className="flex gap-3">
                    <div className={`mt-1 size-2 rounded-full flex-shrink-0 ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900 text-sm">{task.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-xs">{task.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {task.dueDate}
                        </span>
                        {task.assignee && (
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {task.assignee}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h2 className="text-slate-900 mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`p-4 border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
                    alert.type === 'error' ? 'border-l-red-500 bg-red-50/50' :
                    alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50/50' :
                    'border-l-blue-500 bg-blue-50/50'
                  }`}
                  onClick={() => onNavigate(alert.category === 'onboarding' ? 'onboarding' : 'funds-library')}
                >
                  <div className="flex items-start gap-3">
                    {alert.type === 'error' ? (
                      <AlertCircle className="size-5 text-red-600 flex-shrink-0" />
                    ) : alert.type === 'warning' ? (
                      <AlertCircle className="size-5 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <Info className="size-5 text-blue-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-900 text-sm">{alert.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-xs">{alert.message}</p>
                      <p className="text-slate-500 text-xs mt-1">{alert.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate('onboarding')}
              >
                <Rocket className="size-4 mr-2" />
                View Onboarding Status
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate('funds-library')}
              >
                <FileText className="size-4 mr-2" />
                Browse Fund Library
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate('documents')}
              >
                <Download className="size-4 mr-2" />
                Download Documents
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate('messages')}
              >
                <MessageSquare className="size-4 mr-2" />
                View Messages
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
