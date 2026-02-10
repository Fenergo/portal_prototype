import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Gauge, Shield, Activity } from 'lucide-react';

interface FrontOfficeVisionProps {
  onBack: () => void;
  onSelectPrototype: (prototype: 'cockpit' | 'radar' | 'pulse') => void;
}

export function FrontOfficeVision({ onBack, onSelectPrototype }: FrontOfficeVisionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div>
              <div className="text-slate-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}>
                fundflow
              </div>
              <div className="text-slate-500 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Front Office Vision Prototypes
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>powered by</span>
            <img 
              src="/portal_prototype/fen_logo.jpg" 
              alt="Fenergo"
              className="h-8 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Front Office Vision Prototypes
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore next-generation executive dashboards designed for financial services leadership
            </p>
          </div>

          {/* Prototype Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Fenergo Cockpit */}
            <Card className="p-8 space-y-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur">
              <div 
                className="size-16 rounded-xl flex items-center justify-center mx-auto"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
              >
                <Gauge className="size-8 text-white" />
              </div>
              
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fenergo Cockpit
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Executive Cockpit (COO / CRO / CCO), one screen to answer "what needs attention now?"
                </p>
              </div>

              <Button
                className="w-full text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
                onClick={() => onSelectPrototype('cockpit')}
              >
                Launch Cockpit
              </Button>
            </Card>

            {/* Fenergo Risk Radar */}
            <Card className="p-8 space-y-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur">
              <div 
                className="size-16 rounded-xl flex items-center justify-center mx-auto"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
              >
                <Shield className="size-8 text-white" />
              </div>
              
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fenergo Risk Radar
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Risk & Compliance Radar (CRO / CCO), appetite + control posture + breaches.
                </p>
              </div>

              <Button
                className="w-full text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
                onClick={() => onSelectPrototype('radar')}
              >
                Launch Risk Radar
              </Button>
            </Card>

            {/* Fenergo Pulse */}
            <Card className="p-8 space-y-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur">
              <div 
                className="size-16 rounded-xl flex items-center justify-center mx-auto"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
              >
                <Activity className="size-8 text-white" />
              </div>
              
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fenergo Pulse
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Trading & Client Lifecycle Pulse (COO + Trading leadership), trading health + operational blockers + compliance gating.
                </p>
              </div>

              <Button
                className="w-full text-white font-semibold"
                style={{ background: 'linear-gradient(135deg, #21CFB2, #1AB09A)' }}
                onClick={() => onSelectPrototype('pulse')}
              >
                Launch Pulse
              </Button>
            </Card>
          </div>

          {/* Info Banner */}
          <Card className="p-6 bg-teal-50 border-teal-200">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-slate-900">Next-Generation Executive Dashboards</h3>
              <p className="text-slate-600 text-sm">
                These prototypes showcase real-time operational intelligence designed for C-suite and senior leadership
                in financial services institutions.
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-500">
          <p>© 2025 Fenergo. Front Office Vision Prototypes.</p>
        </div>
      </footer>
    </div>
  );
}
