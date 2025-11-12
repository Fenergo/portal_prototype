import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  PenTool,
  ChevronRight,
  Download
} from 'lucide-react';

interface OrderWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

type OrderStep = 'fund' | 'details' | 'documents' | 'signatures' | 'confirm';

export function OrderWizard({ onComplete, onCancel }: OrderWizardProps) {
  const [currentStep, setCurrentStep] = useState<OrderStep>('fund');
  const [selectedFund, setSelectedFund] = useState<string>('');
  const [selectedShareClass, setSelectedShareClass] = useState<string>('');

  const steps = [
    { id: 'fund', label: 'Select Fund', icon: TrendingUp },
    { id: 'details', label: 'Order Details', icon: DollarSign },
    { id: 'documents', label: 'Review Documents', icon: FileText },
    { id: 'signatures', label: 'E-Signatures', icon: PenTool },
    { id: 'confirm', label: 'Confirmation', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const funds = [
    {
      id: 'fund-1',
      name: 'Global Equity Fund',
      shareClasses: [
        { id: 'A', name: 'Class A', minInvestment: 10000, currency: 'USD', fees: 0.75 },
        { id: 'I', name: 'Class I', minInvestment: 100000, currency: 'USD', fees: 0.50 },
      ],
      nav: 124.56,
      cutoff: '17:00 EST',
    },
    {
      id: 'fund-2',
      name: 'Sustainable Bond Fund',
      shareClasses: [
        { id: 'A', name: 'Class A', minInvestment: 5000, currency: 'USD', fees: 0.45 },
        { id: 'R', name: 'Class R', minInvestment: 25000, currency: 'USD', fees: 0.30 },
      ],
      nav: 98.32,
      cutoff: '15:00 EST',
    },
  ];

  const signatories = [
    { id: '1', name: 'John Smith', title: 'Managing Director', email: 'john.smith@acmecapital.com', status: 'pending' as const },
    { id: '2', name: 'Sarah Johnson', title: 'Chief Financial Officer', email: 'sarah.johnson@acmecapital.com', status: 'pending' as const },
    { id: '3', name: 'Michael Chen', title: 'Investment Director', email: 'michael.chen@acmecapital.com', status: 'pending' as const },
    { id: '4', name: 'Emily Rodriguez', title: 'Compliance Officer', email: 'emily.rodriguez@acmecapital.com', status: 'pending' as const },
    { id: '5', name: 'David Park', title: 'Operations Manager', email: 'david.park@acmecapital.com', status: 'pending' as const },
  ];

  const [signatureStatuses, setSignatureStatuses] = useState(signatories);

  const selectedFundData = funds.find(f => f.id === selectedFund);
  const selectedShareClassData = selectedFundData?.shareClasses.find(sc => sc.id === selectedShareClass);

  const renderFundSelectionStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Select Fund & Share Class</h2>
        <p className="text-slate-600">Choose the fund and share class for your investment</p>
      </div>

      <div className="space-y-4">
        {funds.map((fund) => (
          <Card
            key={fund.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedFund === fund.id
                ? 'border-blue-600 bg-blue-50'
                : 'hover:border-slate-300'
            }`}
            onClick={() => {
              setSelectedFund(fund.id);
              setSelectedShareClass('');
            }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-slate-900">{fund.name}</h3>
                  <div className="flex items-center gap-3 text-slate-500 mt-1">
                    <span>NAV: ${fund.nav}</span>
                    <span>•</span>
                    <span>Cut-off: {fund.cutoff}</span>
                  </div>
                </div>
                {selectedFund === fund.id && (
                  <CheckCircle2 className="size-6 text-blue-600" />
                )}
              </div>

              {selectedFund === fund.id && (
                <div className="pt-4 border-t space-y-3">
                  <div className="text-slate-900">Select Share Class:</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {fund.shareClasses.map((shareClass) => (
                      <Card
                        key={shareClass.id}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedShareClass === shareClass.id
                            ? 'border-blue-600 bg-blue-100'
                            : 'hover:border-slate-300'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShareClass(shareClass.id);
                        }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-900">{shareClass.name}</span>
                            {selectedShareClass === shareClass.id && (
                              <CheckCircle2 className="size-5 text-blue-600" />
                            )}
                          </div>
                          <div className="space-y-1 text-slate-600">
                            <div>Min: ${shareClass.minInvestment.toLocaleString()}</div>
                            <div>Fees: {shareClass.fees}%</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={() => setCurrentStep('details')} 
          disabled={!selectedFund || !selectedShareClass}
        >
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderOrderDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Order Details</h2>
        <p className="text-slate-600">Enter your subscription amount and select trade date</p>
      </div>

      {/* Selected Fund Summary */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="space-y-2">
          <div className="text-slate-600">Selected Fund</div>
          <div className="text-slate-900">{selectedFundData?.name}</div>
          <div className="text-slate-600">{selectedShareClassData?.name}</div>
        </div>
      </Card>

      {/* Order Amount */}
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Subscription Amount *</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input 
              id="amount" 
              type="number" 
              placeholder="Enter amount"
              className="pl-10"
              defaultValue="50000"
            />
          </div>
          <div className="text-slate-500">
            Minimum: ${selectedShareClassData?.minInvestment.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tradeDate">Trade Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <Input 
              id="tradeDate" 
              type="date" 
              className="pl-10"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="text-slate-500">
            Cut-off time: {selectedFundData?.cutoff}
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-600">Subscription Amount:</span>
            <span className="text-slate-900">$50,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Management Fee ({selectedShareClassData?.fees}%):</span>
            <span className="text-slate-900">$375.00/year</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span className="text-slate-900">Estimated Shares:</span>
            <span className="text-slate-900">401.54</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            Orders received after the cut-off time will be processed on the next dealing day.
            NAV will be determined at the trade date valuation point.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('fund')}>Back</Button>
        <Button onClick={() => setCurrentStep('documents')}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Review Fund Documents</h2>
        <p className="text-slate-600">Please review and acknowledge the following documents</p>
      </div>

      <div className="space-y-3">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="text-slate-900">Fund Prospectus</h3>
                <p className="text-slate-600">Full legal prospectus including investment strategy, risks, and fees</p>
                <p className="text-slate-500">Version 2.1 | Effective January 1, 2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              View
            </Button>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I have read and understood the fund prospectus and acknowledge the investment risks
            </span>
          </label>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="text-slate-900">Key Investor Information Document (KIID)</h3>
                <p className="text-slate-600">Summary of key information about the fund</p>
                <p className="text-slate-500">Version 1.3 | Updated October 2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              View
            </Button>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I have read the KIID and understand the risk/reward profile (SRRI: 5/7)
            </span>
          </label>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="text-slate-900">Terms & Conditions</h3>
                <p className="text-slate-600">Subscription agreement terms and conditions</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              View
            </Button>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I agree to the terms and conditions of the subscription agreement
            </span>
          </label>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="size-6 text-blue-600 flex-shrink-0" />
              <div className="space-y-1">
                <h3 className="text-slate-900">Risk Disclosure Statement</h3>
                <p className="text-slate-600">Detailed disclosure of investment risks</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              View
            </Button>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1" />
            <span className="text-slate-600">
              I acknowledge that I may lose some or all of my investment and understand the specific risks
            </span>
          </label>
        </Card>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            All acknowledgments are recorded with timestamps and document hashes for regulatory compliance.
            Documents are watermarked with your account ID.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('details')}>Back</Button>
        <Button onClick={() => setCurrentStep('signatures')}>
          Continue to Signatures
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSignaturesStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 mb-2">Electronic Signatures Required</h2>
        <p className="text-slate-600">All authorized signatories must sign via DocuSign</p>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <PenTool className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-3">
            <h3 className="text-slate-900">DocuSign Process</h3>
            <p className="text-slate-600">
              Upon submitting this order, all signatories listed below will receive DocuSign
              requests via email. The order will be processed once all required signatures are collected.
            </p>
            <div className="text-slate-600">
              Documents requiring signature:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Subscription Agreement</li>
                <li>Risk Acknowledgment Form</li>
                <li>Payment Authorization</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-slate-900 mb-4">Required Signatories ({signatureStatuses.length})</h3>
        <div className="space-y-3">
          {signatureStatuses.map((signatory) => (
            <Card key={signatory.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <PenTool className="size-5 text-blue-600" />
                    <h3 className="text-slate-900">{signatory.name}</h3>
                    <Badge variant="outline">{signatory.title}</Badge>
                  </div>
                  <div className="text-slate-600">{signatory.email}</div>
                  <div className="flex items-center gap-2 mt-2">
                    {signatory.status === 'pending' && (
                      <>
                        <Clock className="size-4 text-orange-600" />
                        <span className="text-orange-600">Signature Pending</span>
                      </>
                    )}
                    {signatory.status === 'signed' && (
                      <>
                        <CheckCircle2 className="size-4 text-green-600" />
                        <span className="text-green-600">Signed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600">
            Signature deadline: 5 business days. If not all signatures are collected within this
            timeframe, the order will be automatically cancelled and you will need to resubmit.
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('documents')}>Back</Button>
        <Button onClick={() => setCurrentStep('confirm')}>
          Continue
          <ChevronRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="size-10 text-green-600" />
        </div>
        <h2 className="text-slate-900 mb-2">Order Summary</h2>
        <p className="text-slate-600">Review your subscription details before submission</p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-slate-900">Order Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Fund:</span>
            <span className="text-slate-900">{selectedFundData?.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Share Class:</span>
            <span className="text-slate-900">{selectedShareClassData?.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Amount:</span>
            <span className="text-slate-900">$50,000.00</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Trade Date:</span>
            <span className="text-slate-900">2025-11-13</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-slate-600">Estimated Shares:</span>
            <span className="text-slate-900">401.54</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Signatories:</span>
            <span className="text-slate-900">{signatureStatuses.length} required</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <FileText className="size-6 text-blue-600 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="text-slate-900">Next Steps</h3>
            <div className="text-slate-600 space-y-2">
              <p>1. All signatories will receive DocuSign requests immediately</p>
              <p>2. Once all signatures are collected, the order will be submitted</p>
              <p>3. You will receive payment instructions for wire transfer</p>
              <p>4. Upon receipt of funds, shares will be allocated at NAV</p>
              <p>5. Trade confirmation will be sent within 24 hours of settlement</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep('signatures')}>Back</Button>
        <Button onClick={onComplete} size="lg" className="flex-1">
          Submit Order & Send for Signatures
          <CheckCircle2 className="size-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-900">Place Subscription Order</h1>
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
        {currentStep === 'fund' && renderFundSelectionStep()}
        {currentStep === 'details' && renderOrderDetailsStep()}
        {currentStep === 'documents' && renderDocumentsStep()}
        {currentStep === 'signatures' && renderSignaturesStep()}
        {currentStep === 'confirm' && renderConfirmationStep()}
      </Card>
    </div>
  );
}
