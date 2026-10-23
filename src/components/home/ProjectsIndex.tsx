"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Item = { slug: string; name: string; sector: string; image: StaticImageData; href: string };

/**
 * Small index, large picture. On large screens the stage stays for one screen per project and
 * the picture wipes in as its row becomes current; elsewhere each project stacks as picture + row.
 */
export function ProjectsIndex({
  headingLines,
  lead,
  link,
  items,
}: {
  headingLines: readonly string[];
  lead: string;
  link: { href: string; label: string };
  items: Item[];
}) {
  const wrapper = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = wrapper.current;
        if (!el) return;
        const travel = el.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, travel)));
        setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned, items.length]);

  return (
    <section
      ref={wrapper}
      className={`work ${pinned ? "work--pinned" : ""}`}
      aria-labelledby="work-title"
      style={{ "--items": items.length } as React.CSSProperties}
    >
      <div className="work__stage">
        <div className="work__column">
          <h2 id="work-title" className="work__title" data-reveal={pinned ? undefined : ""}>
            {headingLines.map((line, i) => (
              <span key={i}>{line} </span>
            ))}
          </h2>
          <p className="work__lead">{lead}</p>
          <ol className="work__index">
            {items.map((item, i) => (
              <li key={item.slug} data-current={pinned && i === active ? "true" : undefined}>
                {!pinned ? (
                  <div className="work__picture-inline" data-reveal>
                    <Image src={item.image} alt={item.name} sizes="100vw" placeholder="blur" />
                  </div>
                ) : null}
                <Link href={item.href} className="work__row">
                  <span className="work__name">{item.name}</span>
                  <span className="work__sector">{item.sector}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link className="text-link work__more" href={link.href}>
            {link.label}
          </Link>
        </div>
        {pinned ? (
          <div className="work__pictures" aria-hidden="true">
            {items.map((item, i) => (
              <figure key={item.slug} className="work__picture" data-state={i < active ? "past" : i === active ? "current" : "next"}>
                <Image src={item.image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" />
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
