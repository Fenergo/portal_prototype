import { Button } from './ui/button';
import { Card } from './ui/card';
import { Building2, User, Shield, TrendingUp, Globe, Lock } from 'lucide-react';
import type { UserRole } from '../App';
import { useBranding } from './BrandingContext';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const { branding } = useBranding();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/portal_prototype/fen_logo.jpg" 
              alt="Fenergo" 
              className="h-8"
            />
            <span className="text-slate-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>FundFlow</span>
          </div>
          <div className="flex items-center gap-4">
            {branding.logoUrl && (
              <div className="h-8 flex items-center">
                <img 
                  src={branding.logoUrl === 'fenergo' 
                    ? '/portal_prototype/fen_logo.jpg' 
                    : branding.logoUrl === 'br' 
                    ? '/portal_prototype/BR_logo.png'
                    : '/portal_prototype/fen_logo.jpg'
                  } 
                  alt={branding.companyName}
                  className="h-8 object-contain"
                />
              </div>
            )}
            <Button variant="outline" onClick={() => onLogin('investor')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-slate-900">
            Institutional-Grade Fund Management Platform
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A secure, multi-tenant digital portal delivering self-service investor experiences
            and institutional tooling for asset managers—meeting buyside regulatory requirements
            with neobank polish.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => onLogin('investor')}
              className="gap-2"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <User className="size-4" />
              Investor Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onLogin('asset-manager')}
              className="gap-2"
            >
              <Building2 className="size-4" />
              Asset Manager Workbench
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 space-y-4 bg-white/60 backdrop-blur">
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lock className="size-6 text-blue-600" />
            </div>
            <h3 className="text-slate-900">Secure & Compliant</h3>
            <p className="text-slate-600">
              FIDO2 MFA, WCAG 2.2 AA accessible, GDPR/CCPA compliant with immutable audit trails
              and end-to-end encryption.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-white/60 backdrop-blur">
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="size-6 text-blue-600" />
            </div>
            <h3 className="text-slate-900">Digital Fund Trading</h3>
            <p className="text-slate-600">
              Streamlined subscription, redemption and switching with real-time eligibility checks,
              cut-off validation and STP ≥95%.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-white/60 backdrop-blur">
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="size-6 text-blue-600" />
            </div>
            <h3 className="text-slate-900">Multi-Jurisdiction</h3>
            <p className="text-slack-600">
              Dynamic KYC/KYB flows, jurisdiction gating, target-market checks, and regional
              compliance controls for global operations.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-500">
          <p>© 2025 Fenergo FundFlow. Prototype demonstrating institutional fund management capabilities.</p>
        </div>
      </footer>
    </div>
  );
}