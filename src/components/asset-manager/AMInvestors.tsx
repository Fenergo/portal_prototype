import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Search, 
  Filter,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Mail
} from 'lucide-react';

export function AMInvestors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const cases = [
    {
      id: 'CASE-2891',
      investor: 'Acme Capital Partners LLC',
      type: 'institutional',
      status: 'kyc-review' as const,
      riskRating: 'medium' as const,
      age: 2,
      sla: 5,
      assignee: 'Sarah Chen',
      progress: 65,
      lastActivity: '2 hours ago',
    },
    {
      id: 'CASE-2887',
      investor: 'Global Investment Trust',
      type: 'institutional',
      status: 'pending-docs' as const,
      riskRating: 'low' as const,
      age: 5,
      sla: 5,
      assignee: 'Mike Rodriguez',
      progress: 45,
      lastActivity: '1 day ago',
    },
    {
      id: 'CASE-2882',
      investor: 'Peninsula Family Office',
      type: 'professional',
      status: 'complete' as const,
      riskRating: 'low' as const,
      age: 1,
      sla: 5,
      assignee: 'Sarah Chen',
      progress: 100,
      lastActivity: '3 hours ago',
    },
    {
      id: 'CASE-2879',
      investor: 'Johnson Retirement Fund',
      type: 'retail',
      status: 'screening' as const,
      riskRating: 'high' as const,
      age: 3,
      sla: 5,
      assignee: 'Alex Kumar',
      progress: 30,
      lastActivity: '4 hours ago',
    },
    {
      id: 'CASE-2875',
      investor: 'TechVentures Investment Group',
      type: 'institutional',
      status: 'approval' as const,
      riskRating: 'medium' as const,
      age: 4,
      sla: 5,
      assignee: 'Sarah Chen',
      progress: 85,
      lastActivity: '30 mins ago',
    },
  ];

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      'kyc-review': { label: 'KYC Review', color: 'bg-blue-100 text-blue-700' },
      'pending-docs': { label: 'Pending Docs', color: 'bg-orange-100 text-orange-700' },
      'screening': { label: 'Screening', color: 'bg-purple-100 text-purple-700' },
      'approval': { label: 'Approval', color: 'bg-yellow-100 text-yellow-700' },
      'complete': { label: 'Complete', color: 'bg-green-100 text-green-700' },
    };
    return statusMap[status] || { label: status, color: 'bg-slate-100 text-slate-700' };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.investor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: cases.length,
    pending: cases.filter(c => c.status !== 'complete').length,
    overdue: cases.filter(c => c.age > c.sla && c.status !== 'complete').length,
    highRisk: cases.filter(c => c.riskRating === 'high').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Investor Onboarding & Maintenance</h1>
          <p className="text-slate-600">Manage investor cases and workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="size-4 mr-2" />
            Bulk Nudge
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="size-8 text-blue-600" />
            <div>
              <div className="text-slate-900">{stats.total}</div>
              <div className="text-slate-500">Total Cases</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="size-8 text-orange-600" />
            <div>
              <div className="text-slate-900">{stats.pending}</div>
              <div className="text-slate-500">In Progress</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-8 text-red-600" />
            <div>
              <div className="text-slate-900">{stats.overdue}</div>
              <div className="text-slate-500">Overdue</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-8 text-green-600" />
            <div>
              <div className="text-slate-900">{stats.highRisk}</div>
              <div className="text-slate-500">High Risk</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              placeholder="Search by investor name or case ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === 'kyc-review' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('kyc-review')}
            >
              KYC Review
            </Button>
            <Button 
              variant={filterStatus === 'pending-docs' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending-docs')}
            >
              Pending Docs
            </Button>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredCases.map((case_) => {
          const statusInfo = getStatusInfo(case_.status);
          const isOverdue = case_.age > case_.sla && case_.status !== 'complete';

          return (
            <Card key={case_.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-slate-900">{case_.investor}</h3>
                      {isOverdue && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="size-3" />
                          SLA Breach
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <span>{case_.id}</span>
                      <span>•</span>
                      <Badge variant="outline" className="capitalize">{case_.type}</Badge>
                      <span>•</span>
                      <span className={getRiskColor(case_.riskRating)}>
                        {case_.riskRating.toUpperCase()} Risk
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-slate-400" />
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                    <span>{case_.progress}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${case_.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-slate-600 pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span>Assigned to {case_.assignee}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {case_.age} days old
                    </span>
                  </div>
                  <span>Last activity: {case_.lastActivity}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
