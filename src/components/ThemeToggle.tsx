"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function ThemeToggle({ labels }: { labels: { toggle: string; light: string; dark: string } }) {
  // Server render has no theme; the button label settles after hydration without a mismatch.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    try {
      localStorage.setItem("kayan-theme", next);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-switching"), 320);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={labels.toggle} aria-pressed={theme === "dark"} title={labels.toggle}>
      <span className="theme-toggle__dial" aria-hidden="true" />
      <span className="theme-toggle__text">{theme === null ? labels.dark : theme === "dark" ? labels.light : labels.dark}</span>
    </button>
  );
}
