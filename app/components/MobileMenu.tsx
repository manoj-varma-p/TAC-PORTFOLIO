"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import { navItems } from "./navItems";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-bg px-6 py-6">
          <nav className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium tracking-[0.08em] text-gray-light transition hover:text-gold"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <a
            href="https://wa.me/919848000274"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-fit items-center gap-2 rounded-[4px] border border-gold/70 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white"
          >
            LET&apos;S TALK
            <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
          </a>
        </div>
      )}
    </div>
  );
}
