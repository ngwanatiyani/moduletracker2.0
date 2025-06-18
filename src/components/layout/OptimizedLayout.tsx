
import React, { Suspense, lazy } from 'react';
import ScrollAdaptiveNav from '@/components/navigation/ScrollAdaptiveNav';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const MobileSidebar = lazy(() => import('@/components/MobileSidebar'));
const DashboardContent = lazy(() => import('@/components/DashboardContent'));
const Chatbot = lazy(() => import('@/components/Chatbot'));
const DashboardFooter = lazy(() => import('@/components/DashboardFooter'));

interface OptimizedLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
  showSidebar?: boolean;
  showChatbot?: boolean;
}

const OptimizedLayout: React.FC<OptimizedLayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  showSidebar = true,
  showChatbot = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full overflow-x-hidden">
      <ScrollAdaptiveNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      {/* Add top padding to account for fixed navigation */}
      <div className="pt-16 lg:pt-20">
        <div className="flex relative min-h-screen">
          {showSidebar && (
            <Suspense fallback={
              <div className="fixed lg:sticky top-16 lg:top-20 left-0 z-50 w-80 sm:w-72 lg:w-80 xl:w-72 bg-white/90 backdrop-blur-lg shadow-xl border-r border-slate-200/50 min-h-screen p-4">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            }>
              <MobileSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                selectedYear="2nd"
                modules={[]}
                selectedModule=""
                onModuleSelect={() => {}}
              />
            </Suspense>
          )}

          <main className="flex-1 min-h-screen">
            <Suspense fallback={
              <div className="p-6 space-y-6">
                <Skeleton className="h-12 w-1/2" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64" />
                </div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>

      {showChatbot && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}

      <Suspense fallback={
        <div className="bg-white/80 backdrop-blur-lg border-t border-slate-200/50 p-6">
          <Skeleton className="h-4 w-1/3 mx-auto" />
        </div>
      }>
        <DashboardFooter />
      </Suspense>
    </div>
  );
};

export default OptimizedLayout;
