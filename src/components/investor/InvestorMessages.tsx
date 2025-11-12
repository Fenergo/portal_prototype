import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function InvestorMessages() {
  const messages = [
    {
      id: '1',
      title: 'Subscription Order Confirmed',
      message: 'Your subscription order ORD-2025-001234 for Global Equity Fund has been confirmed and settled.',
      time: '2 hours ago',
      read: false,
      type: 'success' as const,
    },
    {
      id: '2',
      title: 'Monthly Factsheet Available',
      message: 'The October 2025 factsheet for Global Equity Fund is now available in your documents section.',
      time: '1 day ago',
      read: false,
      type: 'info' as const,
    },
    {
      id: '3',
      title: 'Action Required: Tax Form Update',
      message: 'Your annual tax form (W-9) requires an update. Please complete this by November 20, 2025.',
      time: '2 days ago',
      read: true,
      type: 'warning' as const,
    },
    {
      id: '4',
      title: 'Q3 2025 Statement Ready',
      message: 'Your quarterly account statement for Q3 2025 is now available for download.',
      time: '1 week ago',
      read: true,
      type: 'info' as const,
    },
    {
      id: '5',
      title: 'Cut-off Reminder',
      message: 'Reminder: The cut-off time for Sustainable Bond Fund orders is 3:00 PM EST today.',
      time: '1 week ago',
      read: true,
      type: 'info' as const,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="size-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="size-5 text-orange-600" />;
      default:
        return <Bell className="size-5 text-blue-600" />;
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
                {getIcon(msg.type)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={msg.read ? 'text-slate-900' : 'text-slate-900'}>
                    {msg.title}
                  </h3>
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
