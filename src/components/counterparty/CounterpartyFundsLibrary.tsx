import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useBranding } from '../BrandingContext';
import { 
  Search, 
  Filter,
  Download,
  Calendar,
  Eye,
  Building2,
  Globe,
  Leaf,
  Lock,
  Unlock,
  FileText,
  TrendingUp,
  AlertCircle,
  Clock,
  LayoutGrid,
  List
} from 'lucide-react';
import { CounterpartyFundProfile } from './CounterpartyFundProfile';

export function CounterpartyFundsLibrary() {
  const { branding } = useBranding();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grouped' | 'all'>('grouped');
  const [displayMode, setDisplayMode] = useState<'cards' | 'table'>('cards');
  const [selectedFund, setSelectedFund] = useState<string | null>(null);
  const [filterAM, setFilterAM] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const funds = [
    {
      id: 'FUND-001',
      name: 'Global Equity Fund',
      shareClass: 'Class A USD',
      assetManager: 'BlackRock Alternative Investors',
      amLogo: '/portal_prototype/BR_logo.png',
      domicile: 'Luxembourg',
      esgClass: '8',
      status: 'active' as const,
      marketsApproved: ['US', 'UK', 'DE', 'FR', 'LU'],
      cutoff: '5:00 PM EST',
      settlement: 'T+3',
      lastUpdate: '2025-12-09',
      isin: 'LU1234567890',
      permissions: { subs: true, reds: true, switches: true },
      assetClass: 'Equity',
      currency: 'USD',
    },
    {
      id: 'FUND-002',
      name: 'Sustainable Bond Fund',
      shareClass: 'Class I EUR',
      assetManager: 'BlackRock Alternative Investors',
      amLogo: '/portal_prototype/BR_logo.png',
      domicile: 'Ireland',
      esgClass: '9',
      status: 'active' as const,
      marketsApproved: ['UK', 'IE', 'DE', 'NL'],
      cutoff: '12:00 PM CET',
      settlement: 'T+2',
      lastUpdate: '2025-12-10',
      isin: 'IE0987654321',
      permissions: { subs: true, reds: true, switches: false },
      assetClass: 'Fixed Income',
      currency: 'EUR',
    },
    {
      id: 'FUND-003',
      name: 'Aztec Infrastructure Fund',
      shareClass: 'Class A GBP',
      assetManager: 'Aztec Group',
      amLogo: '/portal_prototype/AzG_logo.png',
      domicile: 'Cayman Islands',
      esgClass: '6',
      status: 'active' as const,
      marketsApproved: ['UK', 'KY'],
      cutoff: '4:00 PM GMT',
      settlement: 'T+5',
      lastUpdate: '2025-12-08',
      isin: 'KY1122334455',
      permissions: { subs: true, reds: false, switches: false },
      assetClass: 'Alternative',
      currency: 'GBP',
    },
    {
      id: 'FUND-004',
      name: 'Asia Pacific Growth',
      shareClass: 'Class I USD',
      assetManager: 'Aztec Group',
      amLogo: '/portal_prototype/AzG_logo.png',
      domicile: 'Singapore',
      esgClass: '8',
      status: 'soft-blocked' as const,
      marketsApproved: ['SG', 'HK', 'JP'],
      cutoff: '3:00 PM SGT',
      settlement: 'T+3',
      lastUpdate: '2025-12-07',
      isin: 'SG9988776655',
      permissions: { subs: false, reds: true, switches: true },
      assetClass: 'Equity',
      currency: 'USD',
    },
    {
      id: 'FUND-005',
      name: 'European Real Estate',
      shareClass: 'Class R EUR',
      assetManager: 'BlackRock Alternative Investors',
      amLogo: '/portal_prototype/BR_logo.png',
      domicile: 'Luxembourg',
      esgClass: '9',
      status: 'pending-approval' as const,
      marketsApproved: ['LU', 'DE'],
      cutoff: '2:00 PM CET',
      settlement: 'T+4',
      lastUpdate: '2025-12-06',
      isin: 'LU5544332211',
      permissions: { subs: false, reds: false, switches: false },
      assetClass: 'Real Estate',
      currency: 'EUR',
    },
  ];

  const assetManagers = [...new Set(funds.map(f => f.assetManager))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'soft-blocked':
        return 'bg-orange-100 text-orange-700';
      case 'hard-blocked':
        return 'bg-red-100 text-red-700';
      case 'pending-approval':
        return 'bg-yellow-100 text-yellow-700';
      case 'suspended':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getEsgBadge = (esgClass: string) => {
    const colors: Record<string, string> = {
      '9': 'bg-green-600',
      '8': 'bg-green-500',
      '6': 'bg-blue-500',
    };
    return colors[esgClass] || 'bg-slate-400';
  };

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fund.shareClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fund.isin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAM = filterAM === 'all' || fund.assetManager === filterAM;
    const matchesStatus = filterStatus === 'all' || fund.status === filterStatus;
    return matchesSearch && matchesAM && matchesStatus;
  });

  const groupedFunds = assetManagers.reduce((acc, am) => {
    acc[am] = filteredFunds.filter(f => f.assetManager === am);
    return acc;
  }, {} as Record<string, typeof funds>);

  if (selectedFund) {
    const fund = funds.find(f => f.id === selectedFund);
    return (
      <CounterpartyFundProfile
        fund={fund!}
        onClose={() => setSelectedFund(null)}
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Funds Library</h1>
          <p className="text-slate-600">All funds you're registered to administer or distribute</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Bulk Download
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="size-4" />
            Export Calendars
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Building2 className="size-8 text-blue-600" />
            <div>
              <p className="text-sm text-slate-600">Asset Managers</p>
              <p className="text-2xl font-bold text-slate-900">{assetManagers.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="size-8 text-green-600" />
            <div>
              <p className="text-sm text-slate-600">Active Funds</p>
              <p className="text-2xl font-bold text-slate-900">
                {funds.filter(f => f.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Globe className="size-8 text-purple-600" />
            <div>
              <p className="text-sm text-slate-600">Markets</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Leaf className="size-8 text-green-600" />
            <div>
              <p className="text-sm text-slate-600">ESG Funds</p>
              <p className="text-2xl font-bold text-slate-900">
                {funds.filter(f => ['8', '9'].includes(f.esgClass)).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Controls */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="Search by fund name, share class, or ISIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={filterAM}
            onChange={(e) => setFilterAM(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Asset Managers</option>
            {assetManagers.map(am => (
              <option key={am} value={am}>{am}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="soft-blocked">Soft Blocked</option>
            <option value="pending-approval">Pending Approval</option>
          </select>
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" />
            More Filters
          </Button>
          <div className="flex gap-1 border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-3 py-1 rounded ${viewMode === 'grouped' ? 'bg-slate-100' : ''}`}
            >
              Grouped
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 rounded ${viewMode === 'all' ? 'bg-slate-100' : ''}`}
            >
              All Funds
            </button>
          </div>
          <div className="flex gap-1 border rounded-lg p-1">
            <button
              onClick={() => setDisplayMode('cards')}
              className={`p-2 rounded ${displayMode === 'cards' ? 'bg-slate-100' : ''}`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setDisplayMode('table')}
              className={`p-2 rounded ${displayMode === 'table' ? 'bg-slate-100' : ''}`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Funds Display */}
      {displayMode === 'table' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="text-left p-4 text-slate-600 font-semibold">Fund / Share Class</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Asset Manager</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Domicile</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">ESG</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Status</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Markets</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Dealing</th>
                  <th className="text-left p-4 text-slate-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(viewMode === 'all' ? filteredFunds : filteredFunds).map((fund) => (
                  <tr key={fund.id} className="border-b hover:bg-slate-50">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{fund.name}</p>
                        <p className="text-sm text-slate-600">{fund.shareClass}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{fund.isin}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img src={fund.amLogo} alt={fund.assetManager} className="h-6 object-contain" />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-900">{fund.domicile}</span>
                    </td>
                    <td className="p-4">
                      <div className={`w-8 h-8 rounded-full ${getEsgBadge(fund.esgClass)} flex items-center justify-center text-white text-sm font-bold`}>
                        {fund.esgClass}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(fund.status)}>
                        {fund.status === 'active' ? <Unlock className="size-3 mr-1" /> : <Lock className="size-3 mr-1" />}
                        {fund.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {fund.marketsApproved.slice(0, 3).map((market) => (
                          <span key={market} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {market}
                          </span>
                        ))}
                        {fund.marketsApproved.length > 3 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                            +{fund.marketsApproved.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-slate-900">{fund.cutoff}</p>
                        <p className="text-slate-600">{fund.settlement}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        onClick={() => setSelectedFund(fund.id)}
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        <Eye className="size-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {viewMode === 'grouped' ? (
            Object.entries(groupedFunds).map(([am, amFunds]) => (
              amFunds.length > 0 && (
                <div key={am}>
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={amFunds[0].amLogo} 
                      alt={am} 
                      className="h-8 object-contain"
                    />
                    <h2 className="text-xl font-bold text-slate-900">{am}</h2>
                    <Badge variant="outline">{amFunds.length} funds</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {amFunds.map((fund) => (
                      <Card key={fund.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900 mb-1">{fund.name}</h3>
                              <p className="text-sm text-slate-600">{fund.shareClass}</p>
                              <p className="text-xs text-slate-500 font-mono mt-1">{fund.isin}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-full ${getEsgBadge(fund.esgClass)} flex items-center justify-center text-white font-bold`}>
                              {fund.esgClass}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Globe className="size-4 text-slate-400" />
                            <span className="text-sm text-slate-600">{fund.domicile}</span>
                          </div>

                          <div className="flex gap-1 flex-wrap">
                            {fund.marketsApproved.slice(0, 4).map((market) => (
                              <span key={market} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                {market}
                              </span>
                            ))}
                            {fund.marketsApproved.length > 4 && (
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                                +{fund.marketsApproved.length - 4}
                              </span>
                            )}
                          </div>

                          <div className="pt-3 border-t">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-slate-600">Cut-off:</span>
                              <span className="text-slate-900">{fund.cutoff}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mb-3">
                              <span className="text-slate-600">Settlement:</span>
                              <span className="text-slate-900">{fund.settlement}</span>
                            </div>
                            <Badge className={`w-full justify-center ${getStatusColor(fund.status)}`}>
                              {fund.status === 'active' ? <Unlock className="size-3 mr-1" /> : <Lock className="size-3 mr-1" />}
                              {fund.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </Badge>
                          </div>

                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedFund(fund.id)}
                            style={{ backgroundColor: branding.primaryColor }}
                          >
                            View Details
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFunds.map((fund) => (
                <Card key={fund.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{fund.name}</h3>
                        <p className="text-sm text-slate-600">{fund.shareClass}</p>
                        <p className="text-xs text-slate-500 font-mono mt-1">{fund.isin}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full ${getEsgBadge(fund.esgClass)} flex items-center justify-center text-white font-bold`}>
                        {fund.esgClass}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src={fund.amLogo} alt={fund.assetManager} className="h-5 object-contain" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="size-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{fund.domicile}</span>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {fund.marketsApproved.slice(0, 4).map((market) => (
                        <span key={market} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {market}
                        </span>
                      ))}
                      {fund.marketsApproved.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          +{fund.marketsApproved.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">Cut-off:</span>
                        <span className="text-slate-900">{fund.cutoff}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-slate-600">Settlement:</span>
                        <span className="text-slate-900">{fund.settlement}</span>
                      </div>
                      <Badge className={`w-full justify-center ${getStatusColor(fund.status)}`}>
                        {fund.status === 'active' ? <Unlock className="size-3 mr-1" /> : <Lock className="size-3 mr-1" />}
                        {fund.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedFund(fund.id)}
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {filteredFunds.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No funds found matching your criteria
        </div>
      )}
    </div>
  );
}
