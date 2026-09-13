# Compass

Compass is a one-page, scroll-driven look at what four years inside a chosen track actually feels like, before a student pays for the wrong one. The visitor picks a track at the top. The hero, the week-in-the-life timeline, the build list, and the resources all shift to match. Scrolling down plays the hero forward, scrolling up plays it in reverse.

## Stack

- React 18 + Vite
- GSAP (used by the ScrollFloat component)
- Plain CSS, no UI framework
- Canvas 2D for the scroll-driven hero motion (one subject per track, locked camera, scrubbed by scroll position)

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The production bundle lands in `dist/`. Deploy that folder to any static host (GitHub Pages, Vercel, Netlify, etc.).

## Routes

- `/` — the one-page experience with the track picker, scroll-driven hero, week-in-the-life, what-you-build, resources, and CTA
- `/problem.html` — the Problem & Solution page (separate static HTML)

## Accessibility

- Skip-to-content link for keyboard users
- Visible focus rings on every interactive element
- `prefers-reduced-motion` honored throughout — the scroll-driven hero collapses to a single static viewport and the canvas freezes on one frame
- Track picker uses `radiogroup` semantics

## License

A design concept, 2026.
