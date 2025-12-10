import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useBranding } from '../BrandingContext';
import { 
  User,
  FileText,
  CreditCard,
  Users,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';

export function CounterpartyAccountMaintenance() {
  const { branding } = useBranding();
  const [activeTab, setActiveTab] = useState('profile');

  const kycDocuments = [
    {
      id: '1',
      name: 'Certificate of Incorporation',
      status: 'approved' as const,
      uploadDate: '2024-01-15',
      expiryDate: null,
      version: '1.0',
    },
    {
      id: '2',
      name: 'Articles of Association',
      status: 'approved' as const,
      uploadDate: '2024-01-15',
      expiryDate: null,
      version: '1.0',
    },
    {
      id: '3',
      name: 'Tax Form W-8BEN-E',
      status: 'expiring-soon' as const,
      uploadDate: '2024-01-15',
      expiryDate: '2025-12-31',
      version: '2.0',
    },
    {
      id: '4',
      name: 'Proof of Address',
      status: 'expired' as const,
      uploadDate: '2024-08-20',
      expiryDate: '2025-11-20',
      version: '1.0',
    },
  ];

  const changeRequests = [
    {
      id: 'REQ-001',
      type: 'Banking Update',
      status: 'pending-approval' as const,
      submitted: '2025-11-10',
      description: 'Update wire instructions for USD account',
    },
    {
      id: 'REQ-002',
      type: 'Address Change',
      status: 'approved' as const,
      submitted: '2025-10-28',
      description: 'Updated registered office address',
    },
  ];

  const getDocStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-blue-100 text-blue-700';
      case 'expiring-soon':
        return 'bg-orange-100 text-orange-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending-approval':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Account Maintenance</h1>
        <p className="text-slate-600">Update your account details and manage KYC documentation</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-orange-900">Action Required: Tax Form Expiring</div>
              <p className="text-orange-700 mt-1">
                Your W-8BEN-E form expires on December 31, 2025. Please upload an updated form
                to avoid trading restrictions.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Upload New Form
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-red-900">Document Expired: Proof of Address</div>
              <p className="text-red-700 mt-1">
                Your proof of address has expired. Please upload a recent utility bill or bank
                statement (within 3 months).
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Upload Document
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="kyc" className="gap-2">
            <FileText className="size-4" />
            KYC Documents
          </TabsTrigger>
          <TabsTrigger value="banking" className="gap-2">
            <CreditCard className="size-4" />
            Banking
          </TabsTrigger>
          <TabsTrigger value="signatories" className="gap-2">
            <Users className="size-4" />
            Signatories
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <Clock className="size-4" />
            Change Requests
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Entity Information</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entityName">Legal Entity Name</Label>
                  <Input id="entityName" defaultValue="Acme Capital Partners LLC" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lei">Legal Entity Identifier (LEI)</Label>
                  <Input id="lei" defaultValue="549300ABCD1234567890" disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Registered Address</Label>
                <Input id="address" defaultValue="123 Finance Street" className="mb-2" />
                <div className="grid md:grid-cols-3 gap-2">
                  <Input defaultValue="New York" />
                  <Input defaultValue="NY" />
                  <Input defaultValue="10001" />
                </div>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-slate-600">
                    Address changes require proof of new address and may take 2-3 business days
                    to process. Updates to legal entity name require additional documentation.
                  </div>
                </div>
              </Card>

              <div className="flex gap-2">
                <Button style={{ backgroundColor: branding.primaryColor }}>Request Address Change</Button>
                <Button variant="outline">Update Contact Details</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-slate-900 mb-4">Contact Preferences</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Primary Email</Label>
                  <Input id="email" type="email" defaultValue="contact@acmecapital.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <Button style={{ backgroundColor: branding.primaryColor }}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* KYC Documents Tab */}
        <TabsContent value="kyc" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">
              {kycDocuments.length} documents on file
            </div>
            <Button style={{ backgroundColor: branding.primaryColor }}>
              <Upload className="size-4 mr-2" />
              Upload New Document
            </Button>
          </div>

          <div className="space-y-3">
            {kycDocuments.map((doc) => (
              <Card key={doc.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-blue-600" />
                      <h3 className="text-slate-900">{doc.name}</h3>
                      <Badge className={getDocStatusColor(doc.status)}>
                        {doc.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span>Uploaded: {doc.uploadDate}</span>
                      {doc.expiryDate && (
                        <>
                          <span>•</span>
                          <span>Expires: {doc.expiryDate}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>Version {doc.version}</span>
                    </div>

                    {doc.status === 'expired' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-3">
                        <div className="text-red-900">
                          This document has expired. Please upload a new version to maintain
                          account compliance.
                        </div>
                      </div>
                    )}

                    {doc.status === 'expiring-soon' && (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg mt-3">
                        <div className="text-orange-900">
                          This document will expire soon. Please upload a renewed version.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    {['expired', 'expiring-soon'].includes(doc.status) && (
                      <Button size="sm">
                        <Upload className="size-4 mr-2" />
                        Upload New
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-slate-900">KYC Refresh Schedule</h3>
                <p className="text-slate-600">
                  Your account undergoes periodic KYC reviews based on risk rating. Your next
                  scheduled review is in 8 months. You will be notified 30 days in advance.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Banking Tab */}
        <TabsContent value="banking" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900">Primary Bank Account (USD)</h3>
                <p className="text-slate-500">For subscriptions and redemptions</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Verified</Badge>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-slate-600">Bank Name:</span>
                <span className="text-slate-900">Chase Bank N.A.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Account Name:</span>
                <span className="text-slate-900">Acme Capital Partners LLC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Account Number:</span>
                <span className="text-slate-900">****5678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">SWIFT:</span>
                <span className="text-slate-900">CHASUS33</span>
              </div>
            </div>

            <Card className="p-4 bg-orange-50 border-orange-200 mt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-slate-600">
                  Banking changes require dual approval (maker-checker) and verification.
                  Changes typically take 2-3 business days to process. You must upload bank
                  verification documents.
                </div>
              </div>
            </Card>

            <Button className="mt-4">Request Banking Change</Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900">Secondary Bank Account (EUR)</h3>
                <p className="text-slate-500">For EUR-denominated funds</p>
              </div>
              <Button variant="outline" size="sm">
                <Upload className="size-4 mr-2" />
                Add Account
              </Button>
            </div>
            <p className="text-slate-600">No secondary account configured</p>
          </Card>
        </TabsContent>

        {/* Signatories Tab */}
        <TabsContent value="signatories" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">
              Manage authorized signatories for your account
            </div>
            <Button style={{ backgroundColor: branding.primaryColor }}>
              <Users className="size-4 mr-2" />
              Add Signatory
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <User className="size-5 text-blue-600" />
                    <h3 className="text-slate-900">John Smith</h3>
                    <Badge>Primary</Badge>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                  <div className="text-slate-600">Managing Director</div>
                  <div className="text-slate-500">john.smith@acmecapital.com</div>
                  <div className="text-slate-500">Authority: All transactions, account changes</div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <User className="size-5 text-blue-600" />
                    <h3 className="text-slate-900">Sarah Johnson</h3>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                  <div className="text-slate-600">Chief Financial Officer</div>
                  <div className="text-slate-500">sarah.johnson@acmecapital.com</div>
                  <div className="text-slate-500">Authority: Transactions up to $1M</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <Users className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-slate-900">Signatory Management</h3>
                <p className="text-slate-600">
                  Changes to signatories require identity verification and may involve
                  board resolution uploads. All signatories must complete KYC and provide
                  ID documentation.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Change Requests Tab */}
        <TabsContent value="requests" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-slate-600">
              Track your account maintenance requests
            </div>
          </div>

          <div className="space-y-3">
            {changeRequests.map((request) => (
              <Card key={request.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-slate-900">{request.type}</h3>
                      <Badge className={getRequestStatusColor(request.status)}>
                        {request.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-slate-600">{request.description}</div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <span>{request.id}</span>
                      <span>•</span>
                      <span>Submitted: {request.submitted}</span>
                    </div>

                    {request.status === 'pending-approval' && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
                        <div className="flex items-center gap-2">
                          <Clock className="size-5 text-blue-600" />
                          <div className="text-blue-900">
                            Under review. Estimated completion: 2-3 business days
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
