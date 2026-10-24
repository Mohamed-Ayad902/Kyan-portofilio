import alamein from "@/assets/images/project-alamein-downtown.jpg";
import desert from "@/assets/images/excavator-site-desert.jpg";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { HeroCarousel } from "./HeroCarousel";

/**
 * Three statements already on the site, in rotation: what Kayan rents (over the stock clip), how
 * renting works and the projects named in the portfolio (over portfolio photographs).
 */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home.hero;
  return (
    <HeroCarousel
      title={h.titleLines.join(" ")}
      labels={{
        carousel: h.carouselLabel,
        slideOf: h.slideOf,
        pause: dict.common.pauseSlides,
        play: dict.common.playSlides,
        videoLabel: h.videoLabel,
      }}
      slides={[
        {
          label: dict.nav.equipment,
          titleLines: h.titleLines,
          body: h.standfirst,
          cta: { href: href(locale, "/contact"), label: dict.common.requestQuote },
          tag: dict.common.illustrativeFootage,
        },
        {
          label: dict.nav.process,
          titleLines: [dict.home.models.heading],
          body: dict.home.models.body,
          cta: { href: href(locale, "/rental-process"), label: dict.home.process.link },
          image: desert,
        },
        {
          label: dict.nav.projects,
          titleLines: dict.home.projects.headingLines,
          body: dict.home.projects.lead,
          cta: { href: href(locale, "/projects"), label: dict.home.projects.link },
          image: alamein,
        },
      ]}
    />
  );
}
