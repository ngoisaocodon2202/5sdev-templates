import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MarketplaceHeader } from '../components/MarketplaceHeader';
import { MarketplaceFooter } from '../components/MarketplaceFooter';

export const MarketplaceLayout: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <MarketplaceHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketplaceFooter />
    </div>
  );
};
