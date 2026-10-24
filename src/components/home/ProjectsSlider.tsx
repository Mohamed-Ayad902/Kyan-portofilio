"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Arrow } from "../Arrow";
import { SectionHead } from "../SectionHead";

type Item = { slug: string; name: string; sector: string; image: StaticImageData; href: string };

/**
 * Projects one at a time on a scroll-snapping track: the portfolio photograph large, the name and
 * sector beside it. Round arrows at the end of the heading rule step through; swiping works too.
 */
export function ProjectsSlider({
  heading,
  lead,
  note,
  readMore,
  link,
  items,
  labels,
}: {
  heading: string;
  lead: string;
  note: string;
  readMore: string;
  link: { href: string; label: string };
  items: Item[];
  labels: { previous: string; next: string; slideOf: string };
}) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(Math.abs(el.scrollLeft) / Math.max(1, el.clientWidth)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function go(step: number) {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const target = Math.min(items.length - 1, Math.max(0, index + step));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: (rtl ? -1 : 1) * target * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="work" aria-labelledby="work-title">
      <SectionHead id="work-title" title={heading}>
        <div className="round-arrows">
          <button type="button" className="round-arrow round-arrow--back" onClick={() => go(-1)} disabled={index === 0} aria-label={labels.previous}>
            <Arrow />
          </button>
          <button type="button" className="round-arrow" onClick={() => go(1)} disabled={index >= items.length - 1} aria-label={labels.next}>
            <Arrow />
          </button>
        </div>
      </SectionHead>
      <p className="section-lead" data-reveal>
        {lead}
      </p>
      <ul className="work__track" ref={track} tabIndex={0} aria-label={heading}>
        {items.map((item, i) => (
          <li className="work__slide" key={item.slug} aria-label={labels.slideOf.replace("{n}", String(i + 1)).replace("{total}", String(items.length))}>
            <figure className="work__picture">
              <Image src={item.image} alt="" sizes="(min-width: 900px) 58vw, 100vw" placeholder="blur" />
            </figure>
            <div className="work__text">
              <h3 className="work__name">{item.name}</h3>
              <p className="work__sector">{item.sector}</p>
              <p>{note}</p>
              <Link className="arrow-link" href={item.href}>
                {readMore}
                <span className="visually-hidden">: {item.name}</span>
                <Arrow />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <Link className="arrow-link section-more" href={link.href}>
        {link.label}
        <Arrow />
      </Link>
    </section>
  );
}
