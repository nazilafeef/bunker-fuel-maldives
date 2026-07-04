import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

// Home is the only meaningful route — keep lazy for code-splitting,
// but vite chunks small routes well even when statically imported.
const Home = lazy(() => import('./pages/Home.jsx'));

/**
 * ScrollManager — anchored hash navigation and top-of-page-on-route-change.
 * Critical for a SPA that uses #anchors inside a routed shell.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait one frame for the lazy-loaded route to mount, then scroll.
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

/**
 * BootSplash — minimalist load state shown only during initial chunk fetch.
 * Coral-sand background with a single pulsing lagoon dot. No spinner clichés.
 */
function BootSplash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-100">
      <div className="flex flex-col items-center gap-4">
        <span className="pulse-dot" aria-hidden="true" />
        <span className="text-[11px] uppercase tracking-caps text-teal-500/55">
          Bunker Fuel Maldives
        </span>
      </div>
    </div>
  );
}

export default function App() {
  // Set up dynamic viewport height variable for mobile (handles iOS Safari chrome).
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh, { passive: true });
    window.addEventListener('orientationchange', setVh, { passive: true });
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <div className="min-h-screen bg-sand-100 text-teal-500 antialiased">
      <ScrollManager />
      <Navbar />

      <main id="main" className="pt-0">
        <Suspense fallback={<BootSplash />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Catch-all: redirect any unmatched route back to home.
                Firebase SPA rewrite already serves index.html for deep links;
                this keeps the client-side router consistent. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
