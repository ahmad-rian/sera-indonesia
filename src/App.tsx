import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { LEGACY_REDIRECTS, ROUTES } from './lib/constants';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const WasteBankPage = lazy(() => import('./pages/waste-bank/WasteBankPage'));
const CrisisPage = lazy(() => import('./pages/crisis/CrisisPage'));
const ActionPage = lazy(() => import('./pages/action/ActionPage'));
const ReportPage = lazy(() => import('./pages/report/ReportPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.wasteBank} element={<WasteBankPage />} />
              <Route path={ROUTES.crisis} element={<CrisisPage />} />
              <Route path={ROUTES.action} element={<ActionPage />} />
              <Route path={ROUTES.report} element={<ReportPage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
                <Route key={from} path={from} element={<Navigate to={to} replace />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Analytics />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
