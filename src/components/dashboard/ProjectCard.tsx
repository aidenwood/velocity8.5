import React from 'react';
import type { Project } from '../../lib/types';

interface ProjectCardProps {
  project: Project;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  completed: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  paused: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={`/dashboard/project/?id=${project.id}`}
      className="group block rounded-2xl border border-primary-500/10 bg-primary-950/40 p-5 backdrop-blur-sm transition hover:border-primary-500/25 hover:bg-primary-950/60"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-medium text-white group-hover:text-primary-300 transition">
            {project.name}
          </h3>
          {project.domain && (
            <p className="mt-0.5 truncate text-sm text-primary-400/60">{project.domain}</p>
          )}
        </div>
        <span
          className={`ml-3 inline-flex shrink-0 rounded-lg border px-2.5 py-0.5 text-xs font-medium capitalize ${
            statusColors[project.status] || statusColors.active
          }`}
        >
          {project.status}
        </span>
      </div>

      {project.services && project.services.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.services.map((service) => (
            <span
              key={service}
              className="rounded-md bg-primary-500/10 px-2 py-0.5 text-xs text-primary-300/70"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      {project.start_date && (
        <p className="mt-3 text-xs text-primary-400/40">
          Started {new Date(project.start_date).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
        </p>
      )}
    </a>
  );
}
