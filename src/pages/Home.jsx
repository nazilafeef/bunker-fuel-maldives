import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import LazyImage from '../components/LazyImage.jsx';
import Reveal from '../components/Reveal.jsx';
import NominationForm from '../components/NominationForm.jsx';
import ProductCard from '../components/ProductCard.jsx';

/* ════════════════════════════════════════════════════════
   Bunker Fuel Maldives — Home (single-page masterpiece)
   Twelve blocks: Hero · Status Strip · Products · Custody ·
   Operations · Track Record · Why Malé · A Pause Between
   Voyages · For Yachts in Transit · Principal · Credentials
   · Nomination · Contact / Footer
   ──────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Hero />
      <StatusStrip />
      <Products />
      <ChainOfCustody />
      <Operations />
      <TrackRecord />
      <WhyMale />
      <PauseBetweenVoyages />
      <ForYachtsInTransit />
      <Principal />
      <Credentials />
      <Nomination />
      <ContactFooter />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 1. HERO                                                  */
/* ──────────────────────────────────────────────────────── */

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // 6–8% soft parallax cap — strictly per spec
  const heroY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 42]);
  const heroScale = useTransform(scrollY, [0, 600], [1, reduce ? 1 : 1.06]);

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-teal-700">
      {/* Background image with soft parallax */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/images/hero-marine-bella-yc-barrier.jpg"
          alt="Marine Bella bunker barge alongside YC Barrier in open Maldivian waters, with an island profile on the horizon"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </motion.div>

      {/* Gradient veils — explicit teal masks for rock-solid headline legibility
          over the rich marine image. Top wash softens nav glass on dark sky;
          bottom wash anchors the headline, subhead, CTAs, and trust strip. */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0F4C5C]/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0F4C5C]/95 via-[#0F4C5C]/50 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-editorial flex flex-col min-h-[100svh] pt-28 sm:pt-32 pb-12">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-lagoon-400 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-caps text-white/95">
              Republic of Maldives · Indian Ocean Corridor
            </span>
          </div>
        </Reveal>

        <div className="mt-auto pt-12 sm:pt-16 max-w-3xl">
          <Reveal delay={0.15}>
            <h1 className="font-serif text-white text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.96] tracking-[-0.02em] text-balance">
              Marine Fuel. <span className="italic font-light text-lagoon-400">Malé.</span>
              <br />Direct Supply.
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-6 sm:mt-7 text-[15.5px] sm:text-[17px] leading-relaxed text-white/85 max-w-2xl text-pretty">
              Physical bunker supply at Malé Port, Outer Anchorage, and Thilafushi Anchorage —
              sourced exclusively through the Republic of Maldives' two licensed national fuel
              importers.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
              <a href="#nomination" className="btn-coral">
                Send a Nomination
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a
                href="mailto:n.afeef@bunkerfuelmaldives.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[15px] font-medium border border-white/20 hover:bg-white/15 transition-colors"
              >
                Speak to the MD
              </a>
            </div>
          </Reveal>

          {/* Trust strip — IMO + D-U-N-S + accreditations + Reg
              (DRY: this is the *primary* designated section for these identifiers) */}
          <Reveal delay={0.6}>
            <div className="mt-12 sm:mt-14 grid grid-flow-col auto-cols-max gap-x-7 gap-y-3 overflow-x-auto no-scrollbar pb-1">
              <TrustChip label="IMO Company No." value="6418086" tabular />
              <TrustChip label="D-U-N-S" value="984560571" tabular />
              <TrustChip label="BIMCO" value="Member" />
              <TrustChip label="IBIA" value="Member" />
              <TrustChip label="Maldives Reg." value="C00212023" tabular />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>
      )}
    </section>
  );
}

function TrustChip({ label, value, tabular }) {
  return (
    <div className="flex flex-col gap-0.5 shrink-0">
      <span className="text-[10px] uppercase tracking-caps text-white/60">{label}</span>
      <span
        className={`text-[13.5px] font-medium text-white ${tabular ? 'font-mono' : ''}`}
        style={tabular ? { fontVariantNumeric: 'tabular-nums lining-nums' } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 2. STATUS / AVAILABILITY STRIP                            */
/* ──────────────────────────────────────────────────────── */

function StatusStrip() {
  // Firestore-driven in production. Statically tagged here for the build.
  const weekTag = 'Week of 11 May 2026';
  const reduce = useReducedMotion();

  const items = [
    { product: 'LSMGO', status: 'Available', tone: 'palm', note: 'Short-notice firm stems' },
    { product: 'VLSFO', status: 'Advance Booking', tone: 'amber', note: 'Send nominations early' },
    { product: 'Marine Lubes', status: 'Brand-dependent', tone: 'palm', note: '24h confirmation' },
    { product: 'HFO 3.5%', status: 'Not currently supplied', tone: 'muted', note: 'Referrals to Colombo · Fujairah' },
  ];

  // Doubled for seamless loop
  const doubled = [...items, ...items];

  return (
    <section
      aria-labelledby="status-strip-label"
      className="relative z-10 -mt-1 bg-teal-500 text-sand-100 grain"
    >
      <div className="container-editorial py-5 sm:py-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="relative inline-block w-2 h-2 rounded-full bg-lagoon-400">
              {!reduce && (
                <span className="absolute inset-0 rounded-full bg-lagoon-400 animate-ping" />
              )}
            </span>
            <span id="status-strip-label" className="text-[11px] uppercase tracking-caps font-medium text-sand-100/95">
              Operational Status
            </span>
            <span
              className="hidden sm:inline text-[11px] text-sand-100/55 font-mono ml-1"
              style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
            >
              · Updated weekly · {weekTag}
            </span>
          </div>

          {/* Ticker */}
          <div className="flex-1 min-w-0 overflow-hidden mask-fade">
            <div className={`flex gap-8 sm:gap-12 ${reduce ? '' : 'animate-ticker'} w-max`}>
              {doubled.map((it, i) => (
                <StatusPill key={i} {...it} />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-3 sm:mt-3.5 text-[12px] text-sand-100/65 leading-relaxed max-w-3xl">
          Typical lead time from firm nomination to delivery:{' '}
          <span
            className="text-sand-100/95 font-mono font-medium"
            style={{ fontVariantNumeric: 'tabular-nums lining-nums' }}
          >
            24–48 hours
          </span>, subject to barge scheduling.
        </p>
      </div>

      <style>{`.mask-fade { -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }`}</style>
    </section>
  );
}

function StatusPill({ product, status, tone, note }) {
  const tones = {
    palm:   { dot: 'bg-palm-400',     text: 'text-palm-400' },
    amber:  { dot: 'bg-coral-400',    text: 'text-coral-400' },
    muted:  { dot: 'bg-sand-100/40',  text: 'text-sand-100/55' },
  };
  const t = tones[tone] || tones.palm;
  return (
    <div className="flex items-center gap-3 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
      <span className="text-[13px] font-medium text-sand-100">{product}</span>
      <span className={`text-[12.5px] font-medium ${t.text}`}>{status}</span>
      <span className="text-[12px] text-sand-100/55">· {note}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 3. PRODUCTS — flip tiles                                 */
/* ──────────────────────────────────────────────────────── */

function Products() {
  const items = [
    {
      name: 'LSMGO',
      status: 'Available',
      tone: 'palm',
      summary:
        "Low Sulphur Marine Gas Oil, max 0.10% sulphur. ECA-compliant. Standing availability suitable for short-notice firm nominations to Malé Port, Outer Anchorage, or Thilafushi Anchorage.",
      specs: [
        { k: 'Grade', v: 'ISO 8217 DMA' },
        { k: 'Sulphur', v: '≤ 0.10%' },
        { k: 'Compliance', v: 'ECA' },
        { k: 'Density @ 15°C', v: '≤ 890 kg/m³' },
      ],
    },
    {
      name: 'VLSFO',
      status: 'Advance Booking',
      tone: 'amber',
      summary:
        'Very Low Sulphur Fuel Oil, max 0.50% sulphur. ISO 8217:2017 compliant, MARPOL Annex VI global cap compliant. Stems subject to allocation — send nominations as early as possible against expected ETA and lay can.',
      specs: [
        { k: 'Spec', v: 'ISO 8217:2017' },
        { k: 'Sulphur', v: '≤ 0.50%' },
        { k: 'MARPOL', v: 'Annex VI Global Cap' },
        { k: 'Viscosity', v: 'On nomination' },
      ],
    },
    {
      name: 'Marine Lubricants',
      status: 'Brand-dependent',
      tone: 'palm',
      summary:
        'Cylinder oils, system oils, trunk piston engine oils. Specify required brand and grade with your nomination. Stock position and lead time confirmed within 24 hours on working days.',
      specs: [
        { k: 'Cylinder oils', v: 'On request' },
        { k: 'System oils', v: 'On request' },
        { k: 'TPEO grades', v: 'Brand-specified' },
        { k: 'Confirmation', v: '< 24h working' },
      ],
    },
    {
      name: 'HFO (≤ 3.50%)',
      status: 'Not Currently Supplied',
      tone: 'muted',
      summary:
        "We do not supply HFO ex-Malé at this time. For vessels requiring HFO on the Indian Ocean transit, we can refer buyers to suppliers in Colombo, Fujairah, or other regional ports. A referral that protects your schedule is more useful than a stem we cannot honour.",
      specs: [
        { k: 'Status', v: 'Referral only' },
        { k: 'Alt. ports', v: 'Colombo · Fujairah' },
        { k: 'Honesty', v: 'Over a stem we cannot keep' },
      ],
    },
  ];

  return (
    <section id="products" className="py-20 sm:py-28 bg-sand-100">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Products"
          title="Products and current availability."
          intro="What we lift, what's on advance booking, and what we won't pretend to have. Specifications and current status below."
        />

        <Reveal>
          <div className="mt-12 sm:mt-14 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {items.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-card-lg bg-white/60 border border-teal-500/8">
            <p className="text-[13.5px] text-teal-500/85 leading-relaxed">
              <span className="small-caps-teal text-[12px] font-semibold mr-1.5">Laboratory analysis ·</span>
              Independent laboratory analysis (Geo-Chem Middle East and equivalent) is available
              on request prior to delivery. Independent quantity and quality surveys can be
              arranged at the buyer's instruction.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ──────────────────────────────────────────────────────── */
/* 4. CHAIN OF CUSTODY                                       */
/* ──────────────────────────────────────────────────────── */

function ChainOfCustody() {
  return (
    <section id="custody" className="py-20 sm:py-28 bg-white">
      <div className="container-editorial grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Image */}
        <Reveal className="lg:col-span-6 order-2 lg:order-1" y={20}>
          <figure className="relative">
            <LazyImage
              src="/images/sto-alimas-male-port.jpg"
              alt="STO-Maldives tanker Alimas berthed at Malé port — upstream of the bunker supply chain"
              aspectRatio="5/4"
              className="rounded-card-lg shadow-sand-md"
              objectPosition="center"
            />
            <figcaption className="mt-3 flex items-center gap-2 text-[11px] tracking-caps uppercase text-teal-500/65">
              <span className="w-6 h-px bg-teal-500/30" aria-hidden="true" />
              STO Alimas · Malé Port · Upstream Custody
            </figcaption>

            {/* Floating proof card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 max-w-[240px] card-sand p-4 hidden sm:block">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-palm-500" />
                <span className="text-[10.5px] uppercase tracking-caps font-semibold text-palm-500">Verified Upstream</span>
              </div>
              <p className="text-[12px] text-teal-500/75 leading-snug">
                Every litre traceable from licensed importer storage through to the Bunker Delivery Note.
              </p>
            </div>
          </figure>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Why We Source Through STO and FSM</span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-teal-500 mt-3 text-balance">
              Chain of custody begins upstream.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-[15.5px] leading-[1.7] text-teal-500/80 text-pretty">
              <p>
                The single largest cause of bunker quality disputes is what happens{' '}
                <em className="font-serif text-teal-500">before</em> the fuel reaches the barge.
                We addressed that question at the structural level: every litre we supply originates
                with one of the two licensed national fuel importers in the Republic of Maldives —{' '}
                <span className="font-medium text-teal-500">State Trading Organisation (STO)</span>{' '}
                or <span className="font-medium text-teal-500">Fuel Supplies Maldives (FSM)</span>.
              </p>
              <p>
                We do not source from informal channels, intermediary resellers, or grey-market stock.
                There is no second tier between the licensed importer and the vessel.
              </p>
              <p>
                This matters operationally. The product arriving at your manifold can be traced — on
                paper — from importer storage through to the BDN. The specification you nominate
                against is the specification physically lifted, not a number assembled from blended
                sources. If a sample is contested, the chain of custody supports your position, not
                undermines it.
              </p>
              <p className="text-[14px] text-teal-500/65">
                Bunker Delivery Notes are issued in MARPOL-compliant format. Pre-delivery samples
                and independent surveys are available on request, and we recommend both for any
                first transaction with a new counterparty — including us.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 5. OPERATIONS — 3-step horizontal workflow               */
/* ──────────────────────────────────────────────────────── */

function Operations() {
  const steps = [
    {
      n: '01',
      title: 'Firm Nomination',
      body: 'Send vessel name, IMO number, ETA, product, quantity, and delivery point via email or WhatsApp. Firm quotation is returned within 24 hours on working days (Sunday–Thursday). For genuine out-of-hours operational requirements, the operations WhatsApp is monitored.',
      image: '/images/marine-bella-orange-hull.jpg',
      caption: 'Marine Bella · Bunker Barge',
    },
    {
      n: '02',
      title: 'Supply Confirmation',
      body: 'On nomination acceptance, we confirm allocation against importer stock, schedule barge, and issue confirmation with lay can window. Pre-delivery sample arrangements and independent survey appointments are coordinated at this stage if requested.',
      image: '/images/yc-barrier-supply.jpg',
      caption: 'Alongside · Lay can Confirmation',
    },
    {
      n: '03',
      title: 'Delivery',
      body: 'Physical supply at Malé Port, Outer Anchorage, or Thilafushi Anchorage. Bunker Delivery Note issued in MARPOL-compliant format. Quantity and quality survey reports, where instructed, are released to the buyer directly by the appointed surveyor.',
      image: '/images/aerial-bunker-supply.jpg',
      caption: 'Aerial · Physical Supply',
    },
  ];

  return (
    <section id="operations" className="py-20 sm:py-28 bg-sand-100">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Operations"
          title="How a stem works with us."
          intro="A three-step process. No layers, no relayed messages — commercial decisions are made directly by the Managing Director."
        />

        <div className="mt-12 sm:mt-16 grid lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-lagoon-500/40 to-transparent" aria-hidden="true" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <article className="relative">
                {/* numbered marker */}
                <div className="relative z-10 grid place-items-center w-14 h-14 rounded-full bg-white shadow-sand-md mb-5">
                  <span className="font-serif text-[20px] text-teal-500 tabular">{s.n}</span>
                </div>

                <LazyImage
                  src={s.image}
                  alt={s.caption}
                  aspectRatio="4/3"
                  className="rounded-card-lg shadow-sand mb-5"
                />
                <h3 className="font-serif text-[24px] leading-tight text-teal-500">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-teal-500/75 text-pretty">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 6. TRACK RECORD                                          */
/* ──────────────────────────────────────────────────────── */

function TrackRecord() {
  const records = [
    {
      vessel: 'USS Halsey',
      date: 'March 2024',
      qty: '952 MT',
      product: 'MGO',
      blurb: 'Supplied to the U.S. Navy guided-missile destroyer in Maldives waters, coordinated through international bunker trading partners.',
    },
    {
      vessel: 'MV Sea Lord',
      date: 'July 2025',
      qty: '72 MT',
      product: 'MGO',
      blurb: 'Bunker supply with full appointed agency services, coordinated through international bunker trading partners.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Track Record"
          title="Recent operations."
          intro="A focused operation by design. Two representative supplies, both coordinated through international bunker trading partners."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5 sm:gap-6">
          {records.map((r, i) => (
            <Reveal key={r.vessel} delay={i * 0.08}>
              <article className="card-sand p-6 sm:p-8 group hover:shadow-sand-lg transition-shadow duration-500">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10.5px] uppercase tracking-caps text-teal-500/55">{r.date}</span>
                    <h3 className="font-serif text-[28px] sm:text-[30px] leading-tight text-teal-500 mt-1">{r.vessel}</h3>
                  </div>
                  <div className="text-right shrink-0 pl-4 border-l border-teal-500/8">
                    <div className="text-[10.5px] uppercase tracking-caps text-teal-500/55">Lifted</div>
                    <div className="font-serif text-[24px] text-coral-500 tabular leading-none mt-1">{r.qty}</div>
                    <div className="text-[11px] text-teal-500/55 tabular mt-1">{r.product}</div>
                  </div>
                </div>
                <p className="mt-5 text-[14px] leading-[1.7] text-teal-500/70">{r.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 7. WHY MALÉ                                              */
/* ──────────────────────────────────────────────────────── */

function WhyMale() {
  const reasons = [
    {
      title: 'Strategic Position',
      body: 'Malé sits on the East–West Indian Ocean corridor between the Strait of Hormuz, the Bay of Bengal, and the Malacca Strait. For vessels routing east of Suez or transiting between the Gulf and Southeast Asia, a Malé stem is a clean deviation rather than a detour.',
      icon: 'compass',
    },
    {
      title: 'Direct Physical Supply',
      body: 'Fuel is lifted directly from the two licensed national importers — STO and FSM — into the supply chain. No reseller tier, no intermediary counterparty between the importer and the vessel. The commercial counterparty on your BDN is the same entity managing the physical supply.',
      icon: 'pipeline',
    },
    {
      title: 'Principal-Led Operation',
      body: 'Commercial decisions, allocation calls, and dispute handling are made by the Managing Director, not delegated through a sales layer. For trading desks accustomed to chasing answers through three intermediaries, the difference is felt in response time and in what gets resolved on the first call.',
      icon: 'signature',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-sand-100 to-lagoon-50">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Why Bunker in Malé</span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-teal-500 mt-3 text-balance">
              Why Malé as a stem point.
            </h2>
            <p className="mt-5 text-[15px] text-teal-500/70 leading-relaxed max-w-md text-pretty">
              Three structural reasons, written for charter desks accustomed to chasing answers
              through intermediaries.
            </p>
          </Reveal>

          <div className="lg:col-span-7 space-y-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <article className="group card-sand p-6 sm:p-7 hover:shadow-sand-md transition-shadow duration-500">
                  <div className="flex items-start gap-5">
                    <ReasonIcon name={r.icon} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[22px] text-teal-500 leading-tight">{r.title}</h3>
                      <p className="mt-2.5 text-[14.5px] leading-[1.7] text-teal-500/75 text-pretty">{r.body}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonIcon({ name }) {
  const paths = {
    compass: <><circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M14 7l2.5 5L14 19l-2.5-7z" fill="currentColor"/></>,
    pipeline: <><path d="M3 14h6m10 0h-6m-4-4v8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/><circle cx="9" cy="14" r="2" fill="currentColor"/><circle cx="19" cy="14" r="2" fill="currentColor"/></>,
    signature: <><path d="M5 18c2-4 4-8 7-8s3 4 5 4 4-2 6-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M6 21h16" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/></>,
  };
  return (
    <span className="shrink-0 grid place-items-center w-12 h-12 rounded-card-sm bg-lagoon-500/12 text-lagoon-700">
      <svg viewBox="0 0 28 28" className="w-6 h-6">{paths[name]}</svg>
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 8. A PAUSE BETWEEN VOYAGES — psychological differentiator */
/* ──────────────────────────────────────────────────────── */

function PauseBetweenVoyages() {
  const items = [
    {
      img: '/images/overwater-villas-horseshoe.jpg',
      micro: 'Crew Welfare',
      caption: 'Overwater Villas · Crew Rest',
      body: 'Routing through Malé places the vessel within seaplane distance of resort overnighting. Crew turnarounds, master relief, and short owner rotations become operationally trivial rather than logistically aspirational.',
      aspect: '4/5',
    },
    {
      img: '/images/seaplane-sandbank.jpg',
      micro: 'Transit Optimization',
      caption: 'Seaplane Transfer · Master Relief',
      body: 'A 20-minute transfer from Velana International (MLE) to a sandbank-front property is feasible while the barge is still alongside. Reliefs that would otherwise require port days collapse into the bunkering window.',
      aspect: '3/4',
    },
    {
      img: '/images/telescope-resort-deck.jpg',
      micro: 'Logistics Applied',
      caption: 'Resort Deck · Owner Overnight',
      body: "For owners and charter principals, the alternative to a sterile bunker port is a deck looking onto the lagoon while ops are completed. The stem becomes the brief pause your voyage plan would otherwise omit.",
      aspect: '5/4',
    },
  ];

  return (
    <section id="pause" className="py-20 sm:py-28 bg-sand-100 relative overflow-hidden">
      {/* Soft horizon gradient */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-lagoon-500/20 to-transparent" />

      <div className="container-editorial">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow">A Pause Between Voyages</span>
            <h2 className="font-serif text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-teal-500 mt-3 text-balance">
              The commercial reward <span className="italic font-light text-coral-500">for routing through Malé.</span>
            </h2>
            <p className="mt-6 text-[16px] sm:text-[17px] text-teal-500/75 leading-[1.7] max-w-2xl text-pretty">
              A stem at Malé is not merely a fuel decision. It places the vessel within reach of the
              archipelago's hospitality infrastructure — coordinated alongside our parent company,
              Portside Agency — turning bunker time into crew rest, master relief, or owner-overnight value.
            </p>
          </div>
        </Reveal>

        {/* Editorial mosaic — asymmetric, not a gallery */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Large left image */}
          <Reveal className="lg:col-span-7 lg:row-span-2" y={20}>
            <figure>
              <LazyImage
                src={items[0].img}
                alt={items[0].caption}
                aspectRatio="4/3"
                className="rounded-card-lg shadow-sand-md"
              />
              <figcaption className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-500/55 mb-2">{items[0].micro}</div>
                <div className="small-caps-teal text-[11.5px] mb-2">{items[0].caption}</div>
                <p className="text-[14.5px] leading-[1.7] text-teal-500/80 max-w-lg text-pretty">{items[0].body}</p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Stacked right column */}
          <Reveal className="lg:col-span-5" delay={0.1} y={20}>
            <figure>
              <LazyImage
                src={items[1].img}
                alt={items[1].caption}
                aspectRatio="3/4"
                className="rounded-card-lg shadow-sand-md"
              />
              <figcaption className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-500/55 mb-2">{items[1].micro}</div>
                <div className="small-caps-teal text-[11.5px] mb-2">{items[1].caption}</div>
                <p className="text-[14px] leading-[1.7] text-teal-500/80 text-pretty">{items[1].body}</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.2} y={20}>
            <figure>
              <LazyImage
                src={items[2].img}
                alt={items[2].caption}
                aspectRatio="5/4"
                className="rounded-card-lg shadow-sand-md"
              />
              <figcaption className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-500/55 mb-2">{items[2].micro}</div>
                <div className="small-caps-teal text-[11.5px] mb-2">{items[2].caption}</div>
                <p className="text-[14px] leading-[1.7] text-teal-500/80 text-pretty">{items[2].body}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 9. FOR YACHTS IN TRANSIT                                  */
/* ──────────────────────────────────────────────────────── */

function ForYachtsInTransit() {
  return (
    <section className="py-20 sm:py-28 bg-teal-500 text-sand-100 relative overflow-hidden grain">
      {/* Decorative wave hairline */}
      <svg className="absolute inset-x-0 top-0 w-full h-8 text-sand-100/10" viewBox="0 0 1200 32" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 16 Q 150 4 300 16 T 600 16 T 900 16 T 1200 16" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <div className="container-editorial grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <Reveal className="lg:col-span-6">
          <span className="text-[11px] uppercase tracking-caps text-lagoon-400">For Yachts in Transit</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-sand-100 mt-3 text-balance">
            Superyacht support, coordinated alongside Portside Agency.
          </h2>

          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.7] text-sand-100/85 max-w-xl text-pretty">
            <p>
              For yachts inbound between Suez and Phuket — or transiting the Indian Ocean to and
              from the Mediterranean season — a Malé stem combines fuel with full-service
              agency: clearance, provisioning, berthing introductions, and resort overnight
              coordination through our parent company.
            </p>
            <p className="text-sand-100/70">
              Captains, charter managers, and management offices brief us through the same desk
              that handles the bunker stem. There is no second counterparty to chase.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#nomination" className="btn-coral">Brief the Desk</a>
            <a
              href="https://portsideagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/8 backdrop-blur-sm border border-sand-100/20 text-sand-100 text-[15px] font-medium hover:bg-white/14 transition-colors"
            >
              Visit Portside Agency
              <svg viewBox="0 0 14 14" className="w-3 h-3" aria-hidden="true"><path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={0.1} y={24}>
          <div className="grid grid-cols-2 gap-4">
            <ServiceCell title="Clearance" body="Inbound & outbound port formalities, handled by agency." />
            <ServiceCell title="Provisioning" body="Cold chain coordination through Malé wholesalers." />
            <ServiceCell title="Berthing" body="Introductions to commercial harbour and yacht-suitable anchorages." />
            <ServiceCell title="Resort liaison" body="Overnight, F&B, and seaplane transfers for owners and crew." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCell({ title, body }) {
  return (
    <div className="p-5 rounded-card-lg bg-sand-100/5 border border-sand-100/12 backdrop-blur-sm hover:bg-sand-100/10 transition-colors">
      <h4 className="font-serif text-[18px] text-sand-100 leading-tight">{title}</h4>
      <p className="mt-1.5 text-[13px] text-sand-100/65 leading-relaxed">{body}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 10. THE PRINCIPAL                                         */
/* ──────────────────────────────────────────────────────── */

function Principal() {
  return (
    <section id="principal" className="py-20 sm:py-28 bg-white">
      <div className="container-editorial grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <Reveal className="lg:col-span-5" y={20}>
          <figure className="lg:sticky lg:top-28">
            <LazyImage
              src="/images/nazil-afeef-principal.jpg"
              alt="Uz. Nazil Afeef, Managing Director of Bunker Fuel Maldives"
              aspectRatio="4/5"
              className="rounded-card-lg shadow-sand-md"
              objectPosition="center top"
            />
            <figcaption className="mt-4">
              <div className="small-caps-teal text-[11.5px]">Uz. Nazil Afeef · Managing Director</div>
              <div className="text-[12px] text-teal-500/60 mt-1">English · Hindi · Dhivehi</div>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow">The Principal</span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-teal-500 mt-3 text-balance">
              Legal training, applied to <span className="italic font-light">maritime contracts.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 space-y-5 text-[15.5px] leading-[1.7] text-teal-500/80 text-pretty">
              <p>
                Bunker Fuel Maldives is led by Uz. Nazil Afeef — twenty years in the maritime
                industry, with a legal background that is uncommon among small-port bunker
                principals.
              </p>
              <p>
                Before founding Portside Agency, he spent nearly four years as Claims Officer at
                Maldives Ports Limited, the national port authority — drafting contracts,
                investigating claims, and advising on charter party and cargo disputes from the
                regulator's side of the table. He subsequently served as Deputy Under Secretary in
                the Office of the President and as a Full Time Member of the Clemency Board,
                before moving into managing director roles in London and Malé.
              </p>
              <p>
                The combination is deliberate: legal training applied to maritime contracts,
                accounting discipline applied to the commercials, and two decades of port-side
                and managerial experience applied to the operations. Disputes are read before they
                become disputes.
              </p>
              <p className="text-[14.5px] text-teal-500/65 italic">
                Day-to-day commercial decisions on every stem pass across his desk.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://linkedin.com/in/nazilafeef"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sand-100 border border-teal-500/10 text-[13px] font-medium text-teal-500 hover:border-lagoon-500 hover:bg-white transition-colors"
              >
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor"><path d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM5 13H3V6h2v7zm-1-8a1.15 1.15 0 110-2.3A1.15 1.15 0 014 5zm9 8h-2v-3.4c0-.8 0-1.9-1.2-1.9S9.5 8.7 9.5 9.5V13h-2V6h1.9v.9h.03a2.1 2.1 0 011.9-1.05c2 0 2.4 1.3 2.4 3V13z"/></svg>
                Full LinkedIn Bio
              </a>
              <a
                href="https://portsideagency.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sand-100 border border-teal-500/10 text-[13px] font-medium text-teal-500 hover:border-lagoon-500 hover:bg-white transition-colors"
              >
                Parent Company · Portside Agency
                <svg viewBox="0 0 14 14" className="w-3 h-3" aria-hidden="true"><path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 11. CREDENTIALS                                          */
/* ──────────────────────────────────────────────────────── */

function Credentials() {
  const [modal, setModal] = useState(null);

  // DRY: IMO/D-U-N-S/Reg appear here as their *secondary* designated section
  // (Hero trust strip = primary). All other identifiers live exclusively here.
  const tiles = [
    { code: 'IMO', label: 'IMO Company No.', value: '6418086', verify: 'IMO public registry', tabular: true },
    { code: 'DUNS', label: 'D-U-N-S Number', value: '984560571', verify: 'Dun & Bradstreet directory', tabular: true },
    { code: 'MV-REG', label: 'Maldives Registration', value: 'C00212023', verify: 'business.egov.mv · 09 Jan 2023', tabular: true },
    { code: 'ISIC', label: 'ISIC 4661 Licence', value: 'Wholesale of Fuels', verify: 'Ministry of Economic Development · 14 May 2023' },
    { code: 'BIMCO', label: 'BIMCO', value: 'Member', verify: 'BIMCO member directory' },
    { code: 'IBIA', label: 'IBIA', value: 'Member', verify: 'IBIA member directory' },
  ];

  return (
    <section className="py-20 sm:py-28 bg-sand-100">
      <div className="container-editorial">
        <SectionHeader
          eyebrow="Credentials"
          title="Independently verifiable."
          intro="Six identifiers, each cleanly mapped to its registry of origin. Tap any tile for the verification pathway."
        />

        <Reveal>
          <div className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {tiles.map((t, i) => (
              <button
                key={t.code}
                onClick={() => setModal(t)}
                className="group text-left p-5 sm:p-6 card-sand hover:shadow-sand-md transition-all duration-400 hover:-translate-y-0.5"
                aria-label={`${t.label} — open verification details`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-caps font-semibold text-lagoon-700">{t.code}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-palm-500" aria-label="Verified" />
                </div>
                <div className={`font-serif text-[20px] sm:text-[22px] text-teal-500 leading-tight tracking-tight ${t.tabular ? 'tabular' : ''}`}>
                  {t.value}
                </div>
                <div className="mt-1.5 text-[12px] text-teal-500/60">{t.label}</div>
              </button>
            ))}
          </div>
        </Reveal>

        {/* IBIA Code of Conduct citation — minimalist textual */}
        <Reveal delay={0.1}>
          <p className="mt-10 text-[12.5px] text-teal-500/60 leading-relaxed max-w-3xl">
            All registrations independently verifiable via the Maldives Business Registry at{' '}
            <a href="https://business.egov.mv" target="_blank" rel="noopener noreferrer" className="text-teal-500 underline-offset-2 hover:underline">
              business.egov.mv
            </a>
            . Our conduct is governed by the{' '}
            <a
              href="/docs/IBIA_Code_of_Conduct.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 underline-offset-2 hover:underline"
            >
              IBIA Code of Conduct
            </a>
            {' '}— fair business, best practice, social responsibility, transparency.
          </p>
        </Reveal>

        {/* Verification modal */}
        {modal && <VerifyModal tile={modal} onClose={() => setModal(null)} />}
      </div>
    </section>
  );
}

function VerifyModal({ tile, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const link = tile.code === 'MV-REG' || tile.code === 'ISIC'
    ? 'https://business.egov.mv'
    : tile.code === 'BIMCO'
    ? 'https://www.bimco.org'
    : tile.code === 'IBIA'
    ? 'https://www.ibia.net'
    : tile.code === 'DUNS'
    ? 'https://www.dnb.com'
    : 'https://www.imo.org';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center p-4 bg-teal-900/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md card-sand p-7 sm:p-8 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-title"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full hover:bg-sand-200 text-teal-500/70"
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-caps font-semibold text-lagoon-700">{tile.code}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-palm-500" />
          <span className="text-[10.5px] uppercase tracking-caps text-palm-500 font-semibold">Verified</span>
        </div>
        <h3 id="verify-title" className={`font-serif text-[26px] text-teal-500 ${tile.tabular ? 'tabular' : ''}`}>{tile.value}</h3>
        <p className="mt-1 text-[13px] text-teal-500/60">{tile.label}</p>
        <div className="mt-5 p-4 rounded-card-sm bg-sand-100 border border-teal-500/8">
          <div className="text-[10.5px] uppercase tracking-caps text-teal-500/55 mb-1">Verification pathway</div>
          <div className="text-[13.5px] text-teal-500">{tile.verify}</div>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 btn-teal w-full"
        >
          Open registry
          <svg viewBox="0 0 14 14" className="w-3 h-3"><path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* 12. NOMINATION                                            */
/* ──────────────────────────────────────────────────────── */

function Nomination() {
  return (
    <section id="nomination" className="py-20 sm:py-28 bg-gradient-to-b from-white to-sand-100">
      <div className="container-editorial grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Send a Nomination</span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-teal-500 mt-3 text-balance">
              Firm quotation within <span className="tabular">24 hours</span> on working days.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-teal-500/75 text-pretty max-w-md">
              Sunday–Thursday. For VLSFO allocation, the earlier the nomination, the firmer the
              price. Three short steps — fillable on a bridge wing with one thumb.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 max-w-md">
              <ContactBullet label="Nominations" value="bunker@bunkerfuelmaldives.com" />
              <ContactBullet label="WhatsApp" value="+960 999 3997" tabular />
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08} y={24}>
          <NominationForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactBullet({ label, value, tabular }) {
  return (
    <div className="p-4 rounded-card-sm bg-white border border-teal-500/8">
      <div className="text-[10px] uppercase tracking-caps text-teal-500/55 mb-1">{label}</div>
      <div className={`text-[12.5px] font-medium text-teal-500 break-all ${tabular ? 'tabular' : ''}`}>{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* CONTACT & FOOTER                                         */
/* ──────────────────────────────────────────────────────── */

function ContactFooter() {
  return (
    <footer id="contact" className="bg-teal-700 text-sand-100 pt-20 sm:pt-24 pb-10 grain">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-16 border-b border-sand-100/10">
          {/* Brand block — full-colour BFM mark sits proudly on the dark teal field */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              <img
                src="/logo/logo-full.png"
                alt="Bunker Fuel Maldives — Oil and Gas Business"
                width="180"
                height="180"
                className="w-[140px] sm:w-[160px] h-auto select-none"
                loading="lazy"
                decoding="async"
              />
              <div className="text-[11px] uppercase tracking-caps text-sand-100/55">
                Marine fuel · Sourced licensed
              </div>
            </div>
            <p className="mt-6 text-[14.5px] leading-[1.75] text-sand-100/75 max-w-md text-pretty">
              Physical bunker supply at Malé Port, Outer Anchorage, and Thilafushi Anchorage —
              sourced exclusively through the Republic of Maldives' two licensed national fuel importers.
            </p>
          </div>

          {/* Bunker desk */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] uppercase tracking-caps text-sand-100/55 mb-4">Bunker Desk</h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <div className="text-sand-100/55 text-[11.5px]">WhatsApp & Voice · Monitored 24/7</div>
                <a href="https://wa.me/9609993997" className="text-sand-100 hover:text-lagoon-400 transition-colors tabular">+960 999 3997</a>
              </li>
              <li>
                <div className="text-sand-100/55 text-[11.5px]">Nominations</div>
                <a href="mailto:bunker@bunkerfuelmaldives.com" className="text-sand-100 hover:text-lagoon-400 transition-colors break-all">bunker@bunkerfuelmaldives.com</a>
              </li>
              <li>
                <div className="text-sand-100/55 text-[11.5px]">Managing Director · Direct</div>
                <a href="mailto:n.afeef@bunkerfuelmaldives.com" className="text-sand-100 hover:text-lagoon-400 transition-colors break-all">n.afeef@bunkerfuelmaldives.com</a>
              </li>
            </ul>
          </div>

          {/* Registered office */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] uppercase tracking-caps text-sand-100/55 mb-4">Registered Office</h4>
            <address className="not-italic text-[14px] leading-[1.7] text-sand-100/80">
              Portside Agency Pvt Ltd<br />
              H. Maadhoofiya, 10th Floor<br />
              Karankaa Magu<br />
              Malé 20082<br />
              Republic of Maldives
            </address>
          </div>
        </div>

        {/* Legal strip */}
        <div className="pt-8 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
          <div className="text-[12px] text-sand-100/60 leading-relaxed max-w-2xl text-pretty">
            Bunker Fuel Maldives is a registered trading name of Portside Agency Pvt Ltd.
            {' '}
            <span className="block sm:inline mt-1 sm:mt-0 tabular text-sand-100/45">
              Business Name BN21192023
            </span>
          </div>
          <div className="text-[11.5px] text-sand-100/45 tabular">
            © 2026 Portside Agency Pvt Ltd. All rights reserved.
          </div>
        </div>

        <p className="mt-8 text-[11px] text-sand-100/40 italic font-serif">
          Marine fuel, sourced through licensed channels.
        </p>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Shared SectionHeader                                     */
/* ──────────────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title, intro }) {
  return (
    <header className="max-w-3xl">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-teal-500 mt-3 text-balance">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 text-[16px] sm:text-[17px] text-teal-500/70 leading-[1.7] text-pretty">
            {intro}
          </p>
        )}
      </Reveal>
    </header>
  );
}
