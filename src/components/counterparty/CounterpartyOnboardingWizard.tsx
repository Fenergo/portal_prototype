import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { useBranding } from '../BrandingContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
  FileText,
  Shield,
  Handshake,
  Database,
  Users,
  FlaskConical,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  MessageSquare,
  Eye,
  Download,
  Check
} from 'lucide-react';

interface CounterpartyOnboardingWizardProps {
  invite: {
    id: string;
    assetManager: string;
    relationship: string;
    markets: string[];
  };
  onClose: () => void;
}

export function CounterpartyOnboardingWizard({ invite, onClose }: CounterpartyOnboardingWizardProps) {
  const { branding } = useBranding();
  const [currentStage, setCurrentStage] = useState(1);
  const [showMessages, setShowMessages] = useState(false);
  
  const stages = [
    { id: 1, label: 'Entity', icon: Building2, complete: false },
    { id: 2, label: 'KYB', icon: Shield, complete: false },
    { id: 3, label: 'Agreements', icon: Handshake, complete: false },
    { id: 4, label: 'Policies', icon: FileText, complete: false },
    { id: 5, label: 'Data & Connectivity', icon: Database, complete: false },
    { id: 6, label: 'Users & Permissions', icon: Users, complete: false },
    { id: 7, label: 'UAT', icon: FlaskConical, complete: false },
    { id: 8, label: 'Submit', icon: Send, complete: false },
  ];

  const timeline = [
    { label: 'KYB Submitted', status: 'complete', date: '2025-12-08' },
    { label: 'Documents Uploaded', status: 'complete', date: '2025-12-09' },
    { label: 'Screening In Progress', status: 'current', date: 'In progress' },
    { label: 'Approved', status: 'pending', date: 'Pending' },
  ];

  const openQuestions = [
    { id: 1, question: 'Please clarify AML procedures for APAC region', from: 'BlackRock Compliance', due: '2025-12-15', priority: 'high' },
    { id: 2, question: 'Additional beneficial owner documentation needed', from: 'BlackRock Legal', due: '2025-12-20', priority: 'medium' },
  ];

  const handleNext = () => {
    if (currentStage < stages.length) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1: // Entity
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Entity Information</h2>
              <p className="text-slate-600">Link to your golden record or provide entity details</p>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Use Existing Golden Record</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    We found a matching entity record on file. Click below to auto-populate this onboarding.
                  </p>
                  <Button size="sm" style={{ backgroundColor: branding.primaryColor }}>
                    Use Golden Record
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="legalName">Legal Entity Name</Label>
                <Input id="legalName" placeholder="Enter legal name" />
              </div>
              <div>
                <Label htmlFor="lei">Legal Entity Identifier (LEI)</Label>
                <Input id="lei" placeholder="e.g., 549300XXXXXXXXXXXX" />
              </div>
              <div>
                <Label htmlFor="domicile">Domicile</Label>
                <select id="domicile" className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                  <option value="">Select domicile</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IE">Ireland</option>
                  <option value="LU">Luxembourg</option>
                  <option value="KY">Cayman Islands</option>
                </select>
              </div>
              <div>
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input id="taxId" placeholder="Enter tax identifier" />
              </div>
            </div>

            <div>
              <Label>FATCA / CRS Classification</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">FATCA Classification: Active NFFE</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">CRS: Financial Institution</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 2: // KYB
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Know Your Business (KYB)</h2>
              <p className="text-slate-600">Upload required documentation and screening information</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">Certificate of Incorporation</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle2 className="size-3 mr-1" />
                    Uploaded
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">COI_2024_v2.pdf • Uploaded 2025-12-08</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="size-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-slate-400" />
                    <span className="font-semibold text-slate-900">W-8BEN-E / W-9</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="size-4" />
                  Upload Document
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-slate-400" />
                    <span className="font-semibold text-slate-900">AML Policy Document</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="size-4" />
                  Upload Document
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="size-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">Sanctions & PEP Screening</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Clock className="size-3 mr-1" />
                    In Progress
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Automated screening against OFAC, UN, EU sanctions lists and PEP databases
                </p>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '65%' }} />
                </div>
              </Card>
            </div>
          </div>
        );

      case 3: // Agreements
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Agreements & Commercials</h2>
              <p className="text-slate-600">Review, negotiate, and sign distribution agreements</p>
            </div>

            <Card className="p-4 bg-orange-50 border-orange-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Action Required</h3>
                  <p className="text-sm text-slate-600">
                    Asset Manager has requested changes to Section 4.2 (Fee Schedule). Please review and approve.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Distribution Agreement</h3>
                    <p className="text-sm text-slate-600">Master Distribution Agreement v3.2</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">Under Negotiation</Badge>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Eye className="size-4 mr-1" />
                    View Document
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="size-4 mr-1" />
                    4 Comments
                  </Button>
                  <Button size="sm" style={{ backgroundColor: branding.primaryColor }}>
                    Review Changes
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Fee & Rebate Schedule</h3>
                    <p className="text-sm text-slate-600">Commission structure and payment terms</p>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700">Draft</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-slate-600">Base Commission:</span>
                    <span className="ml-2 font-semibold">0.75%</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Volume Rebate:</span>
                    <span className="ml-2 font-semibold">Tiered</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Service Level Agreement</h3>
                    <p className="text-sm text-slate-600">Operational SLAs and support terms</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle2 className="size-3 mr-1" />
                    Agreed
                  </Badge>
                </div>
              </Card>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-slate-900 mb-3">E-Signature</h3>
              <p className="text-sm text-slate-600 mb-4">
                Once all documents are finalized, they will require multi-signatory approval.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="size-4 text-green-600" />
                  <span className="text-slate-600">Signatory 1: John Smith (Authorized)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-slate-400" />
                  <span className="text-slate-600">Signatory 2: Pending assignment</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Policies
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Policies & Attestations</h2>
              <p className="text-slate-600">Review and attest to compliance policies</p>
            </div>

            <div className="space-y-4">
              {[
                { policy: 'AML/CTF Policy', status: 'complete', renewal: '2026-12-01' },
                { policy: 'Anti-Bribery & Corruption', status: 'complete', renewal: '2026-12-01' },
                { policy: 'Conflicts of Interest', status: 'pending', renewal: null },
                { policy: 'Marketing & ESG Naming Guidelines', status: 'pending', renewal: null },
              ].map((item, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{item.policy}</h3>
                      {item.renewal && (
                        <p className="text-sm text-slate-600">Renewal: {item.renewal}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {item.status === 'complete' ? (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle2 className="size-3 mr-1" />
                          Attested
                        </Badge>
                      ) : (
                        <>
                          <Button size="sm" variant="outline">
                            View Policy
                          </Button>
                          <Button size="sm" style={{ backgroundColor: branding.primaryColor }}>
                            Attest
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5: // Data & Connectivity
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Data & Connectivity</h2>
              <p className="text-slate-600">Configure data exchange and connectivity settings</p>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Openfunds / EMT / EPT / EET Mapping</h3>
              <p className="text-sm text-slate-600 mb-4">
                Map your data fields to standardized templates with field-level validation
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="text-sm">Fund Name → Openfunds: FundName</span>
                  <Badge className="bg-green-100 text-green-700">Mapped</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="text-sm">ISIN → Openfunds: ISIN</span>
                  <Badge className="bg-green-100 text-green-700">Mapped</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                  <span className="text-sm">NAV → EMT: NetAssetValue</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Validation Required</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Transport Setup</h3>
              <div className="space-y-4">
                <div>
                  <Label>Connection Method</Label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg mt-1">
                    <option value="sftp">SFTP</option>
                    <option value="api">REST API</option>
                    <option value="ftps">FTPS</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Host / Endpoint</Label>
                    <Input placeholder="sftp.example.com" />
                  </div>
                  <div>
                    <Label>Port</Label>
                    <Input placeholder="22" />
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  Test Connection
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Country Registrations</h3>
              <p className="text-sm text-slate-600 mb-3">
                Select markets where you'll distribute
              </p>
              <div className="grid grid-cols-3 gap-2">
                {invite.markets.map((market) => (
                  <label key={market} className="flex items-center gap-2 p-2 border rounded">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">{market}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>
        );

      case 6: // Users & Permissions
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Users & Permissions</h2>
              <p className="text-slate-600">Add team members and configure access controls</p>
            </div>

            <Button style={{ backgroundColor: branding.primaryColor }} className="gap-2">
              <Users className="size-4" />
              Add Team Member
            </Button>

            <div className="space-y-3">
              {[
                { name: 'John Smith', email: 'j.smith@example.com', role: 'Admin', status: 'Active', mfa: true },
                { name: 'Sarah Johnson', email: 's.johnson@example.com', role: 'Operations', status: 'Active', mfa: true },
                { name: 'Mike Chen', email: 'm.chen@example.com', role: 'Compliance', status: 'Pending', mfa: false },
              ].map((user, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{user.name}</h3>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{user.role}</Badge>
                      <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {user.status}
                      </Badge>
                      {user.mfa && (
                        <Badge className="bg-blue-100 text-blue-700">2FA</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">SSO Configuration</h3>
              <p className="text-sm text-slate-600 mb-3">
                Enable single sign-on for your organization
              </p>
              <Button size="sm" variant="outline">Configure SSO</Button>
            </Card>
          </div>
        );

      case 7: // UAT
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">User Acceptance Testing</h2>
              <p className="text-slate-600">Complete UAT checklist before going live</p>
            </div>

            <div className="space-y-3">
              {[
                { task: 'Trial data exchange completed', status: 'complete' },
                { task: 'Sample fund data pack validated', status: 'complete' },
                { task: 'Digital trade template dry run', status: 'in-progress' },
                { task: 'End-to-end workflow test', status: 'pending' },
              ].map((item, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900">{item.task}</span>
                    {item.status === 'complete' ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="size-3 mr-1" />
                        Complete
                      </Badge>
                    ) : item.status === 'in-progress' ? (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Clock className="size-3 mr-1" />
                        In Progress
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">Start Test</Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 8: // Submit
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Submit for Review</h2>
              <p className="text-slate-600">Final review before submitting to Asset Manager</p>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Maker-Checker Approval</h3>
              <p className="text-sm text-slate-600 mb-3">
                Internal review required before submission to {invite.assetManager}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-green-600" />
                  <span>Prepared by: John Smith</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-slate-400" />
                  <span>Pending review by: Sarah Johnson (Compliance Officer)</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Checklist</h3>
              <div className="space-y-2">
                {[
                  'All required documents uploaded',
                  'KYB screening completed',
                  'Agreements signed',
                  'Policy attestations complete',
                  'Data connectivity tested',
                  'Team members added',
                  'UAT checklist complete',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-600" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Request Internal Review
              </Button>
              <Button style={{ backgroundColor: branding.primaryColor }} className="flex-1 gap-2">
                <Send className="size-4" />
                Submit to Asset Manager
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex">
      {/* Sidebar - Stage Navigator */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-slate-900">Onboarding</h2>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
              <X className="size-5 text-slate-600" />
            </button>
          </div>
          <p className="text-sm text-slate-600">{invite.id}</p>
          <p className="text-sm font-semibold text-slate-900 mt-1">{invite.assetManager}</p>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-1">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = stage.id === currentStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => setCurrentStage(stage.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  style={isActive ? { backgroundColor: branding.primaryColor } : undefined}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{stage.label}</span>
                  {stage.complete && !isActive && (
                    <CheckCircle2 className="size-4 ml-auto text-green-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Timeline</h3>
            <div className="space-y-3">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`size-2 rounded-full ${
                      item.status === 'complete' ? 'bg-green-600' :
                      item.status === 'current' ? 'bg-blue-600' :
                      'bg-slate-300'
                    }`} />
                    {idx < timeline.length - 1 && (
                      <div className="w-px h-8 bg-slate-200" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Questions */}
        {openQuestions.length > 0 && (
          <div className="border-t p-4">
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-orange-600" />
                <span className="text-sm font-semibold text-slate-900">Open Questions</span>
              </div>
              <Badge className="bg-orange-100 text-orange-700">{openQuestions.length}</Badge>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {renderStageContent()}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t bg-white p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStage === 1}
            >
              <ChevronLeft className="size-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                Stage {currentStage} of {stages.length}
              </span>
            </div>
            <Button
              onClick={handleNext}
              disabled={currentStage === stages.length}
              style={{ backgroundColor: branding.primaryColor }}
            >
              {currentStage === stages.length ? 'Complete' : 'Next'}
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Panel */}
      {showMessages && (
        <div className="w-96 bg-white border-l flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Open Questions</h3>
            <button onClick={() => setShowMessages(false)}>
              <X className="size-5 text-slate-600" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {openQuestions.map((q) => (
              <Card key={q.id} className="p-4">
                <Badge className={`mb-2 ${q.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                  {q.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                </Badge>
                <p className="text-sm text-slate-900 mb-2">{q.question}</p>
                <p className="text-xs text-slate-600">From: {q.from}</p>
                <p className="text-xs text-slate-600">Due: {q.due}</p>
                <Button size="sm" className="mt-3 w-full" style={{ backgroundColor: branding.primaryColor }}>
                  Respond
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
