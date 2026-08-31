"use client";

import { useState, useEffect, useCallback, useId } from "react";

export interface IllustratorProject {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
}

interface IllustratorGalleryProps {
  projects: IllustratorProject[];
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

  const totalPhotos = projects.reduce((acc, p) => acc + p.images.length, 0);

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-10 text-center sm:mb-14">
        <p className="animate-eyebrow text-[13px] font-semibold tracking-[0.3em] text-gold uppercase">
          VECTOR ART &amp; ILLUSTRATION
        </p>
        <h1 className="animate-heading mx-auto mt-3 max-w-[700px] text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          Crafted in Illustrator.
        </h1>
        <p className="animate-description mx-auto mt-4 max-w-lg text-sm text-gray-light sm:text-base">
          Explore curated vector collections. Click any artwork block to view all iterations and variations.
        </p>
        <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-gold/90 backdrop-blur-sm">
          <span>{projects.length} Collections</span>
          <span className="text-white/30">&bull;</span>
          <span>{totalPhotos} Total Assets</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-7">
        {projects.map((project, idx) => {
          const hasMultiple = project.images.length > 1;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => openProject(project)}
              className="group relative flex flex-col text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
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
              <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(255,184,0,0.3)]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-75 transition-opacity duration-300 group-hover:opacity-50" />

                {/* Count Badge */}
                <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-black/75 px-3 py-1 text-[11px] font-bold text-gold backdrop-blur-md shadow-md">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <span>
                    {project.images.length} {project.images.length === 1 ? "Image" : "Photos"}
                  </span>
                </div>

                {/* Index Pill */}
                <div className="absolute left-3 top-3 z-10 rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-white/80 backdrop-blur-md">
                  #{String(idx + 1).padStart(2, "0")}
                </div>

                {/* Card Footer Details */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-bold text-white drop-shadow-md group-hover:text-gold transition-colors">
                    {project.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gold/80">
                    <span>View all {project.images.length} works</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">→</span>
                  </p>
                </div>
              </div>
            </button>
          );
        })}
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
