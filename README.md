# Profile Page

Personal profile page for Manav Mahan SINGH (PhD) — a coder-style interactive profile built with Vite + React + TypeScript, deployed via GitHub Pages.

Features: interactive fake shell (`help`, `whoami`, `matrix`, …), editor-style tabs, typewriter hero, theme cycling (green/amber/blue, persisted), skill filters with proficiency meters, collapsible experience entries, scroll-reveal animations, and a scroll progress bar.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repo named `<your-username>.github.io`.
2. Push this project:
   ```bash
   git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push to `main`.

Your page will be live at `https://<your-username>.github.io`.

> If you use a project repo instead (e.g. `profile-page`), change `base` in `vite.config.js` to `'/profile-page/'`.

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
