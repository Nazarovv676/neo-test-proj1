import { Loader } from '@/shared/components';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load pages for code splitting
const HomePage = React.lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const CatalogPage = React.lazy(() =>
  import('@/pages/CatalogPage').then((module) => ({
    default: module.CatalogPage,
  }))
);
const CamperPage = React.lazy(() =>
  import('@/pages/CamperPage').then((module) => ({
    default: module.CamperPage,
  }))
);

const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}
  >
    <Loader size="lg" />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};
