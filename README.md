# Bunker Fuel Maldives

Marine fuel supply at Malé Port — a single-page React commercial showcase for international chartering managers and superyacht captains transiting the Indian Ocean.

## Stack

- **React 18** + **Vite 5** + **React Router 6**
- **Tailwind CSS 3** with the Maldivian seascape palette (no black, no slate-grey)
- **Framer Motion** for ocean-rhythm reveals (≤ 8% parallax, fully disabled under `prefers-reduced-motion`)
- **Firebase Hosting** rewrite + cache-control config included

## Quick start

Requires **Node 20+** (a `.nvmrc` pins this). If using nvm: `nvm use`.

```bash
npm install
npm run dev          # local dev on http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the dist build locally
```

## Deploy to Firebase Hosting

1. **One-time: install the Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **One-time: point the project at your Firebase project**
   Edit `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` with your actual Firebase project ID (e.g. `bunker-fuel-maldives-prod`).

   Or, instead of editing the file, run:
   ```bash
   firebase use --add
   ```
   and pick your project from the list — the CLI will rewrite `.firebaserc` for you.

3. **Build and deploy**
   ```bash
   npm run deploy
   ```
   This runs `vite build` then `firebase deploy`. The first deploy uploads ~2 MB (JS, CSS, images, PDF) and prints the live `*.web.app` URL.

4. **Custom domain (optional)**
   In the Firebase console → Hosting → Add custom domain. Add `bunkerfuelmaldives.com` and follow the TXT-record verification step. Once verified, the SSL certificate provisions automatically (usually within an hour).

**What's already wired:**
- `firebase.json` has SPA rewrites (deep links like `/#nomination` resolve correctly)
- Immutable 1-year cache on hashed JS/CSS and on images
- `no-cache` on `index.html` (so deploys are instantly visible)
- 1-week cache on the IBIA Code of Conduct PDF

## Project structure

```
bunker-fuel-maldives/
├── index.html                    SEO, OG, font preconnect, hero preload
├── firebase.json                 SPA rewrites + immutable asset caching
├── tailwind.config.js            Maldivian palette, sand shadows, ticker keyframes
├── vite.config.js                Manual vendor/motion chunk splits
├── public/
│   ├── favicon.svg               Monogram favicon
│   ├── images/                   9 production images (1.6 MB total)
│   └── docs/IBIA_Code_of_Conduct.pdf
└── src/
    ├── main.jsx                  React + BrowserRouter mount
    ├── App.jsx                   Route shell, scroll manager, boot splash
    ├── index.css                 Design tokens, glass-nav, pulse-dot, prefers-reduced-motion
    ├── components/
    │   ├── Navbar.jsx            Tinted glass + WhatsApp Monitored dot + mobile drawer
    │   ├── ProductCard.jsx       Desktop 3D flip + mobile tap-expand accordion (matchMedia split)
    │   ├── NominationForm.jsx    4-step progressive disclosure, locked min-height container
    │   ├── LazyImage.jsx         IntersectionObserver + LQIP blur-up
    │   └── Reveal.jsx            whileInView with reduced-motion fallback
    └── pages/
        └── Home.jsx              All 12 sections in one composition
```

## Refactor highlights

- **Navbar**: explicit `bg-[#FBF7F1]/80 backdrop-blur-md` paired tint + blur — text underneath never bleeds through with poor legibility. `z-50` locked. Border-bottom appears on scroll.
- **ProductCard**: responsive split at `lg:` breakpoint. Above lg, 3D `rotateY(180deg)` hover-flip preserves the editorial interaction. Below lg, becomes a tap-to-expand accordion (`aria-expanded` + animated height) — no broken hover state on touch. `prefers-reduced-motion` honored on both paths.
- **NominationForm**: step container locked at `min-h-[460px]` with absolute-positioned `AnimatePresence mode="sync"` cross-fades — footer never jumps between steps. All numeric inputs (IMO, Quantity MT, Phone) carry `inputMode="numeric"` + `pattern="[0-9]*"` for the dial-pad on mobile.
- **Pause section**: each lifestyle card now carries a `text-[10px] font-semibold uppercase tracking-[0.22em]` micro-header (CREW WELFARE / TRANSIT OPTIMIZATION / LOGISTICS APPLIED) above the existing small-caps caption — balances the imagery with commercial authority.
- **Hard numerics**: all IMO, D-U-N-S, dates, quantities, coordinates carry `font-mono` + inline `fontVariantNumeric: 'tabular-nums lining-nums'` for guaranteed alignment.
- **Hero LCP**: explicit `loading="eager"` + `fetchpriority="high"` + `decoding="sync"` + `<link rel="preload">`. Replaced veil gradients with explicit `bg-gradient-to-t from-[#0F4C5C]/95 via-[#0F4C5C]/50 to-transparent` mask for rock-solid headline legibility.

## Design tokens (strictly enforced)

| Role | Token | Hex |
|---|---|---|
| Primary accent | `lagoon-500` | #5BC0BE |
| Shallow-water | `lagoon-400` | #7FD8D8 |
| Background | `sand-100` | #FBF7F1 |
| Type & serious surfaces | `teal-500` | #0F4C5C |
| Energetic accent | `coral-500` | #FF7E5F |
| Hibiscus accent | `coral-600` | #F76C5E |
| Trust signals | `palm-500` | #4A7C59 |

Pure `#000000` is **banned** in the stylesheet — `teal-500` replaces black for type, surfaces, and shadows. Shadows use `rgba(15, 76, 92, …)` for the "sunlight on sand" feel.

## Performance

- **First-load weight: ~279 KB transferred** (hero image 158 KB + JS/CSS gzipped 121 KB)
- Below-fold images lazy-loaded via IntersectionObserver with LQIP blur-up
- Vendor / Motion / Home split into separate chunks for parallel caching
- Cache-Control: `immutable` 1y on images & hashed JS/CSS, `no-cache` on index.html
- Target: 95+ Lighthouse Performance

## Pre-launch checklist (owner tasks, from the brief)

- [ ] Update status strip date weekly — current copy: "Week of 11 May 2026" in `src/pages/Home.jsx` → search for `Updated weekly`
- [ ] Confirm professional headshot of Uz. Nazil Afeef is approved for publication
- [ ] Wire form backend: `NominationForm.jsx` currently calls `setSubmitted(true)` on submit. Replace with a POST to a serverless function that emails `bunker@bunkerfuelmaldives.com` and triggers a WhatsApp Business API alert to `+960 999 3997`.
- [ ] Clear USS Halsey and MV Sea Lord vessel references with the coordinating bunker trading partners before publication.
- [ ] Test the business.egov.mv verification pathway for C00212023 and document the exact steps.
- [ ] Confirm 2026 copyright year matches the launch date.

## Routing

A single `/` route renders `Home`. All sections are anchored (`#products`, `#custody`, `#operations`, `#pause`, `#principal`, `#nomination`, `#contact`) and navigated via hash links. Deep links work via Firebase rewrites that always serve `index.html`. The router's catch-all redirects unknown paths back to `/`.

## Accessibility

- Focus rings use `lagoon-500` (never default browser blue)
- All interactive elements have `aria-label` or visible text
- The product flip tiles are keyboard-operable (Enter / Space toggle)
- The nomination form has a `progress` indicator and per-step validation
- `prefers-reduced-motion` disables all framer-motion reveals, scroll-smooth, and CSS transitions

## Notes

- Image filenames in `public/images/` are stable — replacing the file is sufficient to update the visual.
- The IBIA Code of Conduct PDF lives at `public/docs/IBIA_Code_of_Conduct.pdf` and is linked from the Credentials section.
