/**
 * "Many into one": loose requirements on the start side, pulled into a single ribbon (the rental
 * plan), then released as ordered rows of machines in the accent colour. Deterministic, so the
 * server and browser draw the same squares. In RTL the drawing is mirrored with the reading order.
 */
function rand(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function ProcessDiagram({ label }: { label: string }) {
  const r = rand(20260123);
  const squares: { x: number; y: number; tone: "a" | "b" | "c" }[] = [];
  const W = 1200;
  const H = 260;
  const s = 12;
  // Scatter: left third.
  for (let i = 0; i < 52; i++) squares.push({ x: 8 + r() * 360, y: 12 + r() * (H - 36), tone: r() > 0.5 ? "a" : "b" });
  // Ribbon: middle third, three squares high.
  for (let col = 0; col < 18; col++) for (let row = 0; row < 3; row++) squares.push({ x: 420 + col * 20, y: H / 2 - 30 + row * 20, tone: "b" });
  // Ordered rows: right third, evenly spaced, accent.
  for (let col = 0; col < 9; col++) for (let row = 0; row < 6; row++) squares.push({ x: 840 + col * 40, y: 24 + row * 40, tone: "c" });

  return (
    <svg className="diagram" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      {squares.map((q, i) => (
        <rect key={i} className={`diagram__sq diagram__sq--${q.tone}`} x={q.x.toFixed(1)} y={q.y.toFixed(1)} width={s} height={s} />
      ))}
    </svg>
  );
}
