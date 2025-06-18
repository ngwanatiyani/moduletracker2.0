
import React, { Suspense, lazy } from 'react';
import ScrollAdaptiveNav from '@/components/navigation/ScrollAdaptiveNav';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components for better performance
const MobileSidebar = lazy(() => import('@/components/MobileSidebar'));
const Chatbot = lazy(() => import('@/components/Chatbot'));

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 w-full overflow-x-hidden">
      <ScrollAdaptiveNav
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      {/* Responsive top padding */}
      <div className="pt-12 sm:pt-14 lg:pt-16 xl:pt-18">
        <div className="flex relative min-h-screen">
          {showSidebar && (
            <Suspense fallback={
              <div className="fixed lg:sticky top-12 sm:top-14 lg:top-16 xl:top-18 left-0 z-40 w-72 sm:w-80 lg:w-72 xl:w-80 bg-white/90 backdrop-blur-lg shadow-xl border-r border-slate-200/50 min-h-screen p-3 sm:p-4">
                <Skeleton className="h-6 sm:h-8 w-3/4 mb-3 sm:mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 sm:h-12 w-full" />
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
              <div className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6">
                <Skeleton className="h-8 sm:h-10 lg:h-12 w-1/2" />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  <Skeleton className="h-48 sm:h-56 lg:h-64" />
                  <Skeleton className="h-48 sm:h-56 lg:h-64" />
                  <Skeleton className="h-48 sm:h-56 lg:h-64 hidden xl:block" />
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
    </div>
  );
};

export default OptimizedLayout;
