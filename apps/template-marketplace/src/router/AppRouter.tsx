import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceLayout } from '../layouts/MarketplaceLayout';
import { HomePage } from '../pages/HomePage';
import { TemplatesCatalogPage } from '../pages/TemplatesCatalogPage';
import { TemplateDetailsPage } from '../pages/TemplateDetailsPage';
import { LivePreviewPage } from '../pages/LivePreviewPage';
import { AdminLibraryPage } from '../pages/AdminLibraryPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Live Preview Engine Route (Standalone Full Viewport with Top Control Bar) */}
        <Route path="/preview/:slug" element={<LivePreviewPage />} />

        {/* Main Marketplace & Admin Routes */}
        <Route element={<MarketplaceLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesCatalogPage />} />
          <Route path="/templates/:slug" element={<TemplateDetailsPage />} />
          <Route path="/admin/library" element={<AdminLibraryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
