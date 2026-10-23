"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import poster from "@/assets/images/stock/hero-earthworks-poster.jpg";

/**
 * Muted, looping stock clip over its own first frame. The poster is the LCP image, so the page
 * never waits on the video. The clip only plays when motion is allowed and the visitor has not
 * asked to save data; otherwise the still stays. A visible control pauses it (WCAG 2.2.2).
 */
export function HeroVideo({ label, tag, pause, play }: { label: string; tag: string; pause: string; play: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const update = () => setAllowed(motion.matches && !saveData);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (!allowed) {
      el.pause();
      return;
    }
    el.play().catch(() => setPlaying(false));
  }, [allowed]);

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  }

  return (
    <div className="hero-video">
      <Image src={poster} alt="" preload fetchPriority="high" sizes="(min-width: 768px) 67vw, 100vw" placeholder="blur" quality={82} />
      {allowed ? (
        <video
          ref={video}
          className={playing ? "is-playing" : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/hero-earthworks-1080.mp4" type="video/mp4" media="(min-width: 900px)" />
          <source src="/media/hero-earthworks-720.mp4" type="video/mp4" />
        </video>
      ) : (
        <span className="visually-hidden">{label}</span>
      )}
      <span className="media-tag">{tag}</span>
      {allowed ? (
        <button type="button" className="hero-video__toggle" onClick={toggle} aria-label={playing ? pause : play}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" /> : <path d="M4 2.5v11l9-5.5z" fill="currentColor" />}
          </svg>
        </button>
      ) : null}
    </div>
  );
}
