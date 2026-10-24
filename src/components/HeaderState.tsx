"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Tells the header whether it sits over a photographic masthead (transparent, light letters) or
 * over the page (solid). Pages opt in by starting with an element marked [data-overlay-head].
 * Without JavaScript the header simply stays solid.
 */
export function HeaderState() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const head = document.querySelector<HTMLElement>("main > [data-overlay-head]:first-child");
    if (!head) {
      root.dataset.header = "solid";
      return;
    }
    const update = () => {
      root.dataset.header = window.scrollY > 24 ? "solid" : "over";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      root.dataset.header = "solid";
    };
  }, [pathname]);

  return null;
}
