import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project, AnalyticsSnapshot, Invoice } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { AnalyticsPanel } from './AnalyticsPanel';
import { InvoiceTable } from './InvoiceTable';
import { StatCard } from './StatCard';

interface ProjectDetailPageProps {
  projectId?: string;
}

function ProjectDetailContent({ projectId: propId }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [snapshots, setSnapshots] = useState<AnalyticsSnapshot[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  // Resolve project ID from prop or URL query parameter
  const projectId = propId || (typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('id') ?? undefined
    : undefined);

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    async function load() {
      const [projectRes, snapshotsRes, invoicesRes] = await Promise.all([
        supabase.from('projects').select('*').eq('id', projectId).single(),
        supabase
          .from('analytics_snapshots')
          .select('*')
          .eq('project_id', projectId)
          .order('period_start', { ascending: true }),
        supabase
          .from('invoices')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false }),
      ]);

      setProject(projectRes.data);
      setSnapshots(snapshotsRes.data ?? []);
      setInvoices(invoicesRes.data ?? []);
      setLoading(false);
    }
    load();
  }, [projectId]);

  if (loading) {
    return (
      <DashboardShell currentPath="/dashboard/projects">
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      </DashboardShell>
    );
  }

  if (!project) {
    return (
      <DashboardShell currentPath="/dashboard/projects">
        <div className="flex flex-col items-center justify-center py-24">
          <p className="text-primary-400/50">Project not found.</p>
          <a href="/dashboard/projects" className="mt-4 text-sm text-primary-400 hover:text-primary-300">
            Back to projects
          </a>
        </div>
      </DashboardShell>
    );
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    completed: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  };

  const latestGA = snapshots
    .filter((s) => s.source === 'google_analytics')
    .slice(-1)[0];

  const totalInvoiced = invoices.reduce((s, i) => s + i.amount_cents, 0);
  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount_cents, 0);

  return (
    <DashboardShell currentPath="/dashboard/projects">
      {/* Header */}
      <div className="mb-6">
        <a
          href="/dashboard/projects"
          className="mb-3 inline-flex items-center gap-1 text-sm text-primary-400/60 transition hover:text-primary-300"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to projects
        </a>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white">{project.name}</h1>
            {project.domain && (
              <p className="mt-0.5 text-sm text-primary-400/60">{project.domain}</p>
            )}
          </div>
          <span
            className={`inline-flex rounded-lg border px-2.5 py-0.5 text-xs font-medium capitalize ${
              statusColors[project.status]
            }`}
          >
            {project.status}
          </span>
        </div>

        {project.services && project.services.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.services.map((s) => (
              <span key={s} className="rounded-md bg-primary-500/10 px-2 py-0.5 text-xs text-primary-300/70">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Latest Visitors"
          value={latestGA?.metrics.visitors?.toLocaleString() ?? '-'}
        />
        <StatCard
          label="Latest Conversions"
          value={latestGA?.metrics.conversions?.toLocaleString() ?? '-'}
        />
        <StatCard
          label="Total Invoiced"
          value={new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(totalInvoiced / 100)}
        />
        <StatCard
          label="Total Paid"
          value={new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(totalPaid / 100)}
        />
      </div>

      {/* Analytics */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-medium text-white">Analytics</h2>
        <AnalyticsPanel snapshots={snapshots} />
      </div>

      {/* Invoices */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-medium text-white">Invoices</h2>
        <InvoiceTable invoices={invoices} />
      </div>
    </DashboardShell>
  );
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ProjectDetailContent projectId={projectId} />
      </ProtectedRoute>
    </AuthProvider>
  );
}
