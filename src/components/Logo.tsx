import Image from "next/image";

/**
 * Kayan's wordmark, taken from the company portfolio. Two renderings: dark letters for light
 * grounds and light letters for dark grounds. `ground` says which ground it sits on; "ink" means
 * it sits on the --ink colour, which flips with the theme.
 * TODO(brand): replace both PNGs with the vector logo when Kayan supplies it.
 */
export function Logo({ ground, alt, className = "" }: { ground: "page" | "ink" | "dark"; alt: string; className?: string }) {
  return (
    <span className={`logo logo--on-${ground} ${className}`}>
      <Image className="logo__dark-letters" src="/kayan-logo.png" alt={alt} width={226} height={82} priority />
      <Image className="logo__light-letters" src="/kayan-logo-reverse.png" alt={alt} width={226} height={82} priority />
    </span>
  );
}
