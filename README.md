# Profile Page

Personal profile page for Dr. Manav Mahan Singh, built with Vite + React and deployed via GitHub Pages.

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

All page content lives in `src/data.js` — edit skills, experience, education, and awards there.
