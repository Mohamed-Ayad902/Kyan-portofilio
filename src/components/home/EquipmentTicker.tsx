"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The nine machine names as one running band. It drifts on its own, speeds up with the scroll and
 * turns with the scroll direction. The list is written twice so the loop has no seam; the second
 * copy is hidden from assistive tech and the keyboard. Reduced motion leaves a still, wrapping list.
 */
export function EquipmentTicker({ items, label }: { items: { href: string; name: string }[]; label: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".ticker__track");
        if (!track) return;
        const sign = document.documentElement.dir === "rtl" ? 1 : -1;
        const loop = gsap.to(track, { xPercent: 50 * sign, ease: "none", duration: 36, repeat: -1 });
        // Start deep into the repeats so scrolling up can run the band backwards without hitting zero.
        loop.totalTime(loop.duration() * 1000);
        let settle: gsap.core.Tween | undefined;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => loop.paused(!self.isActive),
          onUpdate: (self) => {
            const boost = Math.min(1 + Math.abs(self.getVelocity()) / 350, 6);
            settle?.kill();
            gsap.to(loop, { timeScale: self.direction * boost, duration: 0.25, overwrite: true });
            settle = gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.25 });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <nav className="ticker" aria-label={label} ref={root}>
      <ul className="ticker__track">
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li key={`${copy}-${item.href}`} aria-hidden={copy === 1 ? true : undefined}>
              <Link href={item.href} tabIndex={copy === 1 ? -1 : undefined}>
                {item.name}
              </Link>
            </li>
          )),
        )}
      </ul>
    </nav>
  );
}
