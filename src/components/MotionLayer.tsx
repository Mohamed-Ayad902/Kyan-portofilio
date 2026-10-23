"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * One motion layer for every page, driven by data attributes so sections stay server components.
 *  - [data-reveal]      rises 24px and fades in once when it enters (siblings stagger by order)
 *  - [data-parallax]    drifts slowly against the scroll (photographs only)
 *  - [data-chapter]     an inset panel that opens to full bleed while its picture settles
 * Content is only hidden by script, and only when it starts below the fold, so nothing stays
 * invisible if JavaScript fails. Reduced motion skips everything.
 */
export function MotionLayer() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fold = window.innerHeight * 0.92;
        const pending = gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter((el) => el.getBoundingClientRect().top > fold);
        if (pending.length) {
          gsap.set(pending, { autoAlpha: 0, y: 24 });
          ScrollTrigger.batch(pending, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, overwrite: true }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      // The chapter panels open from an inset only where their padding is wider than the inset.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
          const panel = chapter.querySelector<HTMLElement>("[data-chapter-panel]");
          const picture = chapter.querySelector<HTMLElement>("[data-chapter-picture]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: chapter, start: "top 85%", end: "top 15%", scrub: 0.6 } });
          if (panel) tl.fromTo(panel, { clipPath: "inset(20px 20px 20px 20px)" }, { clipPath: "inset(0px 0px 0px 0px)", ease: "none" }, 0);
          if (picture) tl.fromTo(picture, { scale: 0.92 }, { scale: 1, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
