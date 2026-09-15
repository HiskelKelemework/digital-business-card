"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { Tile, TileLabel } from "@/components/tile";
import { card } from "@/lib/card";
import { githubRepoFromUrl, safeHttpsUrl } from "@/lib/format";

function useStars(repo: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return stars;
}

function ProjectCard({ project }: { project: { name: string; description: string; href: string } }) {
  const href = safeHttpsUrl(project.href);
  const repo = githubRepoFromUrl(project.href);
  const stars = useStars(repo);
  if (!href) return null;

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-item group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-transform duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex items-center gap-2">
            {repo ? <GitHubIcon className="size-4 shrink-0 text-muted-foreground" /> : null}
            <p className="text-sm font-medium">{project.name}</p>
          </span>
          {stars !== null ? (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-current text-oxide" />
              {stars}
            </span>
          ) : null}
        </div>
        {project.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        ) : null}
        <span className="inline-flex items-center gap-1 text-xs font-medium text-oxide transition-transform duration-200 group-hover:translate-x-0.5">
          View project
          <ArrowUpRight className="size-3.5" />
        </span>
      </a>
    </li>
  );
}

export function ProjectsSection() {
  const projects = card.projects.filter((project) => safeHttpsUrl(project.href));
  if (!projects.length) return null;

  return (
    <Tile delay={280} className="md:col-span-2">
      <TileLabel>Projects</TileLabel>
      <p className="mt-2 text-sm text-muted-foreground">A few things I&apos;ve built.</p>
      <ul className="focus-list mt-4 grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </ul>
    </Tile>
  );
}
