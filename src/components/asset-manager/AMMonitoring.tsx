import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import { 
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  FileText,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export function AMMonitoring() {
  const { branding } = useBranding();
  const alerts = [
    {
      id: 'ALERT-8912',
      rule: 'Velocity - High Transaction Frequency',
      severity: 'high' as const,
      investor: 'Acme Capital Partners LLC',
      details: '5 transactions in 48 hours, threshold: 3',
      triggered: '2 hours ago',
      status: 'open' as const,
      assignee: null,
    },
    {
      id: 'ALERT-8911',
      rule: 'Unusual Amount - Large Redemption',
      severity: 'medium' as const,
      investor: 'Global Investment Trust',
      details: 'Redemption $2.5M, avg: $450K',
      triggered: '5 hours ago',
      status: 'investigating' as const,
      assignee: 'Compliance Team',
    },
    {
      id: 'ALERT-8909',
      rule: 'Jurisdiction Risk - High-Risk Country',
      severity: 'high' as const,
      investor: 'Peninsula Holdings Ltd',
      details: 'Wire transfer from sanctioned jurisdiction',
      triggered: '1 day ago',
      status: 'escalated' as const,
      assignee: 'AML Officer',
    },
    {
      id: 'ALERT-8905',
      rule: 'Structuring Pattern Detected',
      severity: 'medium' as const,
      investor: 'TechVentures Investment Group',
      details: 'Multiple transactions just under reporting threshold',
      triggered: '2 days ago',
      status: 'false-positive' as const,
      assignee: 'Mike Rodriguez',
    },
  ];

  const stats = {
    totalAlerts: 847,
    open: 12,
    investigating: 5,
    truPositiveRate: 32.4,
    avgDispositionTime: 1.8,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      'open': 'bg-blue-100 text-blue-700',
      'investigating': 'bg-purple-100 text-purple-700',
      'escalated': 'bg-red-100 text-red-700',
      'false-positive': 'bg-slate-100 text-slate-700',
      'closed': 'bg-green-100 text-green-700',
    };
    return map[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Transaction Monitoring</h1>
          <p className="text-slate-600">Monitor alerts, triage cases, and manage SAR/STR filings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Rules Library</Button>
          <Button variant="outline">Analytics</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="size-8 text-blue-600" />
            <div>
              <div className="text-slate-900">{stats.totalAlerts}</div>
              <div className="text-slate-500">Total Alerts (30d)</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-8 text-orange-600" />
            <div>
              <div className="text-orange-900">{stats.open}</div>
              <div className="text-orange-600">Open</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3">
            <Shield className="size-8 text-purple-600" />
            <div>
              <div className="text-purple-900">{stats.investigating}</div>
              <div className="text-purple-600">Investigating</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="space-y-1">
            <div className="text-green-600">True Positive Rate</div>
            <div className="text-green-900">{stats.truPositiveRate}%</div>
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-1">
            <div className="text-blue-600">Avg Disposition</div>
            <div className="text-blue-900">{stats.avgDispositionTime} days</div>
          </div>
        </Card>
      </div>

      {/* Alert Queue */}
      <div>
        <h2 className="text-slate-900 mb-4">Alert Queue</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Shield className="size-5 text-blue-600" />
                      <h3 className="text-slate-900">{alert.rule}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <span>{alert.id}</span>
                      <span>•</span>
                      <span>{alert.investor}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Details */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="text-slate-900">{alert.details}</div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-slate-600 pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <span>Triggered: {alert.triggered}</span>
                    {alert.assignee && (
                      <>
                        <span>•</span>
                        <span>Assigned to: {alert.assignee}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {alert.status === 'open' && (
                    <>
                      <Button size="sm" style={{ backgroundColor: branding.primaryColor }}>Investigate</Button>
                      <Button variant="outline" size="sm">Assign</Button>
                    </>
                  )}
                  {alert.status === 'investigating' && (
                    <>
                      <Button size="sm" variant="destructive">
                        <AlertTriangle className="size-4 mr-2" />
                        Escalate / Create Case
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="size-4 mr-2" />
                        Mark False Positive
                      </Button>
                    </>
                  )}
                  {alert.status === 'escalated' && (
                    <Button size="sm" style={{ backgroundColor: branding.primaryColor }}>
                      <FileText className="size-4 mr-2" />
                      Prepare SAR/STR
                    </Button>
                  )}
                  {alert.status === 'false-positive' && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span>Closed as false positive</span>
                    </div>
                  )}
                  <Button variant="ghost" size="sm">
                    <FileText className="size-4 mr-2" />
                    View Full Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 bg-purple-50 border-purple-200">
          <div className="flex items-start gap-4">
            <TrendingUp className="size-6 text-purple-600 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-slate-900">Model Performance</h3>
              <p className="text-slate-600">
                Current true positive rate: 32.4% (target: ≥30%). Rules are tuned quarterly with
                backtesting to reduce false positives while maintaining compliance coverage.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <FileText className="size-6 text-blue-600 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-slate-900">Regulatory Reporting</h3>
              <p className="text-slate-600">
                SAR/STR filings are tracked with full audit trails. Average time to disposition: 1.8 days
                (target: ≤2 days). All dispositions require documented rationale.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
