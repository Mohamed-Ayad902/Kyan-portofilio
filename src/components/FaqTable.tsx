import Link from "next/link";

/** Large questions with their answers beside them, all open. The heading is the table's first row. */
export function FaqTable({
  heading,
  items,
  more,
  as: Heading = "h2",
}: {
  heading: string;
  items: { q: string; a: string }[];
  more?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  const QuestionTag = Heading === "h1" ? "h2" : "h3";
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq__row faq__row--head">
        <Heading id="faq-title" className="faq__heading" data-reveal>
          {heading}
        </Heading>
        {more ? (
          <Link className="text-link faq__more" href={more.href} data-reveal>
            {more.label}
          </Link>
        ) : null}
      </div>
      {items.map((item) => (
        <div className="faq__row" key={item.q} data-reveal>
          <QuestionTag className="faq__q">{item.q}</QuestionTag>
          <p className="faq__a">{item.a}</p>
        </div>
      ))}
    </section>
  );
}
