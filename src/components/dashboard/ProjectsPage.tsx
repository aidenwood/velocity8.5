import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../lib/types';
import { AuthProvider } from './AuthProvider';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardShell } from './DashboardShell';
import { ProjectCard } from './ProjectCard';

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
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-primary-500/10 bg-primary-950/40 py-16 backdrop-blur-sm">
          <p className="text-sm text-primary-400/50">No projects found.</p>
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
