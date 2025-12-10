import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  User,
  Building2,
  FileText,
  CreditCard,
  CheckCircle2,
  Upload,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface CounterpartyAccountOnboardingProps {
  onComplete: () => void;
  onCancel: () => void;
}

type OnboardingStep = 'type' | 'entity' | 'kyc' | 'banking' | 'review';

export function CounterpartyAccountOnboarding({ onComplete, onCancel }: CounterpartyAccountOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('type');
  const [investorType, setInvestorType] = useState<string>('');

  const steps = [
    { id: 'type', label: 'Investor Type', icon: User },
    { id: 'entity', label: 'Entity Details', icon: Building2 },
    { id: 'kyc', label: 'KYC/Documents', icon: FileText },
    { id: 'banking', label: 'Banking Details', icon: CreditCard },
    { id: 'review', label: 'Review & Sign', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const renderInvestorTypeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Select Investor Type</h2>
        <p className="text-slate-600">Choose the type that best describes your investment entity</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { value: 'retail', label: 'Retail Investor', description: 'Individual investor' },
          { value: 'professional', label: 'Professional Investor', description: 'Certified professional' },
          { value: 'institutional', label: 'Institutional', description: 'Corporate/Fund entity' },
        ].map((type) => (
          <Card
            key={type.value}
            className={`p-6 cursor-pointer transition-all ${
              investorType === type.value
                ? 'border-blue-600 bg-blue-50'
                : 'hover:border-slate-300'
            }`}
            onClick={() => setInvestorType(type.value)}
          >
            <div className="space-y-2">
              <h3 className="text-slate-900">{type.label}</h3>
              <p className="text-slate-600">{type.description}</p>
              {investorType === type.value && (
                <CheckCircle2 className="size-5 text-blue-600" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            Your investor type determines eligibility for certain funds and the documentation
            required for account opening. This classification is based on regulatory definitions.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => setCurrentStep('entity')} disabled={!investorType}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderEntityDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Entity Information</h2>
        <p className="text-slate-600">Provide details about your legal entity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="entityName">Legal Entity Name *</Label>
          <Input id="entityName" placeholder="Enter full legal name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lei">Legal Entity Identifier (LEI)</Label>
          <Input id="lei" placeholder="Optional" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country of Incorporation *</Label>
          <Input id="country" placeholder="Select country" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax Identification Number *</Label>
          <Input id="taxId" placeholder="Enter TIN/EIN" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Registered Address *</Label>
        <Input id="address" placeholder="Street address" className="mb-2" />
        <div className="grid md:grid-cols-3 gap-2">
          <Input placeholder="City" />
          <Input placeholder="State/Province" />
          <Input placeholder="Postal Code" />
        </div>
      </div>

      {investorType === 'institutional' && (
        <div className="space-y-4">
          <h3 className="text-slate-900">Beneficial Owners (UBOs)</h3>
          <Card className="p-4 bg-slate-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-900">Owner 1: John Smith</span>
                <Badge variant="outline">25% ownership</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="size-4 mr-2" />
                Add Additional Owner
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('type')}>Back</Button>
        <Button onClick={() => setCurrentStep('kyc')}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderKYCStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">KYC Documentation</h2>
        <p className="text-slate-600">Upload required identity and verification documents</p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-slate-900">Certificate of Incorporation</h3>
              <p className="text-slate-500">Required for entity verification</p>
            </div>
            <Badge className="bg-red-100 text-red-700">Required</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="size-4 mr-2" />
            Upload Document
          </Button>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-slate-900">Articles of Association</h3>
              <p className="text-slate-500">Governing documents</p>
            </div>
            <Badge className="bg-red-100 text-red-700">Required</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="size-4 mr-2" />
            Upload Document
          </Button>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-slate-900">Proof of Address</h3>
              <p className="text-slate-500">Utility bill or bank statement (within 3 months)</p>
            </div>
            <Badge className="bg-red-100 text-red-700">Required</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="size-4 mr-2" />
            Upload Document
          </Button>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-slate-900">ID Documents (All UBOs)</h3>
              <p className="text-slate-500">Passport or government-issued ID</p>
            </div>
            <Badge className="bg-red-100 text-red-700">Required</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="size-4 mr-2" />
            Upload Documents
          </Button>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-slate-900">Tax Forms (W-8BEN-E)</h3>
              <p className="text-slate-500">Completed and uploaded</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            All documents will be securely encrypted and stored in compliance with data protection
            regulations (GDPR/CCPA). Documents are verified against sanctions and PEP databases.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('entity')}>Back</Button>
        <Button onClick={() => setCurrentStep('banking')}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderBankingStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Banking Details</h2>
        <p className="text-slate-600">Provide account details for subscriptions and redemptions</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input id="bankName" placeholder="Enter bank name" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name *</Label>
            <Input id="accountName" placeholder="Account holder name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input id="accountNumber" placeholder="Enter account number" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number / Sort Code *</Label>
            <Input id="routingNumber" placeholder="e.g., 123456789" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swift">SWIFT/BIC Code *</Label>
            <Input id="swift" placeholder="e.g., CHASUS33" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="iban">IBAN (for international transfers)</Label>
          <Input id="iban" placeholder="Optional" />
        </div>

        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-slate-900">Bank Verification Document</h3>
              <p className="text-slate-500">Void check or bank letter confirming account details</p>
            </div>
            <Badge className="bg-red-100 text-red-700">Required</Badge>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="size-4 mr-2" />
            Upload Document
          </Button>
        </Card>
      </div>

      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            Changes to banking details require dual approval (maker-checker) for security.
            All updates are subject to verification and may take 2-3 business days.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('kyc')}>Back</Button>
        <Button onClick={() => setCurrentStep('review')}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Review & Sign</h2>
        <p className="text-slate-600">Review your information and complete required signatures</p>
      </div>

      {/* Summary */}
      <Card className="p-6 space-y-4">
        <h3 className="text-slate-900">Application Summary</h3>
        <div className="space-y-3 text-slate-600">
          <div className="flex justify-between py-2 border-b">
            <span>Investor Type:</span>
            <span className="text-slate-900 capitalize">{investorType}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Legal Entity:</span>
            <span className="text-slate-900">Acme Capital Partners LLC</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Jurisdiction:</span>
            <span className="text-slate-900">United States</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Documents Uploaded:</span>
            <span className="text-slate-900">5 of 5</span>
          </div>
        </div>
      </Card>

      {/* Acknowledgments */}
      <Card className="p-4 space-y-3">
        <h3 className="text-slate-900">Required Acknowledgments</h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I confirm that all information provided is true and accurate to the best of my knowledge
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I have read and agree to the Terms and Conditions and Privacy Policy
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I understand that my information will be screened against sanctions and PEP databases
            </span>
          </label>
        </div>
      </Card>

      {/* E-Signature Notice */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <FileText className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-3">
            <h3 className="text-slate-900">Electronic Signature Required</h3>
            <p className="text-slate-600">
              After submitting this application, you and all authorized signatories will receive
              DocuSign requests to electronically sign the account opening documents.
            </p>
            <div className="text-slate-600">
              Required signatures:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Account Application & Agreement</li>
                <li>Risk Disclosure Statement</li>
                <li>Anti-Money Laundering Certification</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('banking')}>Back</Button>
        <Button onClick={onComplete}>
          Submit Application
          <CheckCircle2 className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Account Opening</h1>
          <Badge variant="outline">Step {currentStepIndex + 1} of {steps.length}</Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isComplete = index < currentStepIndex;
            return (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${
                  isActive ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-slate-400'
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <Icon className="size-5" />
                )}
                <span className="hidden md:inline">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8">
        {currentStep === 'type' && renderInvestorTypeStep()}
        {currentStep === 'entity' && renderEntityDetailsStep()}
        {currentStep === 'kyc' && renderKYCStep()}
        {currentStep === 'banking' && renderBankingStep()}
        {currentStep === 'review' && renderReviewStep()}
      </Card>
    </div>
  );
}
