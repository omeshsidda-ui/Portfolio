# Omesh Sidda Portfolio

Personal portfolio for Omesh Sidda, a B.Tech Computer Science and Engineering student at G Pullaiah College of Engineering and Technology.

- [Live site](https://omeshsidda.me/)
- [Firebase Hosting URL](https://omesh-ux-portfolio-ui.web.app/)
- [GitHub repository](https://github.com/omeshsidda-ui/Portfolio)

For a new agent session, open the portfolio checkout and point the agent to [AGENTS.md](AGENTS.md). It explains how to find the right branch, preview changes, and continue when a plugin is unavailable.

## Local development

```sh
npm ci
npm run dev
```

Run `npm run lint` for TypeScript checks. Run `npm run build` to bundle the frontend and pre-render the homepage into `dist/index.html`. Use `npm run preview` to review the production build.

`src/HomePage.tsx` holds the homepage and section dock. `src/index.css` holds the site styles. `index.html` holds search metadata and the `ProfilePage` / `Person` structured data. The build serves the full page HTML before React attaches the interactive controls.

## Firebase Hosting

The existing project is `omesh-ux-portfolio-ui`. Firebase serves `dist/` and redirects the legacy `/about` path to `/#about`.

From a clean checkout of the intended release commit, run:

```sh
npm ci
npm run lint
npm run build
npx firebase-tools@14.27.0 deploy --only hosting --project omesh-ux-portfolio-ui
```

The deploy uses an authorized Firebase CLI sign-in. Check both public URLs after deployment and confirm the homepage references the new JavaScript bundle and includes the profile markup.

Pull requests run type checks, the prerendered production build, and Firebase Hosting response checks in GitHub Actions on Linux using a demo project. This workflow does not deploy. Review locally with `npm run preview -- --host 127.0.0.1` after building; Firebase releases remain an explicit, separate step.

Hosting revalidates HTML and unversioned public files and caches Vite's hashed `/assets/` files for one year. The `/about` redirect is permanent. Test Hosting headers and redirects with the Firebase Hosting emulator before a release; Vite preview does not apply `firebase.json`.

The site needs no backend for its current content, section navigation, email link, or audio playback. A future contact form that sends email without opening a mail app would need server-side delivery, input validation, and abuse controls; propose that separately before adding services.

Audio loads only after a visitor presses play. It still depends on the reference repository's external track; playback can fail if that host or file changes. Confirm usage rights or supply an owned/licensed replacement before a future audio release. Dela Gothic One, Inter, and JetBrains Mono are self-hosted Latin WOFF2 files from Fontsource 5.3.0, with their licenses in `public/fonts/`. Extend the font subsets if adding non-Latin content.

The pinned Firebase CLI's Windows emulator did not apply source-pattern headers or redirects during review (its glob path normalization produces Windows backslashes). Use the Linux CI Hosting check for these assertions; the local Vite preview verifies the rendered app only.

## Release handoff

- **Verified November 13, 2026.** The monochrome redesign from [PR #2](https://github.com/omeshsidda-ui/Portfolio/pull/2) was merged at `a48a8ca` and deployed. Type checks and the production build passed. Both public URLs served the redesigned page, its JavaScript bundle, and the pre-rendered SEO profile markup over HTTPS.
- **Search Console.** The `omeshsidda.me` domain property is verified through a Namecheap TXT record. Firebase uses its own certificate and its own verification record. The preferred homepage is https://omeshsidda.me/. The site includes a canonical tag, robots.txt, sitemap.xml, and a social preview image. Check Search Console for current indexing status. [Search Console property](https://search.google.com/search-console?resource_id=sc-domain%3Aomeshsidda.me)
- **Audio.** At the deployed commit, the music player points to a track hosted in the design reference's GitHub repository. Confirm usage rights and check playback before relying on it for future releases. Playback on iPhone Safari was not independently verified during deployment.
