# Meera Social — agency website

Live at https://www.meerasocial.com (GitHub Pages, moved off Manus 2026-07-27).

- Root = the BUILT site that GitHub Pages serves. Do not hand-edit built files.
- `site-source/` = the real source (Vite + React). To change the site: edit source, `pnpm install && pnpm build` inside site-source, copy `dist/public/*` back to the repo root, commit, push.
- `CNAME` keeps the custom domain bound. `404.html` is a copy of `index.html` so page links work on refresh.
