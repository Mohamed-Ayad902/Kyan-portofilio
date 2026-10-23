import type { EquipmentSlug } from "@/content/catalog";

/**
 * Flat side elevations of each equipment category, drawn as one consistent set. They stand in
 * where Kayan has no photograph yet and label the category, not a specific machine.
 * Body = currentColor, working parts = --accent, hubs/windows = the ground colour.
 */

const A = "var(--accent)";
const G = "var(--drawing-cut)";

function Wheel({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="currentColor" />
      <circle cx={x} cy={y} r={r * 0.42} fill={G} />
    </g>
  );
}

function Track({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const r = h / 2;
  const n = Math.max(3, Math.round(w / 34));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="currentColor" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + r + ((w - 2 * r) / (n - 1)) * i} cy={y + r} r={r * 0.45} fill={G} />
      ))}
    </g>
  );
}

const drawings: Record<EquipmentSlug, React.ReactNode> = {
  excavators: (
    <>
      <Track x={36} y={146} w={160} h={30} />
      <rect x={54} y={108} width={120} height={36} fill="currentColor" />
      <rect x={44} y={112} width={30} height={32} fill="currentColor" />
      <rect x={118} y={70} width={48} height={40} fill="currentColor" />
      <rect x={126} y={77} width={32} height={22} fill={G} />
      <polygon points="150,112 228,34 242,46 166,124" fill={A} />
      <polygon points="228,34 242,46 276,118 262,124" fill={A} />
      <polygon points="258,116 292,124 288,152 260,150 250,134" fill="currentColor" />
    </>
  ),
  bulldozers: (
    <>
      <Track x={56} y={146} w={176} h={30} />
      <rect x={76} y={104} width={142} height={42} fill="currentColor" />
      <rect x={96} y={62} width={58} height={44} fill="currentColor" />
      <rect x={104} y={70} width={42} height={24} fill={G} />
      <rect x={190} y={78} width={7} height={28} fill="currentColor" />
      <polygon points="214,126 252,118 256,128 218,138" fill="currentColor" />
      <path d="M252 92 Q240 136 254 178 L272 178 Q262 136 272 92 Z" fill={A} />
    </>
  ),
  "dump-trucks": (
    <>
      <rect x={28} y={132} width={258} height={16} fill="currentColor" />
      <polygon points="28,140 28,96 44,80 88,80 88,140" fill="currentColor" />
      <polygon points="38,98 50,88 78,88 78,104 38,104" fill={G} />
      <polygon points="98,64 290,64 290,128 112,128" fill={A} />
      <rect x={98} y={56} width={192} height={10} fill={A} />
      <Wheel x={62} y={160} r={20} />
      <Wheel x={194} y={160} r={20} />
      <Wheel x={244} y={160} r={20} />
    </>
  ),
  rollers: (
    <>
      <rect x={58} y={96} width={86} height={18} fill="currentColor" />
      <circle cx={84} cy={142} r={36} fill={A} />
      <circle cx={84} cy={142} r={12} fill={G} />
      <rect x={128} y={100} width={148} height={46} fill="currentColor" />
      <rect x={180} y={46} width={8} height={56} fill="currentColor" />
      <rect x={244} y={46} width={8} height={56} fill="currentColor" />
      <rect x={172} y={40} width={88} height={10} fill="currentColor" />
      <rect x={200} y={78} width={30} height={22} fill="currentColor" />
      <Wheel x={246} y={150} r={28} />
    </>
  ),
  cranes: (
    <>
      <rect x={18} y={126} width={250} height={18} fill="currentColor" />
      <polygon points="18,130 18,96 32,84 70,84 70,130" fill="currentColor" />
      <rect x={28} y={92} width={32} height={16} fill={G} />
      <rect x={146} y={100} width={88} height={28} fill="currentColor" />
      <rect x={196} y={82} width={34} height={20} fill="currentColor" />
      <polygon points="160,108 292,8 302,20 172,120" fill={A} />
      <rect x={295} y={18} width={3} height={64} fill="currentColor" />
      <rect x={287} y={80} width={20} height={14} fill={A} />
      <Wheel x={44} y={158} r={16} />
      <Wheel x={92} y={158} r={16} />
      <Wheel x={196} y={158} r={16} />
      <Wheel x={238} y={158} r={16} />
    </>
  ),
  forklifts: (
    <>
      <rect x={90} y={26} width={12} height={142} fill={A} />
      <rect x={34} y={160} width={68} height={8} fill={A} />
      <rect x={100} y={118} width={14} height={44} fill="currentColor" />
      <path d="M112 96 L214 96 Q238 96 238 122 L238 160 L112 160 Z" fill="currentColor" />
      <rect x={128} y={44} width={7} height={54} fill="currentColor" />
      <rect x={196} y={44} width={7} height={54} fill="currentColor" />
      <rect x={122} y={38} width={88} height={9} fill="currentColor" />
      <rect x={160} y={70} width={26} height={28} fill="currentColor" />
      <Wheel x={130} y={164} r={18} />
      <Wheel x={214} y={166} r={16} />
    </>
  ),
  clarks: (
    <>
      <rect x={46} y={118} width={60} height={30} fill={A} />
      <rect x={46} y={96} width={28} height={22} fill={A} />
      <rect x={78} y={102} width={28} height={16} fill={A} />
      <rect x={42} y={148} width={68} height={8} fill="currentColor" />
      <rect x={108} y={62} width={10} height={106} fill="currentColor" />
      <rect x={42} y={160} width={76} height={7} fill="currentColor" />
      <path d="M126 112 L208 112 Q228 112 228 132 L228 162 L126 162 Z" fill="currentColor" />
      <rect x={140} y={70} width={6} height={44} fill="currentColor" />
      <rect x={196} y={70} width={6} height={44} fill="currentColor" />
      <rect x={136} y={64} width={70} height={8} fill="currentColor" />
      <Wheel x={144} y={166} r={14} />
      <Wheel x={208} y={167} r={13} />
    </>
  ),
  manlifts: (
    <>
      <rect x={146} y={134} width={128} height={22} fill="currentColor" />
      <rect x={184} y={106} width={60} height={30} fill="currentColor" />
      <polygon points="206,112 220,120 128,48 116,38" fill={A} />
      <polygon points="116,38 128,48 76,32 70,22" fill={A} />
      <rect x={24} y={24} width={52} height={22} fill={A} />
      <rect x={24} y={2} width={5} height={24} fill="currentColor" />
      <rect x={71} y={2} width={5} height={24} fill="currentColor" />
      <rect x={24} y={2} width={52} height={5} fill="currentColor" />
      <Wheel x={170} y={162} r={16} />
      <Wheel x={252} y={162} r={16} />
    </>
  ),
  "scissor-lifts": (
    <>
      <rect x={58} y={142} width={204} height={20} fill="currentColor" />
      <g stroke={A} strokeWidth={9} strokeLinecap="square">
        <line x1={84} y1={140} x2={236} y2={110} />
        <line x1={84} y1={110} x2={236} y2={140} />
        <line x1={84} y1={110} x2={236} y2={80} />
        <line x1={84} y1={80} x2={236} y2={110} />
        <line x1={84} y1={80} x2={236} y2={52} />
        <line x1={84} y1={52} x2={236} y2={80} />
      </g>
      <rect x={58} y={40} width={204} height={12} fill="currentColor" />
      <rect x={58} y={12} width={6} height={30} fill="currentColor" />
      <rect x={256} y={12} width={6} height={30} fill="currentColor" />
      <rect x={58} y={12} width={204} height={6} fill="currentColor" />
      <Wheel x={86} y={168} r={13} />
      <Wheel x={234} y={168} r={13} />
    </>
  ),
};

export function EquipmentDrawing({ slug, title, className = "" }: { slug: EquipmentSlug; title: string; className?: string }) {
  return (
    <svg className={`drawing ${className}`} viewBox="0 0 320 200" role="img" aria-label={title} preserveAspectRatio="xMidYMax meet">
      <rect x={0} y={182} width={320} height={18} fill="var(--drawing-ground)" />
      {drawings[slug]}
    </svg>
  );
}
