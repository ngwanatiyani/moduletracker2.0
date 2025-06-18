
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const NavSkeleton = () => (
  <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 p-4 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
      <Skeleton className="md:hidden w-6 h-6" />
    </div>
  </nav>
);

export const DashboardSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Skeleton className="h-32 col-span-1" />
      <Skeleton className="h-32 col-span-1" />
      <Skeleton className="h-32 col-span-1" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);
