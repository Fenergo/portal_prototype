import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Search, 
  TrendingUp, 
  Shield, 
  Leaf,
  Globe,
  ArrowRight,
  Star,
  Info
} from 'lucide-react';
import { AccountOnboarding } from './AccountOnboarding';
import { OrderWizard } from './OrderWizard';

export function InvestorInvest() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showOrderWizard, setShowOrderWizard] = useState(false);
  const [selectedFundForOrder, setSelectedFundForOrder] = useState<string>('');

  const funds = [
    {
      id: '1',
      name: 'Global Equity Fund',
      isin: 'LU1234567890',
      category: 'Equity',
      currency: 'USD',
      minInvestment: 10000,
      nav: 124.56,
      ytdReturn: 12.4,
      fees: 0.75,
      riskRating: 5,
      esg: true,
      eligible: true,
      description: 'Diversified global equity exposure across developed markets',
    },
    {
      id: '2',
      name: 'Sustainable Bond Fund',
      isin: 'LU0987654321',
      category: 'Fixed Income',
      currency: 'USD',
      minInvestment: 5000,
      nav: 98.32,
      ytdReturn: 4.2,
      fees: 0.45,
      riskRating: 3,
      esg: true,
      eligible: true,
      description: 'Investment grade bonds with ESG screening',
    },
    {
      id: '3',
      name: 'Emerging Markets Equity',
      isin: 'LU5555555555',
      category: 'Equity',
      currency: 'USD',
      minInvestment: 25000,
      nav: 87.45,
      ytdReturn: 18.7,
      fees: 1.25,
      riskRating: 6,
      esg: false,
      eligible: true,
      description: 'High-growth potential in emerging market equities',
    },
    {
      id: '4',
      name: 'European Real Estate Fund',
      isin: 'LU7777777777',
      category: 'Real Estate',
      currency: 'EUR',
      minInvestment: 50000,
      nav: 156.78,
      ytdReturn: 6.8,
      fees: 0.95,
      riskRating: 4,
      esg: true,
      eligible: false,
      description: 'Commercial real estate across European markets',
    },
  ];

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.isin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showOnboarding) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <AccountOnboarding 
          onComplete={() => {
            setShowOnboarding(false);
            // Optionally show a success message
          }}
          onCancel={() => setShowOnboarding(false)}
        />
      </div>
    );
  }

  if (showOrderWizard) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <OrderWizard 
          onComplete={() => {
            setShowOrderWizard(false);
            // Optionally show a success message
          }}
          onCancel={() => setShowOrderWizard(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Browse Funds</h1>
        <p className="text-slate-600">Explore eligible investment opportunities</p>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input
              placeholder="Search by fund name or ISIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </Card>

      {/* Fund List */}
      <div className="space-y-4">
        {filteredFunds.map((fund) => (
          <Card 
            key={fund.id} 
            className={`p-6 transition-all ${
              fund.eligible 
                ? 'hover:shadow-lg cursor-pointer' 
                : 'opacity-60'
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-slate-900">{fund.name}</h3>
                    {fund.esg && (
                      <Badge variant="outline" className="gap-1">
                        <Leaf className="size-3" />
                        ESG
                      </Badge>
                    )}
                    {!fund.eligible && (
                      <Badge variant="secondary">Not Eligible</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span>ISIN: {fund.isin}</span>
                    <span>•</span>
                    <span>{fund.category}</span>
                  </div>
                </div>
                <div>
                  <Button 
                    disabled={!fund.eligible}
                    onClick={() => setShowOrderWizard(true)}
                  >
                    Invest Now
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600">{fund.description}</p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <div className="text-slate-500">NAV</div>
                  <div className="text-slate-900">
                    {fund.currency} {fund.nav.toFixed(2)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">YTD Return</div>
                  <div className={fund.ytdReturn >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {fund.ytdReturn > 0 ? '+' : ''}{fund.ytdReturn}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Fees (TER)</div>
                  <div className="text-slate-900">{fund.fees}%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Risk Rating</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={`size-2 rounded-full ${
                          i < fund.riskRating ? 'bg-orange-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-500">Min. Investment</div>
                  <div className="text-slate-900">
                    {fund.currency} {fund.minInvestment.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Info className="size-4 mr-2" />
                  View Prospectus
                </Button>
                <Button variant="ghost" size="sm">
                  View Fact Sheet
                </Button>
                <Button variant="ghost" size="sm">
                  View KIID
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Help Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-4">
          <Info className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-slate-900">Need help choosing?</h3>
            <p className="text-slate-600">
              Our investment specialists can help you select the right funds based on your
              investment goals, risk tolerance, and time horizon.
            </p>
            <Button variant="outline" size="sm">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}