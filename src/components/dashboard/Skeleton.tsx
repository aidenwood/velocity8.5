import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', style }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-primary-500/10 ${className}`}
      style={style}
    />
  );
}

/** Skeleton that mimics a StatCard */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

/** Skeleton that mimics a ProjectCard */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="ml-3 h-6 w-16 rounded-lg" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <Skeleton className="mt-3 h-3 w-24" />
    </div>
  );
}

/** Skeleton that mimics a chart area */
export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div
      className="rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm"
      style={{ height: height + 40 }}
    >
      <Skeleton className="mb-4 h-4 w-32" />
      <div className="flex h-full items-end gap-2 pb-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${20 + Math.random() * 60}%` } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}

/** Skeleton for table rows */
export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3.5">
          <Skeleton className={`h-4 ${i === 0 ? 'w-20' : i === 1 ? 'w-16' : 'w-24'}`} />
        </td>
      ))}
    </tr>
  );
}

/** Overview page skeleton — shows the full page structure instantly */
export function OverviewSkeleton() {
  return (
    <>
      <div className="mb-6 space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
      <div className="mt-6">
        <ChartSkeleton />
      </div>
      <div className="mt-6 space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </>
  );
}
