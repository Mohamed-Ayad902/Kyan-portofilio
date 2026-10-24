/** Condensed capitals with a rule running to the far edge; slider arrows sit at the end of the rule. */
export function SectionHead({ id, title, children }: { id: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <h2 id={id} className="section-head__title">
        {title}
      </h2>
      <span className="section-head__rule" aria-hidden="true" />
      {children}
    </div>
  );
}
