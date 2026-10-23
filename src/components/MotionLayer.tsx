"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * One motion layer for every page, driven by data attributes and plain selectors so sections stay
 * server components.
 *  - [data-reveal]      rises and fades in once when it enters (siblings stagger by order)
 *  - main h2            lines rise from behind their own baselines (not in Chinese: no word breaks)
 *  - main figure > img  the frame wipes open from the bottom while the photo settles from a zoom
 *  - [data-parallax]    drifts slowly against the scroll (photographs only)
 *  - [data-chapter]     an inset panel that opens to full bleed while its picture settles
 *  - .diagram           the process squares appear in reading order with the scroll
 *  - .btn--accent/ink   lean toward a fine pointer
 * Content is only hidden by script, and only when it starts below the fold, so nothing stays
 * invisible if JavaScript fails. Reduced motion skips everything.
 */
const SPLIT = "main h2:not(.lines):not(.visually-hidden):not(.work__title)";

export function MotionLayer() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fold = window.innerHeight * 0.92;
        const below = (el: Element) => el.getBoundingClientRect().top > fold;
        const splitHeadings = document.documentElement.lang.startsWith("zh")
          ? []
          : gsap.utils.toArray<HTMLElement>(SPLIT).filter(below);
        const frames = gsap.utils
          .toArray<HTMLElement>("main figure")
          .filter((f) => f.querySelector(":scope > img") && !f.closest(".work--pinned, .mosaic") && below(f));

        splitHeadings.forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        frames.forEach((frame) => {
          const img = frame.querySelector<HTMLElement>(":scope > img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 86%", once: true } });
          tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", clearProps: "clipPath" });
          // Photos without parallax hand their transform back to CSS for the hover zoom.
          if (img) tl.from(img, { scale: 1.22, duration: 1.8, ease: "expo.out", clearProps: img.hasAttribute("data-parallax") ? "" : "transform" }, 0.15);
        });

        const handled = new Set<HTMLElement>([...splitHeadings, ...frames]);
        const pending = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => below(el) && !handled.has(el));
        if (pending.length) {
          gsap.set(pending, { autoAlpha: 0, y: 36 });
          ScrollTrigger.batch(pending, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.09, overwrite: true }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        gsap.utils.toArray<SVGSVGElement>("main .diagram").forEach((svg) => {
          gsap.from(svg.querySelectorAll(".diagram__sq"), {
            scale: 0,
            transformOrigin: "50% 50%",
            ease: "none",
            stagger: { each: 0.01, from: document.documentElement.dir === "rtl" ? "end" : "start" },
            scrollTrigger: { trigger: svg, start: "top 90%", end: "bottom 55%", scrub: 0.8 },
          });
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

      // Solid buttons lean a little toward the pointer, then spring back.
      mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
        const offs: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>(".btn--accent, .btn--ink").forEach((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
          const y = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.18);
            y((e.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: true });
          };
          btn.addEventListener("pointermove", move);
          btn.addEventListener("pointerleave", leave);
          offs.push(() => {
            btn.removeEventListener("pointermove", move);
            btn.removeEventListener("pointerleave", leave);
          });
        });
        return () => offs.forEach((off) => off());
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
