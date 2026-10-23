"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Card = { slug: string; title: string; body: string; equipment: { name: string; href: string }[] };

/**
 * Industries as a deck of text cards. On large screens with motion allowed the stage holds for
 * about three screens: each step brings the next card forward and folds the earlier ones into
 * spines at the start edge. Elsewhere (phones, reduced motion, no JS) the cards simply stack.
 */
export function IndustriesDeck({
  heading,
  note,
  link,
  cards,
  equipmentLabel,
}: {
  heading: string;
  note: string;
  link: { href: string; label: string };
  cards: Card[];
  equipmentLabel: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)");
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
        const rect = el.getBoundingClientRect();
        const travel = el.offsetHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
        setActive(Math.min(cards.length - 1, Math.floor(progress * cards.length)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned, cards.length]);

  function goTo(index: number) {
    const el = wrapper.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + ((index + 0.5) / cards.length) * travel;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section className={`deck ${pinned ? "deck--pinned" : ""}`} aria-labelledby="deck-title" ref={wrapper} style={{ "--cards": cards.length } as React.CSSProperties}>
      <div className="deck__stage">
        <h2 id="deck-title" className="section-title deck__title" data-reveal={pinned ? undefined : ""}>
          {heading}
        </h2>
        <ol className="deck__cards">
          {cards.map((card, i) => {
            const state = !pinned ? "open" : i < active ? "spine" : i === active ? "active" : "next";
            return (
              <li key={card.slug} className={`deck__card deck__card--tone${i % 3}`} data-state={state} data-reveal={pinned ? undefined : ""}>
                {state === "spine" ? (
                  <button type="button" className="deck__spine" onClick={() => goTo(i)} aria-label={card.title}>
                    <span aria-hidden="true">{card.title}</span>
                  </button>
                ) : null}
                <div className="deck__content" aria-hidden={state === "spine" ? true : undefined}>
                  <h3 className="deck__card-title">{card.title}</h3>
                  <p>{card.body}</p>
                  <div className="deck__foot">
                    <p className="deck__equipment">
                      <span className="visually-hidden">{equipmentLabel}: </span>
                      {card.equipment.map((e, j) => (
                        <span key={e.href}>
                          <Link href={e.href} tabIndex={state === "spine" ? -1 : undefined}>
                            {e.name}
                          </Link>
                          {j < card.equipment.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="deck__after">
          {note} <Link className="text-link" href={link.href}>{link.label}</Link>
        </p>
      </div>
    </section>
  );
}
