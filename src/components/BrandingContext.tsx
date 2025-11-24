import { createContext, useContext, useState, ReactNode } from 'react';

interface BrandingConfig {
  primaryColor: string;
  logoUrl: string;
  companyName: string;
  watermark?: {
    imageUrl: string;
    opacity: number;
    position: 'center' | 'bottom' | 'left' | 'right';
  };
}

interface BrandingContextType {
  branding: BrandingConfig;
  updateBranding: (config: Partial<BrandingConfig>) => void;
}

const defaultBranding: BrandingConfig = {
  primaryColor: '#21CFB2',
  logoUrl: 'fenergo',
  companyName: 'Fenergo',
  watermark: {
    imageUrl: '',
    opacity: 0.1,
    position: 'bottom',
  },
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding);

  const updateBranding = (config: Partial<BrandingConfig>) => {
    setBranding(prev => ({ ...prev, ...config }));
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding }}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within BrandingProvider');
  }
  return context;
}
