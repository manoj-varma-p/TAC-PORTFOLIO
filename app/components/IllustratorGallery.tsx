"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";

export interface IllustratorProject {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
}

interface IllustratorGalleryProps {
  projects: IllustratorProject[];
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: IllustratorProject;
  onOpen: (p: IllustratorProject) => void;
}) {
  const hasMultiple = project.images.length > 1;

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative flex w-full flex-col text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl shrink-0"
      aria-label={`Open ${project.title} (${project.images.length} images)`}
    >
      {/* Stacked background effect for collections with multiple images */}
      {hasMultiple && (
        <>
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-x-2 -top-2 h-full rounded-2xl border border-white/10 bg-neutral-900/60 transition-transform duration-300 group-hover:-translate-y-1" />
        </>
      )}

      {/* Main Card Block */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-40" />

        {/* Count Badge */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/75 px-2.5 py-1 text-[11px] font-bold text-gold backdrop-blur-md shadow-md">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
          <span>
            {project.images.length} {project.images.length === 1 ? "Image" : "Photos"}
          </span>
        </div>

        {/* Card Footer Details */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <p className="text-xs sm:text-sm font-bold text-white drop-shadow-md line-clamp-2 group-hover:text-gold transition-colors">
            {project.title}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-gold/80">
            <span>View variations</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">→</span>
          </p>
        </div>
      </div>
    </button>
  );
}

function VerticalColumn({
  projects,
  direction,
  speed = 34,
  onOpen,
}: {
  projects: IllustratorProject[];
  direction: "up" | "down";
  speed?: number;
  onOpen: (p: IllustratorProject) => void;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const setHeightRef = useRef(0);

  const copies = [0, 1, 2, 3];

  useEffect(() => {
    const measure = () => {
      if (firstSetRef.current) {
        setHeightRef.current = firstSetRef.current.offsetHeight || 0;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    return () => ro.disconnect();
  }, [projects]);

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const setHeight = setHeightRef.current;
      if (!isPausedRef.current && setHeight > 0) {
        const move = speed * dt;
        if (direction === "up") {
          offsetRef.current += move;
          if (offsetRef.current >= setHeight) {
            offsetRef.current -= setHeight;
          }
        } else {
          offsetRef.current -= move;
          if (offsetRef.current <= 0) {
            offsetRef.current += setHeight;
          }
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [direction, speed]);

  return (
    <div
      ref={colRef}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      className="relative flex-1 min-w-0 h-full overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex flex-col w-full gap-5 sm:gap-6 will-change-transform"
      >
        {copies.map((c) => (
          <div
            key={c}
            ref={c === 0 ? firstSetRef : undefined}
            className="flex flex-col w-full gap-5 sm:gap-6 shrink-0"
          >
            {projects.map((project, idx) => (
              <ProjectCard
                key={`${project.id}-${c}-${idx}`}
                project={project}
                onOpen={onOpen}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IllustratorGallery({ projects }: IllustratorGalleryProps) {
  const [activeProject, setActiveProject] = useState<IllustratorProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const openProject = useCallback((proj: IllustratorProject) => {
    setActiveProject(proj);
    setActiveImageIndex(0);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    setActiveImageIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length);
  }, [activeProject]);

  const prevImage = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
  }, [activeProject]);

  // Keyboard navigation for active modal
  useEffect(() => {
    if (!activeProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeProject, nextImage, prevImage]);

  // Distribute projects across 4 vertical continuous looping columns
  const columnCount = 4;
  const columns: IllustratorProject[][] = useMemo(() => {
    const cols: IllustratorProject[][] = Array.from({ length: columnCount }, () => []);
    projects.forEach((proj, index) => {
      cols[index % columnCount].push(proj);
    });
    return cols.map((col) => (col.length > 0 ? col : projects));
  }, [projects]);

  const columnConfigs: { direction: "up" | "down"; speed: number }[] = [
    { direction: "up", speed: 32 },
    { direction: "down", speed: 28 },
    { direction: "up", speed: 35 },
    { direction: "down", speed: 30 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Top & Bottom Soft Fade Masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-bg via-bg/60 to-transparent sm:h-24" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-bg via-bg/60 to-transparent sm:h-24" />

      {/* 4 Vertical Continuous Looping Columns */}
      <div className="flex h-full w-full max-w-7xl mx-auto items-stretch gap-4 sm:gap-6 px-1">
        {columns.map((colProjects, idx) => (
          <VerticalColumn
            key={`illustrator-col-${idx}`}
            projects={colProjects}
            direction={columnConfigs[idx].direction}
            speed={columnConfigs[idx].speed}
            onOpen={openProject}
          />
        ))}
      </div>

      {/* Interactive Project Collection Lightbox Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-neutral-950/95 shadow-[0_0_80px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-base font-bold tracking-wide text-white sm:text-lg">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-semibold text-gold">
                  Asset {activeImageIndex + 1} of {activeProject.images.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeProject}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-lg font-bold text-white transition hover:border-gold hover:bg-black hover:text-gold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Active Image Stage with Left / Right Buttons */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/90 p-3 sm:p-6">
              {/* Previous Arrow */}
              {activeProject.images.length > 1 && (
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition hover:border-gold hover:text-gold hover:scale-110 cursor-pointer shadow-xl"
                >
                  ‹
                </button>
              )}

              {/* Active Image Display */}
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  key={activeProject.images[activeImageIndex]}
                  src={activeProject.images[activeImageIndex]}
                  alt={`${activeProject.title} - View ${activeImageIndex + 1}`}
                  className="max-h-[62vh] max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-300"
                />
              </div>

              {/* Next Arrow */}
              {activeProject.images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition hover:border-gold hover:text-gold hover:scale-110 cursor-pointer shadow-xl"
                >
                  ›
                </button>
              )}
            </div>

            {/* Bottom Variations Strip */}
            {activeProject.images.length > 1 && (
              <div className="border-t border-white/10 bg-neutral-900/80 px-4 py-3 sm:px-6">
                <p className="mb-2 text-[11px] font-bold tracking-widest text-gold uppercase">
                  All {activeProject.images.length} Variations in this set:
                </p>
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {activeProject.images.map((imgUrl, i) => {
                    const isSelected = i === activeImageIndex;
                    return (
                      <button
                        key={`${imgUrl}-${i}`}
                        type="button"
                        onClick={() => setActiveImageIndex(i)}
                        className={`group relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-gold ring-2 ring-gold/60 scale-105 shadow-[0_0_15px_rgba(255,184,0,0.5)]"
                            : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/40"
                        }`}
                        aria-label={`Select variation ${i + 1}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Variation ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1 text-[9px] font-bold text-white">
                          {i + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
