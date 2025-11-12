import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Search, 
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';

export function AMOrders() {
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: 'ORD-2025-001234',
      investor: 'Acme Capital Partners LLC',
      fund: 'Global Equity Fund',
      type: 'subscription' as const,
      amount: 500000,
      currency: 'USD',
      status: 'acknowledged' as const,
      submitted: '2025-11-12 09:23',
      cutoff: '2025-11-12 17:00',
      nav: null,
      exception: null,
    },
    {
      id: 'ORD-2025-001233',
      investor: 'Peninsula Family Office',
      fund: 'Sustainable Bond Fund',
      type: 'redemption' as const,
      shares: 5000,
      currency: 'USD',
      status: 'nigo' as const,
      submitted: '2025-11-12 08:45',
      cutoff: '2025-11-12 15:00',
      nav: null,
      exception: 'Bank details mismatch',
    },
    {
      id: 'ORD-2025-001232',
      investor: 'Global Investment Trust',
      fund: 'Global Equity Fund',
      type: 'subscription' as const,
      amount: 250000,
      currency: 'USD',
      status: 'allocated' as const,
      submitted: '2025-11-11 14:22',
      cutoff: '2025-11-11 17:00',
      nav: 124.56,
      exception: null,
    },
    {
      id: 'ORD-2025-001231',
      investor: 'TechVentures Investment Group',
      fund: 'Emerging Markets Equity',
      type: 'switch' as const,
      amount: 100000,
      currency: 'USD',
      status: 'settled' as const,
      submitted: '2025-11-11 10:15',
      cutoff: '2025-11-11 17:00',
      nav: 87.45,
      exception: null,
    },
  ];

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      'submitted': { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
      'acknowledged': { label: 'Acknowledged', color: 'bg-purple-100 text-purple-700' },
      'allocated': { label: 'Allocated', color: 'bg-yellow-100 text-yellow-700' },
      'settled': { label: 'Settled', color: 'bg-green-100 text-green-700' },
      'nigo': { label: 'NIGO', color: 'bg-red-100 text-red-700' },
    };
    return statusMap[status] || { label: status, color: 'bg-slate-100 text-slate-700' };
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

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.investor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.fund.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: orders.length,
    nigo: orders.filter(o => o.status === 'nigo').length,
    pending: orders.filter(o => !['settled', 'nigo'].includes(o.status)).length,
    stpRate: 96.4,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Order Book</h1>
          <p className="text-slate-600">Manage and monitor all fund orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">Generate Confirmations</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="space-y-1">
            <div className="text-blue-600">Today's Orders</div>
            <div className="text-blue-900">{stats.total}</div>
          </div>
        </Card>
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="space-y-1">
            <div className="text-orange-600">Pending</div>
            <div className="text-orange-900">{stats.pending}</div>
          </div>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="space-y-1">
            <div className="text-red-600">NIGO</div>
            <div className="text-red-900">{stats.nigo}</div>
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="space-y-1">
            <div className="text-green-600">STP Rate</div>
            <div className="text-green-900">{stats.stpRate}%</div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            placeholder="Search by order ID, investor, or fund..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order.status);

          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(order.type)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-slate-900">{order.investor}</h3>
                        {order.exception && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="size-3" />
                            Exception
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span>{order.id}</span>
                        <span>•</span>
                        <span>{order.fund}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                </div>

                {/* Exception Details */}
                {order.exception && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-red-900">Exception: {order.exception}</div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            Review Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Investor
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid md:grid-cols-5 gap-4 pt-4 border-t">
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
                        ? `${order.shares?.toLocaleString()} shares`
                        : `${order.currency} ${order.amount?.toLocaleString()}`}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">Submitted</div>
                    <div className="text-slate-900">{order.submitted}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">Cut-off</div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4 text-slate-400" />
                      <span className="text-slate-900">{order.cutoff.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">NAV</div>
                    <div className="text-slate-900">
                      {order.nav ? `${order.currency} ${order.nav}` : 'Pending'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  {order.status === 'nigo' && (
                    <Button size="sm">Remediate</Button>
                  )}
                  {order.status === 'allocated' && (
                    <Button variant="outline" size="sm">Generate Confirmation</Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
