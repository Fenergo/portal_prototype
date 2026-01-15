import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AMAIAssistant } from './AMAIAssistant';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Activity
} from 'lucide-react';

interface AMOverviewProps {
  onNavigate: (view: string) => void;
}

export function AMOverview({ onNavigate }: AMOverviewProps) {
  const metrics = [
    { label: 'Total AUM', value: '$2.4B', change: '+4.2%', trend: 'up' as const, icon: DollarSign },
    { label: 'Active Investors', value: '1,247', change: '+23', trend: 'up' as const, icon: Users },
    { label: 'Orders Today', value: '34', change: '-', trend: 'neutral' as const, icon: ShoppingCart },
    { label: 'STP Rate', value: '96.4%', change: '+1.2%', trend: 'up' as const, icon: Activity },
  ];

  const workQueues = [
    { 
      title: 'KYC Reviews', 
      count: 12, 
      urgent: 3, 
      color: 'blue',
      onClick: () => onNavigate('investors')
    },
    { 
      title: 'NIGO Orders', 
      count: 4, 
      urgent: 2, 
      color: 'orange',
      onClick: () => onNavigate('orders')
    },
    { 
      title: 'DD Approvals', 
      count: 7, 
      urgent: 1, 
      color: 'purple',
      onClick: () => onNavigate('dd')
    },
    { 
      title: 'Monitoring Alerts', 
      count: 15, 
      urgent: 5, 
      color: 'red',
      onClick: () => onNavigate('monitoring')
    },
  ];

  const recentCases = [
    {
      id: 'CASE-2891',
      investor: 'Acme Capital Partners LLC',
      type: 'Onboarding',
      status: 'kyc-review' as const,
      age: '2 days',
      assignee: 'Sarah Chen',
    },
    {
      id: 'CASE-2887',
      investor: 'Global Investment Trust',
      type: 'Maintenance',
      status: 'pending-docs' as const,
      age: '5 days',
      assignee: 'Mike Rodriguez',
    },
    {
      id: 'CASE-2882',
      investor: 'Peninsula Family Office',
      type: 'Onboarding',
      status: 'complete' as const,
      age: '1 day',
      assignee: 'Sarah Chen',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-700';
      case 'kyc-review':
        return 'bg-blue-100 text-blue-700';
      case 'pending-docs':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Asset Manager Overview</h1>
        <p className="text-slate-600">Monitor firm metrics, work queues, and operational status</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="text-slate-600">{metric.label}</div>
                <Icon className="size-5 text-slate-400" />
              </div>
              <div className="space-y-1">
                <div className="text-slate-900">{metric.value}</div>
                {metric.change !== '-' && (
                  <div className={`flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-slate-500'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="size-3" />}
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Work Queues */}
      <div>
        <h2 className="text-slate-900 mb-4">Work Queues</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {workQueues.map((queue) => (
            <Card 
              key={queue.title} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={queue.onClick}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-900">{queue.title}</h3>
                  {queue.urgent > 0 && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="size-3" />
                      {queue.urgent}
                    </Badge>
                  )}
                </div>
                <div className="text-slate-900">{queue.count}</div>
                <Button variant="ghost" size="sm" className="w-full">
                  View Queue
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Assistant */}
      <AMAIAssistant 
        workQueuesData={workQueues}
        metricsData={metrics}
        casesData={recentCases}
      />

      {/* Recent Cases & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900">Recent Cases</h2>
            <Button variant="ghost" onClick={() => onNavigate('investors')}>
              View All
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentCases.map((case_) => (
              <Card key={case_.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{case_.id}</span>
                      <span>•</span>
                      <span className="text-slate-900">{case_.investor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Badge variant="outline">{case_.type}</Badge>
                      <Badge className={getStatusColor(case_.status)}>
                        {case_.status.replace('-', ' ')}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {case_.age}
                      </span>
                    </div>
                    <div className="text-slate-500">
                      Assigned to {case_.assignee}
                    </div>
                  </div>
                  {case_.status === 'complete' && (
                    <CheckCircle2 className="size-6 text-green-600" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-slate-900 mb-4">Quick Actions</h2>
          <Card className="p-4 space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('launches')}
            >
              Create Fund Launch
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('dd')}
            >
              Initiate Counterparty DD
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('dd')}
            >
              New Security DD Case
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('investors')}
            >
              Bulk Nudge Investors
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              Generate Reports
            </Button>
          </Card>

          {/* System Status */}
          <Card className="p-4 mt-4">
            <h3 className="text-slate-900 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Portal</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Order API</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">KYC Screening</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
