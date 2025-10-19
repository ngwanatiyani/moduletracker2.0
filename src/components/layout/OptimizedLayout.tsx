
import React, { Suspense, lazy } from 'react';
import ScrollAdaptiveNav from '@/components/navigation/ScrollAdaptiveNav';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance
const MobileSidebar = lazy(() => import('@/components/MobileSidebar'));

interface OptimizedLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
  showSidebar?: boolean;
}

const OptimizedLayout: React.FC<OptimizedLayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  showSidebar = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/30 w-full overflow-x-hidden">
      <ScrollAdaptiveNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      {/* Responsive top padding */}
      <div className="pt-16 lg:pt-20">
        <div className="flex relative min-h-screen">
          {showSidebar && (
            <Suspense fallback={
              <div className="fixed lg:sticky top-16 lg:top-20 left-0 z-40 w-72 lg:w-80 bg-white/95 backdrop-blur-lg shadow-xl border-r border-slate-200/50 min-h-screen p-4">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="space-y-3">
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

          <main className="flex-1 min-h-screen w-full max-w-full">
            <Suspense fallback={
              <div className="p-6 lg:p-8 space-y-6">
                <Skeleton className="h-12 w-1/2" />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64 hidden xl:block" />
                </div>
              </div>
            }>
              {children}
            </Suspense>
          </main>
        </div>
      </div>

    </div>
  );
};

export default OptimizedLayout;
