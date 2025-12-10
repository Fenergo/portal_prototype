import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell, Mail, CheckCircle2, AlertCircle, FileText, Users, TrendingUp, Globe } from 'lucide-react';

export function CounterpartyMessages() {
  const messages = [
    {
      id: '1',
      title: 'New Onboarding Invitation Received',
      message: 'Aztec Group has invited you to begin the distribution onboarding process for Ireland and Cayman markets. Review and start onboarding in the Onboarding section.',
      time: '2 hours ago',
      read: false,
      type: 'warning' as const,
      category: 'onboarding' as const,
    },
    {
      id: '2',
      title: 'Onboarding Changes Requested - State Street',
      message: 'State Street Global Advisors has requested changes to your submitted Agreements. Please review the comments in Stage 3 (Agreements) and resubmit.',
      time: '5 hours ago',
      read: false,
      type: 'warning' as const,
      category: 'onboarding' as const,
    },
    {
      id: '3',
      title: 'New Fund Added to Library - BlackRock',
      message: 'BlackRock Alternative Investors has added "Sustainable Bond Fund - Class I EUR" to your fund library. ESG Classification: Article 9. View details in Funds Library.',
      time: '1 day ago',
      read: false,
      type: 'success' as const,
      category: 'funds' as const,
    },
    {
      id: '4',
      title: 'KYB Screening Completed - BlackRock Onboarding',
      message: 'The Know Your Business (KYB) screening for BlackRock Alternative Investors has been completed successfully. You can now proceed to the next onboarding stage.',
      time: '1 day ago',
      read: true,
      type: 'success' as const,
      category: 'onboarding' as const,
    },
    {
      id: '5',
      title: 'Fund Document Update - Global Equity Fund',
      message: 'BlackRock has uploaded a new version of the Prospectus for Global Equity Fund (v3.2, effective Dec 15, 2025). Previous version expires Dec 14, 2025. Review in Funds Library > Documents.',
      time: '2 days ago',
      read: true,
      type: 'info' as const,
      category: 'funds' as const,
    },
    {
      id: '6',
      title: 'Data Connectivity Test Scheduled - BlackRock',
      message: 'BlackRock has scheduled a UAT session for data feed connectivity testing on Dec 12, 2025 at 10:00 AM EST. Details available in Onboarding Stage 7 (UAT).',
      time: '3 days ago',
      read: true,
      type: 'info' as const,
      category: 'onboarding' as const,
    },
    {
      id: '7',
      title: 'Market Approval Received - Global Equity Fund',
      message: 'Global Equity Fund has received regulatory approval for distribution in Singapore. Fund status updated to "Active" for SG market. Dealing begins Dec 15, 2025.',
      time: '4 days ago',
      read: true,
      type: 'success' as const,
      category: 'funds' as const,
    },
    {
      id: '8',
      title: 'Compliance Notice - Q4 Distribution Analytics',
      message: 'Q4 2025 distribution analytics for Sustainable Bond Fund are now available in the fund profile. Review selling patterns and client demographics under Compliance tab.',
      time: '5 days ago',
      read: true,
      type: 'info' as const,
      category: 'funds' as const,
    },
    {
      id: '9',
      title: 'Onboarding Deadline Approaching - BlackRock',
      message: 'Your onboarding with BlackRock Alternative Investors is 45% complete. Please complete Stage 2 (KYB) by Dec 15, 2025 to stay on track.',
      time: '1 week ago',
      read: true,
      type: 'warning' as const,
      category: 'onboarding' as const,
    },
    {
      id: '10',
      title: 'SLA Update - Data Feed Health Check',
      message: 'Monthly data feed health check completed for all active funds. All endpoints operational. View detailed metrics in Funds Library > Data Feeds tab.',
      time: '1 week ago',
      read: true,
      type: 'success' as const,
      category: 'funds' as const,
    },
  ];

  const getIcon = (type: string, category: string) => {
    if (category === 'onboarding') {
      return <Users className="size-5 text-purple-600" />;
    }
    if (category === 'funds') {
      return <FileText className="size-5 text-blue-600" />;
    }
    
    switch (type) {
      case 'success':
        return <CheckCircle2 className="size-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="size-5 text-orange-600" />;
      default:
        return <Bell className="size-5 text-blue-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'onboarding':
        return <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Onboarding</Badge>;
      case 'funds':
        return <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Funds Library</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Messages & Notifications</h1>
          <p className="text-slate-600">Stay updated with important alerts and communications</p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Mail className="size-3" />
          {messages.filter(m => !m.read).length} Unread
        </Badge>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <Card 
            key={msg.id} 
            className={`p-6 cursor-pointer transition-all hover:shadow-md ${
              !msg.read ? 'bg-blue-50/50 border-blue-200' : ''
            }`}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getIcon(msg.type, msg.category)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={msg.read ? 'text-slate-900' : 'text-slate-900'}>
                      {msg.title}
                    </h3>
                    {getCategoryBadge(msg.category)}
                  </div>
                  {!msg.read && (
                    <div className="size-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-slate-600">{msg.message}</p>
                <p className="text-slate-500">{msg.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
