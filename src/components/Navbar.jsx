import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#custody', label: 'Chain of Custody' },
  { href: '#operations', label: 'Operations' },
  { href: '#pause', label: 'A Pause Between Voyages' },
  { href: '#principal', label: 'Principal' },
  { href: '#nomination', label: 'Nominate' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out
        bg-[#FBF7F1]/80 backdrop-blur-md
        border-b ${scrolled ? 'border-[#0F4C5C]/10 shadow-[0_1px_0_0_rgba(15,76,92,0.04)]' : 'border-transparent'}
        supports-[backdrop-filter]:bg-[#FBF7F1]/72`}
      role="banner"
    >
      <div className="container-editorial flex items-center justify-between h-16 sm:h-[72px]">
        {/* Wordmark */}
        <Link
          to="/"
          aria-label="Bunker Fuel Maldives — home"
          className="flex items-center gap-2.5 group"
          onClick={closeMobile}
        >
          {/* Symbol mark — triangle (island) · flame (fuel) · droplet (marine).
              Site-palette tones: palm-green / sunset-coral / lagoon-turquoise.
              The flame gets a subtle hover lift; the droplet a pulse. */}
          <img
              src="/logo/my-new-logo.png"
              alt="Bunker Fuel Maldives"
              width="44"
              height="44"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain select-none shrink-0"
              loading="eager"
              decoding="sync"
              />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[15px] sm:text-[16px] font-medium text-teal-500 tracking-[-0.015em]">
              Bunker Fuel
            </span>
            <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-teal-500/65 mt-1">
              Maldives
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-teal-500/85 hover:text-teal-500 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-lagoon-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right cluster: WhatsApp Monitored + CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/9609993997"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/60 border border-teal-500/10 backdrop-blur-sm hover:bg-white transition-colors group"
            aria-label="WhatsApp monitored — open chat"
          >
            <span className="pulse-dot" aria-hidden="true" />
            <span className="text-[12px] font-medium text-teal-500 tabular tracking-tight">
              WhatsApp <span className="text-teal-500/65">· Monitored</span>
            </span>
          </a>
          <a
            href="#nomination"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-teal-500 text-sand-100 text-[13px] font-medium hover:bg-teal-600 transition-colors shadow-sand-sm"
          >
            Send Nomination
            <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-white/60 border border-teal-500/10 backdrop-blur-sm"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className="relative w-4 h-3 block">
              <span
                className={`absolute left-0 top-0 w-full h-[1.5px] bg-teal-500 transition-transform duration-300 ${
                  mobileOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-teal-500 transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 w-full h-[1.5px] bg-teal-500 transition-transform duration-300 ${
                  mobileOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden bg-[#FBF7F1]/95 backdrop-blur-md border-t border-[#0F4C5C]/8 transition-[max-height,opacity] duration-500 ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="container-editorial py-5 flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="py-3 text-[15px] font-medium text-teal-500 border-b border-teal-500/8 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2 mt-4 px-1">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="text-[12px] font-medium text-teal-500 tabular">
              WhatsApp · Monitored 24/7 · +960 999 3997
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
