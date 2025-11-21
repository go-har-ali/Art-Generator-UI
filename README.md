## AI Art Generator UI

Responsive Next.js 14 (App Router) interface that mirrors the provided desktop/mobile mocks.  
Users can browse inspiration cards, prefill prompts, and generate AI art previews.  
Redux Toolkit keeps prompts/results in sync between screens, while Tailwind handles the glassmorphism styling.

### Tech Stack
- Next.js 14 (App Router, Turbopack dev server)
- TypeScript
- Redux Toolkit + React Redux
- Tailwind CSS
- Lucide React icons

---

## Installation

```bash
# clone your repo
git clone https://github.com/YOUR_USERNAME/ai-art-generator-ui.git
cd ai-art-generator-ui

# install deps
npm install
```

## Run & Build

```bash
# dev server (http://localhost:3000 by default)
npm run dev

# production build + serve
npm run build
npm start

# lint (already run in CI/pre-push)
npm run lint
```

> If you see a lock error when restarting `npm run dev`, stop the previous process (Ctrl+C) or delete `.next/dev/lock`.

---

## Notes on Approach / Assumptions

- **Two desktop pages, three mobile screens**: desktop keeps the inspiration list and text-to-image result preview inline; mobile introduces a dedicated `/result` screen that reads from the Redux `generation` slice.
- **API abstraction**: `/api/*` routes proxy the Postman collection endpoints. Missing media fall back to local demo images after a `HEAD` probe so the UI never breaks.
- **State sharing**: prompts/results live in Redux Toolkit so inspiration taps auto-fill the generator and mobile navigation can rehydrate the result screen.
- **Styling**: Tailwind powers the gradient/glass look, with mobile-first layout and shared bottom navigation that lights up `Home`/`Create`.
- **Loading & error**: 
  - Skeleton grids + error banners for inspirations and model fetches.
  - The generate button flips into “Generating…” and desktop shows a translucent overlay on the preview pane.
  - API failures surface inline messages so users know to retry.
- **Device detection**: a light `window.innerWidth` check routes only mobile users to `/result`, keeping desktop inline.
- **Assumed data privacy**: share/download buttons operate on the stubbed image URL; replace with your storage endpoint if you need signed URLs.

---

## Optional Enhancements / Ideas

- Hook up real authentication for the profile icon + “My Creations”.
- Persist the aspect ratio / selected model across sessions.
- Replace the mock `/api/generate` stub with your real inference service.


