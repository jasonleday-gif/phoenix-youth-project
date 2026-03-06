# The Phoenix Youth Project

**Official website for The Phoenix Youth Project** — a Texas-based 501(c)(3) nonprofit empowering children and teenagers in foster care.

- **EIN:** 39-5149790
- **Location:** Katy, Texas
- **Status:** IRS 501(c)(3) Approved

## Tech Stack

- React 18 (JSX)
- Vite
- Tailwind CSS utility classes (inline via style tags)
- Netlify — hosting & deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment

This project auto-deploys to Netlify on every push to `main` via GitHub integration.

The `netlify.toml` handles:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules (all routes → `index.html`)

## Project Structure

```
phoenix-youth-project/
├── public/
│   └── favicon.svg          # Phoenix flame favicon
├── src/
│   ├── App.jsx              # Main single-file component
│   └── main.jsx             # React entry point
├── index.html               # HTML shell with SEO meta tags
├── vite.config.js           # Vite configuration
├── netlify.toml             # Netlify build + redirect config
└── package.json
```

## Placeholder Items (To Replace)

- `[ BRANDON — PHOTO PLACEHOLDER ]` — headshot of Brandon Adams
- `[ CYCLING / RACE HERO PHOTO PLACEHOLDER ]` — action cycling photo
- Race gallery — 6 labeled photo slots (Tulsa Tough, Hotter'N Hell 100, etc.)
- Donate button — wire up Stripe, PayPal Giving Fund, or Donorbox
- Contact form — wire up Netlify Forms or EmailJS

## Contact

jason@phoenixyouthproject.org
