import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InvestorPortal } from './components/InvestorPortal';
import { AssetManagerPortal } from './components/AssetManagerPortal';
import { BrandingProvider } from './components/BrandingContext';

export type UserRole = 'investor' | 'asset-manager' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <BrandingProvider>
      {!isAuthenticated || !userRole ? (
        <LandingPage onLogin={handleLogin} />
      ) : userRole === 'investor' ? (
        <InvestorPortal onLogout={handleLogout} />
      ) : (
        <AssetManagerPortal onLogout={handleLogout} />
      )}
    </BrandingProvider>
  );
}