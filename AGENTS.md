# Portfolio agent guide

## Start here in a new session

- Use this file and [README.md](README.md) as the project handoff. A fresh chat may have only the current request, so inspect the files and branch before relying on earlier decisions. The README has the run commands, live URLs, and release status.
- Run `git status --short --branch` and `git rev-parse --show-toplevel`. If the current folder is a loose source copy, find the checkout for the requested branch or clone the GitHub repository into a separate folder. Start from current `main` for new work unless Omesh names another branch. Check existing changes before editing.
- The usual scope is a local change and preview. Merge, push, deploy, or edit DNS only when covered by the current request or an earlier authorization that still applies to the action.

## Choose tools by what the task needs

| Task | Ways to proceed |
| --- | --- |
| Read or edit the site | Use workspace files and the terminal. Run `npm ci` when dependencies are missing and `npm run dev` to preview. |
| Inspect GitHub or update a branch | Use Git, `gh` with an existing login, or the GitHub connector. |
| Test the rendered page | Use an available browser integration or local browser tooling. If visual testing is unavailable, run the build and check the rendered HTML, then report what still needs a browser test. |
| Deploy to Firebase | Use the Firebase CLI command in the README with an existing authorized login, or a connector that can deploy the intended build to the correct project. |
| Change DNS or use Search Console | Use the relevant signed-in web dashboard or an authorized connector. If account access is missing, finish independent work and ask for the specific sign-in or action needed. |

A plugin is one way to do the work. When it is unavailable or lacks a needed operation, use another available, authorized route. Keep a real blocker scoped to the step it prevents, and report what you verified and what remains. Keep credentials and verification tokens out of repository files and chat.

## Project notes

- This is Omesh Sidda's one-page portfolio. Keep profile claims grounded in information Omesh has provided. The current content covers his B.Tech CSE studies at GPCET and his skills in web development, Linux, AI agents, networking, reverse engineering, and web scraping.
- The source of truth is [omeshsidda-ui/Portfolio](https://github.com/omeshsidda-ui/Portfolio). Preserve work in other checkouts, including `.worktree-saadarqam`, and treat `.source-template-saad` as reference material.
- The app uses React, Vite, and Tailwind. The production build renders `HomePage` to static HTML with `prerender.tsx`, then React hydrates it in the browser. Keep core content in the built HTML. Put browser-only behavior in effects or event handlers and keep the initial render deterministic.
- For UI changes, check the dock with click, keyboard, and scroll navigation. Check the custom cursor with mouse, touch, and reduced-motion settings. Test audio controls when touching the music player and use iPhone Safari when available.
- Run `npm run lint` and `npm run build` before shipping code changes. For deployment, build from the intended Git commit and verify the live HTML and assets. See [README.md](README.md) for commands and the release handoff.
