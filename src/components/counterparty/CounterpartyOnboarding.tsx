import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useBranding } from '../BrandingContext';
import { 
  Search, 
  Filter,
  Clock,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Eye,
  XCircle,
  Play,
  Calendar,
  TrendingUp,
  FileText,
  Users,
  ArrowRight
} from 'lucide-react';
import { CounterpartyOnboardingWizard } from './CounterpartyOnboardingWizard';

export function CounterpartyOnboarding() {
  const { branding } = useBranding();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvite, setSelectedInvite] = useState<string | null>(null);

  const invites = [
    {
      id: 'INV-2024-001',
      assetManager: 'BlackRock Alternative Investors',
      relationship: 'Distributor',
      markets: ['US', 'UK', 'Luxembourg'],
      sla: '14 days',
      dueDate: '2025-12-24',
      lastUpdate: '2 hours ago',
      status: 'in-progress' as const,
      progress: 45,
      stage: 'KYB',
    },
    {
      id: 'INV-2024-002',
      assetManager: 'Aztec Group',
      relationship: 'Sub-distributor',
      markets: ['Ireland', 'Cayman'],
      sla: '21 days',
      dueDate: '2025-12-30',
      lastUpdate: '1 day ago',
      status: 'new' as const,
      progress: 0,
      stage: null,
    },
    {
      id: 'INV-2024-003',
      assetManager: 'State Street Global Advisors',
      relationship: 'Distributor',
      markets: ['US', 'Canada', 'Japan'],
      sla: '14 days',
      dueDate: '2025-12-18',
      lastUpdate: '3 hours ago',
      status: 'changes-requested' as const,
      progress: 72,
      stage: 'Agreements',
    },
    {
      id: 'INV-2023-089',
      assetManager: 'Fidelity International',
      relationship: 'Distributor',
      markets: ['UK', 'Germany', 'France'],
      sla: '14 days',
      dueDate: '2025-11-10',
      lastUpdate: '2 weeks ago',
      status: 'approved' as const,
      progress: 100,
      stage: 'Complete',
    },
    {
      id: 'INV-2024-004',
      assetManager: 'Wellington Management',
      relationship: 'Sub-distributor',
      markets: ['Singapore', 'Hong Kong'],
      sla: '21 days',
      dueDate: '2026-01-15',
      lastUpdate: '5 days ago',
      status: 'submitted' as const,
      progress: 100,
      stage: 'Under Review',
    },
  ];

  const kpis = [
    { label: 'Invites This Month', value: '12', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Avg. Time to Approval', value: '18 days', icon: Clock, color: 'text-green-600' },
    { label: 'Open Questions', value: '3', icon: AlertCircle, color: 'text-orange-600' },
    { label: 'Pending Signatures', value: '5', icon: FileText, color: 'text-purple-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'submitted':
        return 'bg-purple-100 text-purple-700';
      case 'changes-requested':
        return 'bg-orange-100 text-orange-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'declined':
        return 'bg-red-100 text-red-700';
      case 'expired':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <FileText className="size-4" />;
      case 'in-progress':
        return <Play className="size-4" />;
      case 'submitted':
        return <FileCheck className="size-4" />;
      case 'changes-requested':
        return <AlertCircle className="size-4" />;
      case 'approved':
        return <CheckCircle2 className="size-4" />;
      case 'declined':
        return <XCircle className="size-4" />;
      case 'expired':
        return <Clock className="size-4" />;
      default:
        return <FileText className="size-4" />;
    }
  };

  const filteredInvites = invites.filter(invite => {
    const matchesSearch = invite.assetManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invite.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invite.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedInvite) {
    const invite = invites.find(inv => inv.id === selectedInvite);
    return (
      <CounterpartyOnboardingWizard
        invite={invite!}
        onClose={() => setSelectedInvite(null)}
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Counterparty Onboarding</h1>
        <p className="text-slate-600">Manage asset manager invitations and complete onboarding workflows</p>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                </div>
                <Icon className={`size-8 ${kpi.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search by asset manager or invite ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="changes-requested">Changes Requested</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="expired">Expired</option>
            </select>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Invites Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="text-left p-4 text-slate-600 font-semibold">Invite ID</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Asset Manager</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Relationship</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Markets</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Progress</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Status</th>
                <th className="text-left p-4 text-slate-600 font-semibold">SLA / Due</th>
                <th className="text-left p-4 text-slate-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvites.map((invite) => (
                <tr key={invite.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">
                    <span className="font-mono text-sm text-slate-900">{invite.id}</span>
                    <p className="text-slate-500 text-xs mt-1">{invite.lastUpdate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-slate-400" />
                      <span className="text-slate-900">{invite.assetManager}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{invite.relationship}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {invite.markets.map((market) => (
                        <span key={market} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {market}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">{invite.progress}%</span>
                        {invite.stage && (
                          <span className="text-slate-500">{invite.stage}</span>
                        )}
                      </div>
                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${invite.progress}%`,
                            backgroundColor: branding.primaryColor,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getStatusColor(invite.status)} gap-1`}>
                      {getStatusIcon(invite.status)}
                      {invite.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="size-4 text-slate-400" />
                      <div>
                        <p className="text-slate-600">{invite.sla}</p>
                        <p className="text-slate-500 text-xs">{invite.dueDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {(invite.status === 'new' || invite.status === 'in-progress' || invite.status === 'changes-requested') && (
                        <Button
                          size="sm"
                          onClick={() => setSelectedInvite(invite.id)}
                          style={{ backgroundColor: branding.primaryColor }}
                        >
                          {invite.status === 'new' ? 'Start' : 'Resume'}
                          <ArrowRight className="size-4 ml-1" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="size-4" />
                      </Button>
                      {invite.status === 'in-progress' && (
                        <Button size="sm" variant="outline">
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredInvites.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No invites found matching your criteria
        </div>
      )}
    </div>
  );
}
