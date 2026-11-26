# Omesh Sidda Portfolio

Personal portfolio for Omesh Sidda, a first-year B.Tech Computer Science and Engineering student at G. Pullaiah College of Engineering and Technology (GPCET).

- [Live site](https://omeshsidda.me/)
- [Firebase Hosting URL](https://omesh-ux-portfolio-ui.web.app/)
- [GitHub repository](https://github.com/omeshsidda-ui/Portfolio)

For a new agent session, open the portfolio checkout and point the agent to [AGENTS.md](AGENTS.md). It explains how to find the right branch, preview changes, and continue when a plugin is unavailable.

## Local development

```sh
npm ci
npm run dev
```

Run `npm run lint` for TypeScript checks. Run `npm run build` to bundle the frontend and pre-render all portfolio routes into `dist/` (`dist/index.html`, `dist/about/index.html`, `dist/projects/mindgraph/index.html`, `dist/projects/pam-io/index.html`, `dist/projects/gpcet-redesign/index.html`, and `dist/404.html`). Use `npm run preview` to review the production build.

`src/App.tsx` and `src/router.tsx` provide the zero-dependency client router across `/`, `/about`, and `/projects/:slug`, while `src/seo.ts` generates per-route metadata and Schema.org `@graph` JSON-LD for both `prerender.tsx` and client-side navigation. `src/data/site.ts` and `src/data/projects.ts` hold the verified profile and case-study data, and `src/index.css` holds the site styles. The build serves full pre-rendered HTML per route before React hydrates the interactive controls.

## Firebase Hosting

The existing project is `omesh-ux-portfolio-ui`. Firebase serves `dist/` with `cleanUrls: true` and `trailingSlash: false`, serving `/about` and `/projects/*` directly from their pre-rendered files and redirecting `/projects` to `/#projects` (`301`).

From a clean checkout of the intended release commit, run:

```sh
npm ci
npm run lint
npm run build
npx firebase-tools@14.27.0 deploy --only hosting --project omesh-ux-portfolio-ui
```

The deploy uses an authorized Firebase CLI sign-in. Check both public URLs after deployment and confirm the rendered routes reference the new JavaScript bundle and include their per-route canonical and structured data markup.

Pull requests run type checks, the prerendered production build, and Firebase Hosting response checks in GitHub Actions on Linux using a demo project. This workflow does not deploy. Review locally with `npm run preview -- --host 127.0.0.1` after building; Firebase releases remain an explicit, separate step.

Hosting revalidates HTML and unversioned public files and caches Vite's hashed `/assets/` files for one year. Trailing-slash paths redirect permanently (`301`) to clean URLs, and `/projects` redirects permanently to `/#projects`. Test Hosting headers and redirects with the Firebase Hosting emulator before a release; Vite preview does not apply `firebase.json`.

The site needs no backend for its current content, multi-route navigation, email copy control, or interactive signal generator. A future contact form that sends email without opening a mail app would need server-side delivery, input validation, and abuse controls; propose that separately before adding services.

Inter, Newsreader Variable, and JetBrains Mono are self-hosted via `src/assets/fonts/` and `@fontsource-variable/newsreader`. Extend the font subsets if adding non-Latin content.

The pinned Firebase CLI's Windows emulator did not apply source-pattern headers or redirects during review (its glob path normalization produces Windows backslashes). Use the Linux CI Hosting check for these assertions; the local Vite preview verifies the rendered app only.

## Release handoff

- **Verified November 13, 2026.** The monochrome redesign from [PR #2](https://github.com/omeshsidda-ui/Portfolio/pull/2) was merged at `a48a8ca` and deployed. Type checks and the production build passed. Both public URLs served the redesigned page, its JavaScript bundle, and the pre-rendered SEO profile markup over HTTPS.
- **Search Console.** The `omeshsidda.me` domain property is verified through a Namecheap TXT record. Firebase uses its own certificate and its own verification record. The preferred homepage is https://omeshsidda.me/. The site includes self-referencing canonical tags, `robots.txt`, `sitemap.xml`, and social preview images. Check Search Console for current indexing status. [Search Console property](https://search.google.com/search-console?resource_id=sc-domain%3Aomeshsidda.me)
