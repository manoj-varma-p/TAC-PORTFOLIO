export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-bg py-6 text-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 text-center text-xs text-gray-muted sm:flex-row sm:text-left lg:px-10">
        <p>
          &copy; {currentYear} <span className="font-semibold text-gray-light">TAC &mdash; The Art Code</span>. All rights reserved.
        </p>
        <p className="text-[11px]">
          Crafted for creative excellence &bull; Madhapur, Hyderabad
        </p>
      </div>
    </footer>
  );
}
