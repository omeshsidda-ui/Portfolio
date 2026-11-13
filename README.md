# Omesh Sidda Portfolio

Personal portfolio for Omesh Sidda, a B.Tech Computer Science and Engineering student at G Pullaiah College of Engineering and Technology.

- [Live site](https://omeshsidda.me/)
- [Firebase Hosting URL](https://omesh-ux-portfolio-ui.web.app/)
- [GitHub repository](https://github.com/omeshsidda-ui/Portfolio)

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

## Release handoff

- **Verified November 13, 2026.** The monochrome redesign from [PR #2](https://github.com/omeshsidda-ui/Portfolio/pull/2) was merged at `a48a8ca` and deployed. Type checks and the production build passed. Both public URLs served the redesigned page, its JavaScript bundle, and the pre-rendered SEO profile markup over HTTPS.
- **Search Console.** The `omeshsidda.me` domain property is verified through a Namecheap TXT record. Firebase uses its own certificate and its own verification record. The custom-domain canonical tag, sitemap, and indexing request were still pending at handoff. [Search Console property](https://search.google.com/search-console?resource_id=sc-domain%3Aomeshsidda.me)
- **Audio.** At the deployed commit, the music player points to a track hosted in the design reference's GitHub repository. Confirm usage rights and check playback before relying on it for future releases. Playback on iPhone Safari was not independently verified during deployment.
