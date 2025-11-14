import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { useBranding } from '../BrandingContext';
import { 
  Rocket,
  Users,
  CheckCircle2,
  Clock,
  Mail,
  ExternalLink,
  Plus
} from 'lucide-react';

export function AMFundLaunches() {
  const { branding } = useBranding();
  const launches = [
    {
      id: 'LAUNCH-001',
      fund: 'Sustainable Infrastructure Fund',
      shareClasses: ['Class A', 'Class I', 'Class R'],
      status: 'active' as const,
      invites: {
        sent: 245,
        opened: 187,
        accepted: 142,
        declined: 12,
      },
      launchDate: '2025-12-01',
      cutoffDate: '2025-11-25',
      daysRemaining: 13,
    },
    {
      id: 'LAUNCH-002',
      fund: 'Asia-Pacific Growth Equity',
      shareClasses: ['Class A', 'Class I'],
      status: 'draft' as const,
      invites: {
        sent: 0,
        opened: 0,
        accepted: 0,
        declined: 0,
      },
      launchDate: '2026-01-15',
      cutoffDate: null,
      daysRemaining: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-slate-100 text-slate-700';
      case 'closed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Fund Launches</h1>
          <p className="text-slate-600">Manage fund launch campaigns and track invitation metrics</p>
        </div>
        <Button className="gap-2" style={{ backgroundColor: branding.primaryColor }}>
          <Plus className="size-4" />
          Create New Launch
        </Button>
      </div>

      {/* Launches List */}
      <div className="space-y-6">
        {launches.map((launch) => {
          const acceptanceRate = launch.invites.sent > 0
            ? (launch.invites.accepted / launch.invites.sent) * 100
            : 0;
          
          return (
            <Card key={launch.id} className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Rocket className="size-6 text-blue-600" />
                      <h2 className="text-slate-900">{launch.fund}</h2>
                      <Badge className={getStatusColor(launch.status)}>
                        {launch.status.charAt(0).toUpperCase() + launch.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span>{launch.id}</span>
                      <span>•</span>
                      <span>{launch.shareClasses.join(', ')}</span>
                      <span>•</span>
                      <span>Launch: {launch.launchDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="size-4 mr-2" />
                      View Microsite
                    </Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                {/* Time Remaining */}
                {launch.daysRemaining !== null && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="size-5 text-blue-600" />
                      <div>
                        <div className="text-blue-900">
                          {launch.daysRemaining} days until cut-off
                        </div>
                        <div className="text-blue-600">
                          Invite deadline: {launch.cutoffDate}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Invitation Metrics */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900">Invitation Metrics</h3>
                    {launch.status === 'active' && (
                      <Button variant="outline" size="sm">
                        <Mail className="size-4 mr-2" />
                        Send Invites
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <Card className="p-4 bg-slate-50">
                      <div className="space-y-1">
                        <div className="text-slate-500">Sent</div>
                        <div className="text-slate-900">{launch.invites.sent}</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-blue-50">
                      <div className="space-y-1">
                        <div className="text-blue-600">Opened</div>
                        <div className="text-blue-900">
                          {launch.invites.opened}
                          {launch.invites.sent > 0 && (
                            <span className="text-blue-600 ml-2">
                              ({Math.round((launch.invites.opened / launch.invites.sent) * 100)}%)
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-green-50">
                      <div className="space-y-1">
                        <div className="text-green-600">Accepted</div>
                        <div className="text-green-900">
                          {launch.invites.accepted}
                          {launch.invites.sent > 0 && (
                            <span className="text-green-600 ml-2">
                              ({Math.round(acceptanceRate)}%)
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-red-50">
                      <div className="space-y-1">
                        <div className="text-red-600">Declined</div>
                        <div className="text-red-900">{launch.invites.declined}</div>
                      </div>
                    </Card>
                  </div>

                  {/* Progress Bar */}
                  {launch.invites.sent > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Acceptance Progress</span>
                        <span>{acceptanceRate.toFixed(1)}% accepted</span>
                      </div>
                      <Progress value={acceptanceRate} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div>
                  <h3 className="text-slate-900 mb-3">Launch Readiness</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span>Fund documentation uploaded</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span>Target markets defined</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="size-5 text-green-600" />
                      <span>Invite lists prepared</span>
                    </div>
                    {launch.status === 'draft' && (
                      <div className="flex items-center gap-3 text-slate-400">
                        <div className="size-5 border-2 border-slate-300 rounded-full" />
                        <span>Invitations sent</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {launch.status === 'draft' && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button style={{ backgroundColor: branding.primaryColor }}>Activate Launch</Button>
                    <Button variant="outline">Preview Microsite</Button>
                    <Button variant="outline">Manage Materials</Button>
                  </div>
                )}
                {launch.status === 'active' && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline">View Invite List</Button>
                    <Button variant="outline">Download Report</Button>
                    <Button variant="outline">Manage Materials</Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Help Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <Users className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-slate-900">Launch Best Practices</h3>
            <p className="text-slate-600">
              Target 40% invitation acceptance within 7 days. Send reminder emails to non-responders
              at day 3 and day 5. Ensure all fund documentation is approved and uploaded before
              activating the launch.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
