import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { X, ChevronLeft, ChevronRight, Info, Lightbulb, CheckCircle2, Clock } from 'lucide-react';

interface FundLaunchWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function FundLaunchWizard({ onComplete, onCancel }: FundLaunchWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fundName: '',
    activityType: 'fund-launch',
    primaryRegion: '',
    launchUrgency: '',
    clientMoneyModel: '',
    additionalContext: '',
    investmentStrategy: '',
    assetClass: '',
    expectedAUM: '',
    targetMarket: '',
  });

  const totalSteps = 10;

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Launch Setup</h2>
              <p className="text-slate-600 mb-6">Provide the basic information to get started with your launch.</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fundName">Fund Name</Label>
                  <Input
                    id="fundName"
                    value={formData.fundName}
                    onChange={(e) => updateFormData('fundName', e.target.value)}
                    placeholder="Enter fund name"
                  />
                </div>

                <div>
                  <Label htmlFor="activityType">Activity Type</Label>
                  <select
                    id="activityType"
                    value={formData.activityType}
                    onChange={(e) => updateFormData('activityType', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="fund-launch">Fund Launch</option>
                    <option value="share-class-launch">Share Class Launch</option>
                    <option value="in-specie-in">In-Specie In</option>
                    <option value="in-specie-out">In-Specie Out</option>
                  </select>
                </div>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <Lightbulb className="size-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Fund Launch Insights</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Complete new fund setup from inception</li>
                    <li>• Average timeline: 12-16 weeks</li>
                    <li>• Requires full regulatory approval process</li>
                    <li>• Initial seed capital typically $10M-50M</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Client Information</h2>
              <p className="text-slate-600 mb-6">Provide details about the client and their requirements.</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryRegion">Primary Region</Label>
                  <select
                    id="primaryRegion"
                    value={formData.primaryRegion}
                    onChange={(e) => updateFormData('primaryRegion', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select primary region</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia-pacific">Asia Pacific</option>
                    <option value="latin-america">Latin America</option>
                    <option value="middle-east-africa">Middle East & Africa</option>
                    <option value="global">Global</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="launchUrgency">Launch Urgency</Label>
                  <select
                    id="launchUrgency"
                    value={formData.launchUrgency}
                    onChange={(e) => updateFormData('launchUrgency', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select urgency level</option>
                    <option value="high">High - Critical timeline</option>
                    <option value="medium">Medium - Standard timeline</option>
                    <option value="low">Low - Flexible timeline</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="clientMoneyModel">Client Money Model</Label>
                  <select
                    id="clientMoneyModel"
                    value={formData.clientMoneyModel}
                    onChange={(e) => updateFormData('clientMoneyModel', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select client money model</option>
                    <option value="segregated">Segregated</option>
                    <option value="pooled">Pooled</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="additionalContext">Additional Context</Label>
                  <textarea
                    id="additionalContext"
                    value={formData.additionalContext}
                    onChange={(e) => updateFormData('additionalContext', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    rows={4}
                    placeholder="Enter any additional information"
                  />
                </div>
              </div>
            </div>

            {formData.primaryRegion && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex gap-3">
                  <Info className="size-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {formData.primaryRegion === 'north-america' && 'North American Market Context'}
                      {formData.primaryRegion === 'europe' && 'European Market Context'}
                      {formData.primaryRegion === 'asia-pacific' && 'Asia Pacific Market Context'}
                      {formData.primaryRegion === 'global' && 'Global Market Context'}
                    </h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {formData.primaryRegion === 'north-america' && (
                        <>
                          <li>• SEC registration process typically 6-8 weeks</li>
                          <li>• 40 Act fund structures most common</li>
                          <li>• Average launch cost: $200K-400K</li>
                        </>
                      )}
                      {formData.primaryRegion === 'europe' && (
                        <>
                          <li>• UCITS and AIFMD frameworks apply</li>
                          <li>• CSSF/FCA approval typically 8-12 weeks</li>
                          <li>• Average launch cost: €250K-500K</li>
                        </>
                      )}
                      {formData.primaryRegion === 'asia-pacific' && (
                        <>
                          <li>• SFC/MAS/ASIC regulatory frameworks</li>
                          <li>• Cross-border distribution considerations</li>
                          <li>• Timeline varies by jurisdiction (6-16 weeks)</li>
                        </>
                      )}
                      {formData.primaryRegion === 'global' && (
                        <>
                          <li>• Multiple regulatory approvals required</li>
                          <li>• Extended timeline: 16-24 weeks typical</li>
                          <li>• Complex tax and reporting requirements</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Product Details</h2>
              <p className="text-slate-600 mb-6">Define product specifications and investment strategy.</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="investmentStrategy">Investment Strategy</Label>
                  <select
                    id="investmentStrategy"
                    value={formData.investmentStrategy}
                    onChange={(e) => updateFormData('investmentStrategy', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select strategy</option>
                    <option value="growth">Growth</option>
                    <option value="value">Value</option>
                    <option value="balanced">Balanced</option>
                    <option value="income">Income</option>
                    <option value="alternative">Alternative</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="assetClass">Primary Asset Class</Label>
                  <select
                    id="assetClass"
                    value={formData.assetClass}
                    onChange={(e) => updateFormData('assetClass', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select asset class</option>
                    <option value="equity">Equity</option>
                    <option value="fixed-income">Fixed Income</option>
                    <option value="multi-asset">Multi-Asset</option>
                    <option value="alternatives">Alternatives</option>
                    <option value="real-estate">Real Estate</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="expectedAUM">Expected AUM (USD)</Label>
                  <Input
                    id="expectedAUM"
                    value={formData.expectedAUM}
                    onChange={(e) => updateFormData('expectedAUM', e.target.value)}
                    placeholder="e.g., 50000000"
                  />
                </div>

                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <select
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={(e) => updateFormData('targetMarket', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="">Select target market</option>
                    <option value="institutional">Institutional</option>
                    <option value="retail">Retail</option>
                    <option value="high-net-worth">High Net Worth</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex gap-3">
                <CheckCircle2 className="size-5 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Product Documentation</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Prospectus preparation: 3-4 weeks</li>
                    <li>• KIID/KID documentation required</li>
                    <li>• Marketing materials development</li>
                    <li>• Legal review and approval needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step {currentStep} of {totalSteps}</h2>
              <p className="text-slate-600 mb-6">Additional configuration steps would continue here...</p>

              <Card className="p-8 text-center">
                <Clock className="size-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">
                  This step would contain additional configuration details for the fund launch process.
                </p>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div
        className="relative bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="border-b p-6 flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {currentStep === 1 && 'Initial Setup'}
                {currentStep === 2 && 'Client Context'}
                {currentStep === 3 && 'Product Details'}
                {currentStep > 3 && `Configuration - Step ${currentStep}`}
              </h1>
              <p className="text-slate-600">Step {currentStep} of {totalSteps}</p>
              <div className="mt-3">
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="size-6 text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="border-t p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
            >
              <ChevronLeft className="size-4 mr-2" />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? 'Complete Launch' : 'Continue'}
              <ChevronRight className="size-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
  );
}
