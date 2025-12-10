import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import {
  X,
  ArrowLeft,
  FileText,
  Globe,
  Shield,
  Database,
  Users,
  AlertCircle,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  Zap,
  TrendingUp,
  Calendar,
  Edit,
  Lock,
  Unlock
} from 'lucide-react';

interface CounterpartyFundProfileProps {
  fund: {
    id: string;
    name: string;
    shareClass: string;
    assetManager: string;
    amLogo: string;
    domicile: string;
    esgClass: string;
    status: string;
    marketsApproved: string[];
    cutoff: string;
    settlement: string;
    isin: string;
    permissions: { subs: boolean; reds: boolean; switches: boolean };
    assetClass: string;
    currency: string;
  };
  onClose: () => void;
}

export function CounterpartyFundProfile({ fund, onClose }: CounterpartyFundProfileProps) {
  const { branding } = useBranding();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'markets' | 'entitlements' | 'data' | 'contacts' | 'compliance'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FileText },
    { id: 'documents' as const, label: 'Documents', icon: FileText },
    { id: 'markets' as const, label: 'Markets & Registrations', icon: Globe },
    { id: 'entitlements' as const, label: 'Entitlements & Controls', icon: Shield },
    { id: 'data' as const, label: 'Data Feeds', icon: Database },
    { id: 'contacts' as const, label: 'Contacts & SLA', icon: Users },
    { id: 'compliance' as const, label: 'Compliance', icon: AlertCircle },
  ];

  const documents = [
    { type: 'Prospectus', version: 'v4.2', date: '2025-11-01', valid: true, expires: '2026-11-01' },
    { type: 'KIID', version: 'v3.1', date: '2025-12-01', valid: true, expires: '2026-12-01' },
    { type: 'PRIIPs KID', version: 'v2.0', date: '2025-11-15', valid: true, expires: '2026-11-15' },
    { type: 'US Disclosure', version: 'v1.3', date: '2025-10-01', valid: false, expires: '2025-12-31' },
  ];

  const marketMatrix = [
    { country: 'United States', code: 'US', status: 'approved', restrictions: 'None', localDisclosure: true },
    { country: 'United Kingdom', code: 'UK', status: 'approved', restrictions: 'None', localDisclosure: true },
    { country: 'Germany', code: 'DE', status: 'approved', restrictions: 'None', localDisclosure: true },
    { country: 'France', code: 'FR', status: 'pending', restrictions: 'Awaiting AMF clearance', localDisclosure: false },
    { country: 'Japan', code: 'JP', status: 'restricted', restrictions: 'Professional investors only', localDisclosure: true },
  ];

  const contacts = [
    { function: 'Operations', name: 'Jane Smith', email: 'j.smith@blackrock.com', phone: '+1-212-555-0100' },
    { function: 'Compliance', name: 'Michael Chen', email: 'm.chen@blackrock.com', phone: '+1-212-555-0101' },
    { function: 'Technology', name: 'Sarah Williams', email: 's.williams@blackrock.com', phone: '+1-212-555-0102' },
  ];

  const dataFeeds = [
    { type: 'Openfunds', endpoint: 'https://api.blackrock.com/openfunds', lastPush: '2025-12-10 08:00', status: 'success' },
    { type: 'EMT', endpoint: 'sftp://data.blackrock.com/emt', lastPush: '2025-12-10 08:15', status: 'success' },
    { type: 'EPT', endpoint: 'https://api.blackrock.com/ept', lastPush: '2025-12-09 23:45', status: 'error' },
    { type: 'NAV API', endpoint: 'https://api.blackrock.com/nav', lastPush: '2025-12-10 09:00', status: 'success' },
  ];

  const notices = [
    { id: 1, type: 'info', title: 'NAV delay - 2025-12-09', date: '2025-12-09', resolved: true },
    { id: 2, type: 'warning', title: 'Document update required: UK Disclosure', date: '2025-12-08', resolved: false },
    { id: 3, type: 'success', title: 'Q4 distribution analytics available', date: '2025-12-05', resolved: true },
  ];

  const obligations = [
    { task: 'Annual AML Policy Attestation', due: '2026-01-15', status: 'pending' },
    { task: 'PRIIPs KID Review', due: '2026-11-15', status: 'upcoming' },
    { task: 'Distributor Training - ESG Standards', due: '2026-02-01', status: 'pending' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Fund Facts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">ISIN</p>
                  <p className="font-mono text-slate-900">{fund.isin}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Asset Class</p>
                  <p className="text-slate-900">{fund.assetClass}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Currency</p>
                  <p className="text-slate-900">{fund.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Domicile</p>
                  <p className="text-slate-900">{fund.domicile}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">ESG Classification</p>
                  <Badge className="bg-green-600 text-white">Article {fund.esgClass}</Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge className={fund.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                    {fund.status === 'active' ? <Unlock className="size-3 mr-1" /> : <Lock className="size-3 mr-1" />}
                    {fund.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Dealing Profile</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Cut-off Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-slate-400" />
                    <p className="text-slate-900">{fund.cutoff}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Settlement</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-slate-400" />
                    <p className="text-slate-900">{fund.settlement}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Dealing Frequency</p>
                  <p className="text-slate-900">Daily</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Eligibility</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900">Professional Investors</p>
                    <p className="text-sm text-slate-600">Qualified institutional buyers and professional clients</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900">Retail Investors (Advised)</p>
                    <p className="text-sm text-slate-600">With appropriate advisor suitability check</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-900">US Retail</p>
                    <p className="text-sm text-slate-600">Not available for US retail distribution</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="size-5 text-blue-600" />
                      <h3 className="font-semibold text-slate-900">{doc.type}</h3>
                      <Badge variant="outline">v{doc.version}</Badge>
                      {doc.valid ? (
                        <Badge className="bg-green-100 text-green-700">Valid</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700">Expired</Badge>
                      )}
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-slate-600">Issued: </span>
                        <span className="text-slate-900">{doc.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Expires: </span>
                        <span className={doc.valid ? 'text-slate-900' : 'text-red-600'}>{doc.expires}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="size-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="size-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'markets':
        return (
          <div className="space-y-4">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-slate-50">
                    <tr>
                      <th className="text-left p-4 text-slate-600 font-semibold">Country</th>
                      <th className="text-left p-4 text-slate-600 font-semibold">Code</th>
                      <th className="text-left p-4 text-slate-600 font-semibold">Status</th>
                      <th className="text-left p-4 text-slate-600 font-semibold">Restrictions</th>
                      <th className="text-left p-4 text-slate-600 font-semibold">Local Disclosure</th>
                      <th className="text-left p-4 text-slate-600 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketMatrix.map((market, idx) => (
                      <tr key={idx} className="border-b hover:bg-slate-50">
                        <td className="p-4 text-slate-900">{market.country}</td>
                        <td className="p-4">
                          <Badge variant="outline">{market.code}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={
                            market.status === 'approved' ? 'bg-green-100 text-green-700' :
                            market.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {market.status === 'approved' && <CheckCircle2 className="size-3 mr-1" />}
                            {market.status === 'pending' && <Clock className="size-3 mr-1" />}
                            {market.status === 'restricted' && <Lock className="size-3 mr-1" />}
                            {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-4 text-slate-600">{market.restrictions}</td>
                        <td className="p-4">
                          {market.localDisclosure ? (
                            <Button size="sm" variant="outline">
                              <Download className="size-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-slate-400">N/A</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );

      case 'entitlements':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Trade Permissions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  {fund.permissions.subs ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : (
                    <XCircle className="size-6 text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">Subscriptions</p>
                    <p className="text-sm text-slate-600">{fund.permissions.subs ? 'Allowed' : 'Blocked'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  {fund.permissions.reds ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : (
                    <XCircle className="size-6 text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">Redemptions</p>
                    <p className="text-sm text-slate-600">{fund.permissions.reds ? 'Allowed' : 'Blocked'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  {fund.permissions.switches ? (
                    <CheckCircle2 className="size-6 text-green-600" />
                  ) : (
                    <XCircle className="size-6 text-red-600" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">Switches</p>
                    <p className="text-sm text-slate-600">{fund.permissions.switches ? 'Allowed' : 'Blocked'}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Controls & Limits</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Minimum Subscription</span>
                  <span className="font-semibold text-slate-900">$10,000 USD</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Minimum Subsequent</span>
                  <span className="font-semibold text-slate-900">$1,000 USD</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Maximum Daily Subscription</span>
                  <span className="font-semibold text-slate-900">$50M USD</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-slate-600">Redemption Notice Period</span>
                  <span className="font-semibold text-slate-900">5 business days</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Settlement Instructions</h3>
              <div className="text-sm space-y-2">
                <div>
                  <p className="text-slate-600">Bank Name:</p>
                  <p className="text-slate-900">JPMorgan Chase Bank N.A.</p>
                </div>
                <div>
                  <p className="text-slate-600">Account Number:</p>
                  <p className="text-slate-900 font-mono">1234567890</p>
                </div>
                <div>
                  <p className="text-slate-600">SWIFT/BIC:</p>
                  <p className="text-slate-900 font-mono">CHASUS33</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-4">
            {dataFeeds.map((feed, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="size-5 text-blue-600" />
                      <h3 className="font-semibold text-slate-900">{feed.type}</h3>
                      <Badge className={
                        feed.status === 'success' ? 'bg-green-100 text-green-700' :
                        feed.status === 'error' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {feed.status === 'success' && <CheckCircle2 className="size-3 mr-1" />}
                        {feed.status === 'error' && <XCircle className="size-3 mr-1" />}
                        {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-slate-600">Endpoint: </span>
                        <span className="text-slate-900 font-mono text-xs">{feed.endpoint}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Push: </span>
                        <span className="text-slate-900">{feed.lastPush}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Zap className="size-4 mr-1" />
                      Test
                    </Button>
                    {feed.status === 'error' && (
                      <Button size="sm" variant="outline">
                        View Logs
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">{contact.function}</Badge>
                      <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="size-4" />
                          <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="size-4" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">SLA Metrics</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Trade Confirmation</p>
                  <p className="text-2xl font-bold text-slate-900">T+1</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Query Response</p>
                  <p className="text-2xl font-bold text-slate-900">4 hrs</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">NAV Publication</p>
                  <p className="text-2xl font-bold text-slate-900">9:00 AM</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Obligations</h3>
              <div className="space-y-3">
                {obligations.map((obligation, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-slate-900">{obligation.task}</p>
                      <p className="text-sm text-slate-600">Due: {obligation.due}</p>
                    </div>
                    <Badge className={
                      obligation.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {obligation.status === 'pending' ? <AlertCircle className="size-3 mr-1" /> : <Clock className="size-3 mr-1" />}
                      {obligation.status.charAt(0).toUpperCase() + obligation.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Notices & Incidents</h3>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {notice.type === 'info' && <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                    {notice.type === 'warning' && <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />}
                    {notice.type === 'success' && <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{notice.title}</p>
                      <p className="text-sm text-slate-600">{notice.date}</p>
                    </div>
                    {notice.resolved && (
                      <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Distribution Analytics</h3>
              <p className="text-sm text-slate-600 mb-4">AUM by region (where permitted by Asset Manager)</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Europe</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '65%' }} />
                    </div>
                    <span className="font-semibold text-slate-900 w-16 text-right">$124M</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">North America</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '25%' }} />
                    </div>
                    <span className="font-semibold text-slate-900 w-16 text-right">$48M</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Asia Pacific</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '10%' }} />
                    </div>
                    <span className="font-semibold text-slate-900 w-16 text-right">$19M</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={onClose}>
                <ArrowLeft className="size-4 mr-1" />
                Back to Library
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src={fund.amLogo} alt={fund.assetManager} className="h-8 object-contain" />
                  <h1 className="text-2xl font-bold text-slate-900">{fund.name}</h1>
                </div>
                <p className="text-slate-600">{fund.shareClass}</p>
              </div>
            </div>
            <Button style={{ backgroundColor: branding.primaryColor }} className="gap-2">
              <Edit className="size-4" />
              Request Change
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  style={activeTab === tab.id ? { backgroundColor: branding.primaryColor } : undefined}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-7xl mx-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}
