import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Percent
} from 'lucide-react';

interface InvestorHomeProps {
  onNavigate: (view: string) => void;
}

export function InvestorHome({ onNavigate }: InvestorHomeProps) {
  const { branding } = useBranding();
  const portfolios = [
    {
      id: '1',
      name: 'Global Equity Fund',
      accountNumber: 'ACC-2891047',
      value: 247850.32,
      change: 3247.18,
      changePercent: 1.33,
      currency: 'USD',
      lastNav: '2025-11-11',
    },
    {
      id: '2',
      name: 'Sustainable Bond Fund',
      accountNumber: 'ACC-2891048',
      value: 125000.00,
      change: -412.50,
      changePercent: -0.33,
      currency: 'USD',
      lastNav: '2025-11-11',
    },
  ];

  const tasks = [
    {
      id: '1',
      title: 'Annual tax form (W-9) requires update',
      type: 'action',
      priority: 'high',
      dueDate: '2025-11-20',
    },
    {
      id: '2',
      title: 'Review Q4 2024 statement',
      type: 'info',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Subscription order settled',
      type: 'complete',
      priority: 'low',
    },
  ];

  const alerts = [
    {
      id: '1',
      message: 'Global Equity Fund - Monthly fact sheet available',
      time: '2 hours ago',
    },
    {
      id: '2',
      message: 'Upcoming cut-off: Sustainable Bond Fund (5:00 PM EST)',
      time: '4 hours ago',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Welcome back, John</h1>
        <p className="text-slate-600">Here's your portfolio overview</p>
      </div>

      {/* Total Value Summary */}
      <Card 
        className="p-6 text-white"
        style={{ 
          background: `linear-gradient(to bottom right, ${branding.primaryColor}, ${branding.primaryColor}dd)` 
        }}
      >
        <div className="space-y-2">
          <div className="text-white/80">Total Portfolio Value</div>
          <div className="flex items-baseline gap-3">
            <span className="text-white">$372,850.32</span>
            <span className="text-white/80 flex items-center gap-1">
              <TrendingUp className="size-4" />
              +$2,834.68 (0.77%)
            </span>
          </div>
          <div className="text-white/80">As of November 11, 2025</div>
        </div>
      </Card>

      {/* Portfolios & Tasks Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolios */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-900">Accounts & Portfolios</h2>
            <Button variant="ghost" onClick={() => onNavigate('invest')}>
              Browse Funds
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>

          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-slate-900">{portfolio.name}</h3>
                    <p className="text-slate-500">{portfolio.accountNumber}</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900">
                    ${portfolio.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`flex items-center gap-1 ${
                    portfolio.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {portfolio.change >= 0 ? (
                      <TrendingUp className="size-4" />
                    ) : (
                      <TrendingDown className="size-4" />
                    )}
                    ${Math.abs(portfolio.change).toFixed(2)} ({portfolio.changePercent > 0 ? '+' : ''}
                    {portfolio.changePercent}%)
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onNavigate('trades')}>
                    Place Order
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tasks & Alerts */}
        <div className="space-y-6">
          {/* Tasks */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="mt-0.5">
                    {task.type === 'complete' ? (
                      <CheckCircle2 className="size-5 text-green-600" />
                    ) : task.priority === 'high' ? (
                      <AlertCircle className="size-5 text-red-600" />
                    ) : (
                      <AlertCircle className="size-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-slate-900">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-slate-500">Due: {task.dueDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => onNavigate('requests')}>
              View All Tasks
            </Button>
          </Card>

          {/* Recent Alerts */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="space-y-1 pb-3 border-b last:border-0">
                  <p className="text-slate-900">{alert.message}</p>
                  <p className="text-slate-500">{alert.time}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => onNavigate('messages')}>
              View All Alerts
            </Button>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="size-4" />
                  <span>YTD Return</span>
                </div>
                <span className="text-green-600">+8.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <Percent className="size-4" />
                  <span>Total Fees</span>
                </div>
                <span className="text-slate-900">0.68%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
