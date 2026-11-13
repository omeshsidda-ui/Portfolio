# Portfolio agent guide

## Start here in a new session

- Use this file and [README.md](README.md) as the project handoff. A fresh chat may have only the current request, so inspect the files and branch before relying on earlier decisions. The README has the run commands, live URLs, and release status.
- Run `git status --short --branch` and `git rev-parse --show-toplevel`. If the current folder is a loose source copy, find the checkout for the requested branch or clone the GitHub repository into a separate folder. Start from current `main` for new work unless Omesh names another branch. Check existing changes before editing.
- The usual scope is a local change and preview. Merge, push, deploy, or edit DNS only when covered by the current request or an earlier authorization that still applies to the action.

## Integrations and preferred tools

Use the relevant connected tools proactively when the task calls for them. Omesh should not have to name each plugin in a new chat. Check which capabilities and accounts are available in the current session.

| Task | First choice and fallback |
| --- | --- |
| Read or edit local code | Use workspace files and the terminal. Run `npm ci` when dependencies are missing and `npm run dev` for a local preview. |
| Inspect or update GitHub | Use the **GitHub plugin** for the remote `omeshsidda-ui/Portfolio` repository, branch comparisons, PRs, and authorized writes. Use Git or `gh` if a connector operation is missing. Check the signed-in account before a push. The Windows terminal's cached GitHub account previously lacked push access, while the connected GitHub plugin succeeded. |
| Inspect or deploy Firebase Hosting | Use the **Firebase plugin** to locate and confirm the project `omesh-ux-portfolio-ui` and inspect Hosting when supported. If it cannot publish the exact local build or use a preview channel, use the authenticated Firebase CLI workflow in the README. Build the intended Git commit and deploy Hosting only. |
| Test a preview or the live site | Use the **Browser / computer-use tool** for actual rendered checks. Open the preview, test the relevant interactions at desktop and phone widths, and check for visible errors. For iPhone-specific issues, distinguish mobile emulation from testing Safari on an iPhone. If browser access is unavailable, use an available local browser runner or verify the HTML and assets over HTTP and state what remains untested. |
| Audit SEO or check indexing | Use the **SEO skill** if installed, Google's Search Central documentation for guidance, and the browser in the signed-in [Search Console domain property](https://search.google.com/search-console?resource_id=sc-domain%3Aomeshsidda.me) for the actual crawl and indexing status. Check the live HTML and assets as well as the source. |
| Manage custom-domain DNS | Use the browser in signed-in [Namecheap Advanced DNS](https://ap.www.namecheap.com/Domains/DomainControlPanel/omeshsidda.me/advancedns). The **Namecheap plugin** can check availability and pricing, but the available connector has no DNS editor. Preserve the Firebase and Google verification records and email forwarding records when changing website DNS. |
| Confirm registration or service emails | Use the **Gmail plugin** for a narrowly scoped, read-only lookup when the task needs it. For current registration, DNS, or deployment status, prefer the provider's dashboard or a direct public check. |

If a preferred tool is missing or lacks the necessary operation, use another available, authorized route. Keep a blocker scoped to the step it prevents. Finish independent work and ask only for the specific sign-in or user action needed. Keep credentials and verification tokens out of repository files and chat.

## Live context

- The primary URL is [omeshsidda.me](https://omeshsidda.me/), hosted on Firebase Hosting in `omesh-ux-portfolio-ui`. The [Firebase URL](https://omesh-ux-portfolio-ui.web.app/) serves the same build and points crawlers to the custom domain through the canonical tag. Namecheap manages DNS and Firebase provides HTTPS.
- The live redesign includes the floating section dock, vinyl motif, Education, Skills, and an About example about testing on iPhone and connecting the domain. Keep the one-page scope unless Omesh asks to expand it.
- The custom domain is verified in Search Console. The sitemap was accepted, the homepage was reported indexed, and a fresh crawl was requested on November 13, 2026. Check Search Console for current status and query data. A crawl request does not establish a ranking or mean that Google has processed the latest content.
- SEO lives in `index.html` and `public/`. Keep the canonical URL, `ProfilePage` / `Person` and `WebSite` markup, `Omesh Sidda` site name, OS vinyl favicon, social image, robots file, and one-page sitemap intact during redesigns.

## Project notes

- This is Omesh Sidda's one-page portfolio. Keep profile claims grounded in information Omesh has provided. The current content covers his B.Tech CSE studies at GPCET and his skills in web development, Linux, AI agents, networking, reverse engineering, and web scraping.
- The source of truth is [omeshsidda-ui/Portfolio](https://github.com/omeshsidda-ui/Portfolio). Preserve work in other checkouts, including `.worktree-saadarqam`, and treat `.source-template-saad` as reference material.
- The app uses React, Vite, and Tailwind. The production build renders `HomePage` to static HTML with `prerender.tsx`, then React hydrates it in the browser. Keep core content in the built HTML. Put browser-only behavior in effects or event handlers and keep the initial render deterministic.
- For UI changes, check the dock with click, keyboard, and scroll navigation. Check the custom cursor with mouse, touch, and reduced-motion settings. Test audio controls when touching the music player and use iPhone Safari when available.
- Run `npm run lint` and `npm run build` before shipping code changes. For deployment, build from the intended Git commit and verify the live HTML and assets. See [README.md](README.md) for commands and the release handoff.
