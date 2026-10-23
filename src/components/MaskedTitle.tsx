/** A heading whose authored lines rise from behind their own baselines (pure CSS, see .lines). */
export function MaskedTitle({
  lines,
  as: Tag = "h2",
  className = "",
  id,
}: {
  lines: readonly string[];
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={`lines ${className}`} id={id}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span data-line style={{ "--i": i } as React.CSSProperties}>
            {line}
          </span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
