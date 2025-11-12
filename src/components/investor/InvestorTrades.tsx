import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  RefreshCw,
  Download,
  Clock
} from 'lucide-react';

export function InvestorTrades() {
  const orders = [
    {
      id: 'ORD-2025-001234',
      fund: 'Global Equity Fund',
      type: 'subscription' as const,
      amount: 50000,
      currency: 'USD',
      status: 'settled' as const,
      submittedDate: '2025-11-08',
      settledDate: '2025-11-11',
      nav: 124.56,
      shares: 401.54,
    },
    {
      id: 'ORD-2025-001189',
      fund: 'Sustainable Bond Fund',
      type: 'subscription' as const,
      amount: 25000,
      currency: 'USD',
      status: 'acknowledged' as const,
      submittedDate: '2025-11-11',
      nav: null,
      shares: null,
    },
    {
      id: 'ORD-2025-000987',
      fund: 'Global Equity Fund',
      type: 'redemption' as const,
      shares: 100,
      currency: 'USD',
      status: 'settled' as const,
      submittedDate: '2025-10-28',
      settledDate: '2025-11-01',
      nav: 122.34,
      amount: 12234,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'acknowledged':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'submitted':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return <ArrowDownCircle className="size-5 text-green-600" />;
      case 'redemption':
        return <ArrowUpCircle className="size-5 text-red-600" />;
      case 'switch':
        return <RefreshCw className="size-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Trade Orders</h1>
          <p className="text-slate-600">View your order history and status</p>
        </div>
        <Button>Place New Order</Button>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Clock className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-slate-900">
              Cut-off times vary by fund. Orders received after cut-off will be processed on the next dealing day.
            </p>
            <p className="text-slate-600">
              Global Equity Fund: 5:00 PM EST • Sustainable Bond Fund: 3:00 PM EST
            </p>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getTypeIcon(order.type)}
                  <div>
                    <h3 className="text-slate-900">{order.fund}</h3>
                    <p className="text-slate-500">Order ID: {order.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <div className="text-slate-500">Type</div>
                  <div className="text-slate-900 capitalize">{order.type}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">
                    {order.type === 'redemption' ? 'Shares' : 'Amount'}
                  </div>
                  <div className="text-slate-900">
                    {order.type === 'redemption'
                      ? `${order.shares} shares`
                      : `${order.currency} ${order.amount?.toLocaleString()}`}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Submitted</div>
                  <div className="text-slate-900">{order.submittedDate}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">
                    {order.status === 'settled' ? 'Settled' : 'Expected Settlement'}
                  </div>
                  <div className="text-slate-900">
                    {order.settledDate || 'Pending'}
                  </div>
                </div>
              </div>

              {/* Settlement Details */}
              {order.nav && (
                <div className="p-4 bg-slate-50 rounded-lg grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-slate-500">NAV Price</div>
                    <div className="text-slate-900">
                      {order.currency} {order.nav.toFixed(2)}
                    </div>
                  </div>
                  {order.type === 'subscription' && order.shares && (
                    <div className="space-y-1">
                      <div className="text-slate-500">Shares Allocated</div>
                      <div className="text-slate-900">{order.shares.toFixed(2)}</div>
                    </div>
                  )}
                  {order.type === 'redemption' && order.amount && (
                    <div className="space-y-1">
                      <div className="text-slate-500">Proceeds</div>
                      <div className="text-slate-900">
                        {order.currency} {order.amount.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="size-4 mr-2" />
                  Download Confirmation
                </Button>
                {order.status === 'settled' && (
                  <Button variant="ghost" size="sm">
                    View Transaction Details
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
