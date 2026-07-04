import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * ProductCard — touch-safe responsive adaptation.
 *
 *  ▸ Desktop (lg+): preserves the 3D flip-card reveal. Hover or focus triggers
 *    a Y-axis rotation that exposes structural ISO 8217 specs on the reverse.
 *  ▸ Mobile / touch: hover doesn't exist, so 3D rotation is disabled. Instead
 *    the card becomes a tap-to-expand accordion: status visible by default,
 *    structural specs reveal smoothly below on tap (with an animated chevron).
 *
 *  The breakpoint check happens once on mount and on resize — the component
 *  doesn't try to detect "touch capability", which is unreliable on hybrid
 *  devices. Instead it splits on the same lg breakpoint Tailwind uses for
 *  the rest of the layout, which is the right design contract: above lg the
 *  user has a pointer; below it, assume thumbs.
 *
 *  prefers-reduced-motion fully disables both interactions' transitions.
 */

const TONE = {
  palm:  { dot: 'bg-palm-500',      pill: 'text-palm-500'      },
  amber: { dot: 'bg-coral-500',     pill: 'text-coral-600'     },
  muted: { dot: 'bg-teal-500/40',   pill: 'text-teal-500/55'   },
};

export default function ProductCard({ name, status, tone = 'palm', summary, specs }) {
  const reduce = useReducedMotion();
  const headingId = useId();
  const panelId = useId();

  // Track viewport against Tailwind's lg breakpoint (1024 px). SSR-safe.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  const [flipped, setFlipped] = useState(false);   // desktop only
  const [expanded, setExpanded] = useState(false); // mobile only

  const toneCfg = TONE[tone] || TONE.palm;

  /* ───────────────────────── Desktop flip card ───────────────────────── */
  if (isDesktop) {
    return (
      <div
        className="group [perspective:1400px] cursor-pointer h-[320px]"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        tabIndex={0}
        role="button"
        aria-pressed={flipped}
        aria-label={`${name} — show ISO 8217 specifications`}
      >
        <div
          className={`relative w-full h-full ${reduce ? '' : 'transition-transform duration-700 ease-out'} [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] card-sand p-7 flex flex-col">
            <CardFront name={name} status={status} summary={summary} toneCfg={toneCfg} />
          </div>

          {/* Back */}
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-card-lg p-7 bg-teal-500 text-sand-100 shadow-sand-md flex flex-col">
            <CardBack name={name} specs={specs} />
          </div>
        </div>
      </div>
    );
  }

  /* ───────────────────────── Mobile accordion ────────────────────────── */
  return (
    <div className="card-sand overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((x) => !x)}
        className="w-full text-left p-6 sm:p-7 flex flex-col gap-3"
        aria-expanded={expanded}
        aria-controls={panelId}
        id={headingId}
      >
        <CardFront name={name} status={status} summary={summary} toneCfg={toneCfg} compact />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-caps text-teal-500/55 font-mono">
            {expanded ? 'Hide specs' : 'Tap for ISO specs'}
          </span>
          <span
            className={`grid place-items-center w-8 h-8 rounded-full bg-sand-100 border border-teal-500/10 ${reduce ? '' : 'transition-transform duration-300'} ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-teal-500">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-teal-500 text-sand-100 px-6 sm:px-7 pt-5 pb-6">
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="font-serif text-[18px]">{name}</h4>
                <span className="text-[10px] uppercase tracking-caps text-sand-100/55 font-mono">
                  Structural Specifications
                </span>
              </div>
              <dl className="grid grid-cols-1 gap-2.5">
                {specs.map((s) => (
                  <div key={s.k} className="flex items-baseline justify-between gap-4 border-b border-sand-100/15 pb-2 last:border-none">
                    <dt className="text-[12.5px] text-sand-100/70">{s.k}</dt>
                    <dd className="text-[13.5px] font-medium text-sand-100 font-mono text-right" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[11.5px] text-sand-100/60">
                BDN issued in MARPOL-compliant format. Pre-delivery samples available.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────── Shared subcomponents ───────────────────── */

function CardFront({ name, status, summary, toneCfg, compact = false }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-[26px] sm:text-[28px] leading-none text-teal-500">{name}</h3>
        <span className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${toneCfg.pill}`}>
          <span className={`relative w-1.5 h-1.5 rounded-full ${toneCfg.dot}`} aria-hidden="true" />
          {status}
        </span>
      </div>
      <p className={`mt-3 text-[14px] leading-[1.65] text-teal-500/75 text-pretty ${compact ? '' : 'flex-grow'}`}>
        {summary}
      </p>
      {!compact && (
        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-caps text-teal-500/40 font-mono">
            Hover or tap for ISO specs
          </span>
          <span className="relative w-8 h-8 rounded-full bg-sand-100 border border-teal-500/8 grid place-items-center transition-transform duration-700 group-hover:rotate-180">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-teal-500">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
}

function CardBack({ name, specs }) {
  return (
    <>
      <div className="flex items-baseline justify-between mb-4">
        <h4 className="font-serif text-[22px]">{name}</h4>
        <span className="text-[10.5px] uppercase tracking-caps text-sand-100/55 font-mono">
          Structural Specifications
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-2.5 mt-1">
        {specs.map((s) => (
          <div key={s.k} className="flex items-baseline justify-between gap-4 border-b border-sand-100/12 pb-2 last:border-none">
            <dt className="text-[12.5px] text-sand-100/70">{s.k}</dt>
            <dd className="text-[13.5px] font-medium text-sand-100 font-mono text-right" style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}>
              {s.v}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-auto pt-5 text-[11.5px] text-sand-100/60">
        BDN issued in MARPOL-compliant format. Pre-delivery samples available.
      </p>
    </>
  );
}
