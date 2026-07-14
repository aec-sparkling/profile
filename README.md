# Profile Page

Personal profile page for Manav Mahan SINGH (PhD) — a coder-style interactive profile built with Vite + React + TypeScript, deployed via GitHub Pages.

Features: interactive fake shell (`help`, `whoami`, `matrix`, …), editor-style tabs, typewriter hero, theme cycling (green/amber/blue, persisted), skill filters with proficiency meters, collapsible experience entries, scroll-reveal animations, and a scroll progress bar.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

Repo: `https://github.com/sparkling-aec/profile` → live at `https://sparkling-aec.github.io/profile/`.

1. Push:
   ```bash
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

> `base` in `vite.config.js` is set to `'/profile/'` to match the repo name. If you rename the repo, update it.

## Editing content

All page content lives in `src/data.ts` — edit skills, experience, education, and awards there. Types are in `src/types.ts`.

## Structure

```
src/
├── main.tsx            # entry point
├── App.tsx             # thin layout shell
├── data.ts             # all page content (edit here)
├── types.ts            # shared interfaces
├── index.css           # theming + styles
├── hooks/
│   ├── useTheme.ts     # theme cycling + persistence
│   ├── useTypewriter.ts
│   └── useReveal.ts    # IntersectionObserver scroll reveal
└── components/
    ├── Hero.tsx        # photo, typewriter, action buttons
    ├── Editor.tsx      # tab bar + panel switching
    ├── SkillsPanel.tsx
    ├── ExperiencePanel.tsx
    ├── EducationPanel.tsx
    ├── CoursesPanel.tsx
    ├── AwardsPanel.tsx
    ├── BackToTop.tsx
    ├── Terminal.tsx    # interactive fake shell
    ├── MatrixRain.tsx  # easter egg
    ├── Reveal.tsx      # scroll-reveal wrapper
    ├── ScrollProgress.tsx
    └── StatusBar.tsx
```
