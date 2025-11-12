import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Building2,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  FileText
} from 'lucide-react';

export function AMDueDiligence() {
  const [activeTab, setActiveTab] = useState('counterparty');

  const counterparties = [
    {
      id: 'DD-CP-001',
      name: 'Premier Distribution Partners',
      type: 'Distributor',
      region: 'EMEA',
      status: 'in-review' as const,
      riskScore: 'medium' as const,
      startDate: '2025-11-01',
      nextReview: '2026-11-01',
      progress: 65,
      assignee: 'Alex Kumar',
    },
    {
      id: 'DD-CP-002',
      name: 'Global Broker Network Ltd',
      type: 'Broker',
      region: 'APAC',
      status: 'approved' as const,
      riskScore: 'low' as const,
      startDate: '2025-09-15',
      nextReview: '2026-09-15',
      progress: 100,
      assignee: 'Sarah Chen',
    },
    {
      id: 'DD-CP-003',
      name: 'Regional Investment Advisors',
      type: 'Agent',
      region: 'Americas',
      status: 'pending-docs' as const,
      riskScore: 'high' as const,
      startDate: '2025-11-08',
      nextReview: null,
      progress: 35,
      assignee: 'Mike Rodriguez',
    },
  ];

  const securities = [
    {
      id: 'DD-SEC-101',
      issuer: 'TechCorp International',
      security: 'Senior Unsecured Bonds 2030',
      type: 'Corporate Bond',
      status: 'ic-review' as const,
      esgRating: 'AA',
      riskRating: 'Investment Grade',
      startDate: '2025-11-10',
      assignee: 'Investment Committee',
    },
    {
      id: 'DD-SEC-102',
      issuer: 'Green Energy Holdings',
      security: 'Equity - Common Stock',
      type: 'Equity',
      status: 'approved' as const,
      esgRating: 'AAA',
      riskRating: 'Moderate',
      startDate: '2025-10-28',
      assignee: 'David Park',
    },
  ];

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      'approved': 'bg-green-100 text-green-700',
      'in-review': 'bg-blue-100 text-blue-700',
      'pending-docs': 'bg-orange-100 text-orange-700',
      'ic-review': 'bg-purple-100 text-purple-700',
      'rejected': 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-slate-100 text-slate-700';
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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Due Diligence</h1>
          <p className="text-slate-600">Manage counterparty and security due diligence workflows</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="counterparty" className="gap-2">
            <Building2 className="size-4" />
            Counterparties
          </TabsTrigger>
          <TabsTrigger value="securities" className="gap-2">
            <TrendingUp className="size-4" />
            Securities/Assets
          </TabsTrigger>
        </TabsList>

        {/* Counterparty DD */}
        <TabsContent value="counterparty" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">
              {counterparties.length} counterparties in DD process
            </div>
            <Button className="gap-2">
              <Plus className="size-4" />
              Initiate Counterparty DD
            </Button>
          </div>

          <div className="space-y-4">
            {counterparties.map((cp) => (
              <Card key={cp.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Building2 className="size-5 text-blue-600" />
                        <h3 className="text-slate-900">{cp.name}</h3>
                        {cp.riskScore === 'high' && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="size-3" />
                            High Risk
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <span>{cp.id}</span>
                        <span>•</span>
                        <Badge variant="outline">{cp.type}</Badge>
                        <span>•</span>
                        <span>{cp.region}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(cp.status)}>
                      {cp.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>DD Progress</span>
                      <span>{cp.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${cp.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="space-y-1">
                      <div className="text-slate-500">Risk Score</div>
                      <div className={getRiskColor(cp.riskScore)}>
                        {cp.riskScore.toUpperCase()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">Started</div>
                      <div className="text-slate-900">{cp.startDate}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">Next Review</div>
                      <div className="text-slate-900">
                        {cp.nextReview || 'Pending approval'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">Assigned To</div>
                      <div className="text-slate-900">{cp.assignee}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <FileText className="size-4 mr-2" />
                      View Questionnaire
                    </Button>
                    <Button variant="outline" size="sm">Review Documents</Button>
                    {cp.status === 'in-review' && (
                      <Button size="sm">Approve</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Securities DD */}
        <TabsContent value="securities" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">
              {securities.length} securities in DD process
            </div>
            <Button className="gap-2">
              <Plus className="size-4" />
              New Security DD Case
            </Button>
          </div>

          <div className="space-y-4">
            {securities.map((sec) => (
              <Card key={sec.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="size-5 text-blue-600" />
                        <h3 className="text-slate-900">{sec.issuer}</h3>
                        {sec.esgRating === 'AAA' && (
                          <Badge className="bg-green-100 text-green-700">
                            ESG {sec.esgRating}
                          </Badge>
                        )}
                      </div>
                      <div className="text-slate-600">{sec.security}</div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span>{sec.id}</span>
                        <span>•</span>
                        <Badge variant="outline">{sec.type}</Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(sec.status)}>
                      {sec.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                    <div className="space-y-1">
                      <div className="text-slate-500">Risk Rating</div>
                      <div className="text-slate-900">{sec.riskRating}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">ESG Rating</div>
                      <div className="text-green-600">{sec.esgRating}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">DD Started</div>
                      <div className="text-slate-900">{sec.startDate}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-500">Assigned To</div>
                      <div className="text-slate-900">{sec.assignee}</div>
                    </div>
                  </div>

                  {/* IC Review Alert */}
                  {sec.status === 'ic-review' && (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Clock className="size-5 text-purple-600 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-purple-900">Pending Investment Committee Review</div>
                          <div className="text-purple-600">
                            Research complete. Awaiting IC decision scheduled for Nov 18, 2025.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <FileText className="size-4 mr-2" />
                      View Research
                    </Button>
                    <Button variant="outline" size="sm">ESG Analysis</Button>
                    {sec.status === 'ic-review' && (
                      <Button size="sm">Record IC Decision</Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <FileText className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-slate-900">Due Diligence Cycle Times</h3>
            <p className="text-slate-600">
              Target KPIs: Counterparty DD completion ≤ 10 business days • Security/Asset IC cycle ≤ 7 days
            </p>
            <div className="flex gap-4 pt-2">
              <div>
                <div className="text-slate-900">Current Avg (Counterparty)</div>
                <div className="text-blue-600">8.5 days</div>
              </div>
              <div>
                <div className="text-slate-900">Current Avg (Securities)</div>
                <div className="text-blue-600">6.2 days</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
