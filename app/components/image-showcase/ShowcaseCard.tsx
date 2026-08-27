"use client";

export interface ShowcaseImage {
  id: string;
  src: string;
  title?: string;
}

const ShowcaseCard = ({
  item,
  onClick,
  onPointerEnter,
  onPointerLeave,
  cardRef,
}: {
  item: ShowcaseImage;
  onClick: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  cardRef: (el: HTMLButtonElement | null) => void;
}) => {
  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onPointerEnter}
      onBlur={onPointerLeave}
      aria-label={item.title ?? "Open image"}
      className="group relative block shrink-0 cursor-pointer overflow-hidden rounded-lg border border-border bg-white/[0.03] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] outline-none will-change-transform focus-visible:border-gold/70"
      style={{
        width: "clamp(140px, 15vw, 220px)",
        aspectRatio: "3 / 4",
      }}
    >
      <img
        src={item.src}
        alt={item.title ?? ""}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-105"
      />
      {item.title && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-left text-[11px] font-medium tracking-[0.08em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {item.title.toUpperCase()}
        </span>
      )}
    </button>
  );
};

export default ShowcaseCard;
