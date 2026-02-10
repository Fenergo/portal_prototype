import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InvestorPortal } from './components/InvestorPortal';
import { AssetManagerPortal } from './components/AssetManagerPortal';
import { CounterpartyPortal } from './components/CounterpartyPortal';
import { FrontOfficeVision } from './components/FrontOfficeVision';
import { FenergoCockpit } from './components/front-office/FenergoCockpit';
import { BrandingProvider } from './components/BrandingContext';

export type UserRole = 'investor' | 'asset-manager' | 'counterparty' | null;
export type FrontOfficeView = 'landing' | 'front-office' | 'cockpit' | 'radar' | 'pulse';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [frontOfficeView, setFrontOfficeView] = useState<FrontOfficeView>('landing');

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  const handleFrontOfficeNavigation = () => {
    setFrontOfficeView('front-office');
  };

  const handleBackToLanding = () => {
    setFrontOfficeView('landing');
  };

  const handleBackToFrontOffice = () => {
    setFrontOfficeView('front-office');
  };

  const handleSelectPrototype = (prototype: 'cockpit' | 'radar' | 'pulse') => {
    setFrontOfficeView(prototype);
  };

  return (
    <BrandingProvider>
      {frontOfficeView === 'cockpit' ? (
        <FenergoCockpit onBack={handleBackToFrontOffice} />
      ) : frontOfficeView === 'front-office' ? (
        <FrontOfficeVision 
          onBack={handleBackToLanding}
          onSelectPrototype={handleSelectPrototype}
        />
      ) : !isAuthenticated || !userRole ? (
        <LandingPage 
          onLogin={handleLogin}
          onNavigateToFrontOffice={handleFrontOfficeNavigation}
        />
      ) : userRole === 'investor' ? (
        <InvestorPortal onLogout={handleLogout} />
      ) : userRole === 'counterparty' ? (
        <CounterpartyPortal onLogout={handleLogout} />
      ) : (
        <AssetManagerPortal onLogout={handleLogout} />
      )}
    </BrandingProvider>
  );
}