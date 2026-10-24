"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import poster from "@/assets/images/stock/hero-earthworks-poster.jpg";

export type HeroSlide = {
  label: string;
  titleLines: readonly string[];
  body: string;
  cta: { href: string; label: string };
  /** Omitted on the lead slide, which plays the stock clip over its poster instead. */
  image?: StaticImageData;
};

type Labels = { carousel: string; slideOf: string; pause: string; play: string; videoLabel: string };

/**
 * Full-height masthead that rotates through three short statements over full-bleed media. A
 * pager track with a sliding selector names each slide; its timer runs in CSS, so it stops with
 * hover, focus, the pause button or reduced motion. The lead slide stays for one full play of its
 * clip (the clip restarts from its first frame each time the slide comes round, and replays if it
 * ends first); the others stay for 8 seconds. Only the first slide carries the page's h1 (kept
 * outside the rotation so it is always present to assistive technology).
 */
const SLIDE_SECONDS = 8;
/** Length of /media/hero-earthworks-*.mp4, used until the browser reports the real one. */
const CLIP_SECONDS = 16;
export function HeroCarousel({ title, slides, labels }: { title: string; slides: HeroSlide[]; labels: Labels }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(false);
  const [clip, setClip] = useState(CLIP_SECONDS);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const update = () => setMotion(query.matches && !saveData);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Coming back to the lead slide starts its clip over.
  useEffect(() => {
    if (active === 0 && video.current) video.current.currentTime = 0;
  }, [active]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (motion && !paused && active === 0) el.play().catch(() => {});
    else el.pause();
  }, [motion, paused, active]);

  const replay = () => {
    const el = video.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const next = () => setActive((i) => (i + 1) % slides.length);
  const rotating = motion && !paused;

  return (
    <section
      className="hero"
      data-overlay-head
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      data-rotating={rotating || undefined}
      style={{ "--count": slides.length, "--active": active } as React.CSSProperties}
    >
      <h1 className="visually-hidden">{title}</h1>
      <div className="hero__slides">
        {slides.map((slide, i) => {
          const TitleTag = i === 0 ? "p" : "h2";
          return (
            <div
              key={slide.label}
              className="hero__slide"
              data-active={i === active || undefined}
              aria-roledescription="slide"
              aria-label={labels.slideOf.replace("{n}", String(i + 1)).replace("{total}", String(slides.length))}
              inert={i !== active}
            >
              <div className="hero__media">
                {slide.image ? (
                  <Image src={slide.image} alt="" sizes="100vw" placeholder="blur" quality={80} />
                ) : (
                  <>
                    <Image src={poster} alt="" preload fetchPriority="high" sizes="100vw" placeholder="blur" quality={80} />
                    {motion ? (
                      <video
                        ref={video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={labels.videoLabel}
                        onEnded={replay}
                        onLoadedMetadata={(e) => setClip(Math.ceil(e.currentTarget.duration) || CLIP_SECONDS)}
                      >
                        <source src="/media/hero-earthworks-1080.mp4" type="video/mp4" media="(min-width: 900px)" />
                        <source src="/media/hero-earthworks-720.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <span className="visually-hidden">{labels.videoLabel}</span>
                    )}
                  </>
                )}
              </div>
              <div className="hero__content">
                <TitleTag className="hero__title lines" aria-hidden={i === 0 || undefined}>
                  {slide.titleLines.map((line, n) => (
                    <span className="line" key={n}>
                      <span data-line style={{ "--i": n } as React.CSSProperties}>
                        {line}
                      </span>{" "}
                    </span>
                  ))}
                </TitleTag>
                <div className="hero__aside">
                  <p className="hero__standfirst">{slide.body}</p>
                  <Link className="btn btn--light btn--arrow" href={slide.cta.href}>
                    {slide.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero__pager">
        <div className="pager">
          <div className="pager__track" aria-hidden="true">
            <span className="pager__selector">
              {rotating ? (
                <span
                  className="pager__timer"
                  key={active}
                  style={{ animationDuration: `${active === 0 && motion ? clip : SLIDE_SECONDS}s` }}
                  onAnimationEnd={next}
                />
              ) : null}
            </span>
          </div>
          <ul className="pager__stops">
            {slides.map((slide, i) => (
              <li key={slide.label}>
                <button type="button" aria-current={i === active || undefined} onClick={() => setActive(i)}>
                  <span className="pager__dot" aria-hidden="true" />
                  <span className="pager__label">{slide.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {motion ? (
          <button type="button" className="hero__pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? labels.play : labels.pause} aria-pressed={paused}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              {paused ? <path d="M4 2.5v11l9-5.5z" fill="currentColor" /> : <path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" />}
            </svg>
          </button>
        ) : null}
      </div>
    </section>
  );
}
