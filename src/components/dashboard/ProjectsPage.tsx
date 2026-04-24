import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './Skeleton';

function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      setProjects(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.status === filter);

  return (
    <DashboardShell currentPath="/dashboard/projects">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-1 text-sm text-primary-400/60">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'completed', 'paused'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3.5 py-1.5 text-sm font-medium capitalize transition ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-500/10 text-primary-300/60 hover:bg-primary-500/20 hover:text-primary-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-primary-500/10 bg-primary-950/40 py-16 backdrop-blur-sm">
          <svg className="mb-3 h-8 w-8 text-primary-500/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <p className="text-sm text-primary-400/50">
            {filter === 'all' ? 'No projects yet.' : `No ${filter} projects.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}

export default function ProjectsPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ProjectsContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}
