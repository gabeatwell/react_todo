# Think.Flow

> A modern digital journaling and blogging platform for seamless thought capture and content management.

Think.Flow is a client-side blog built with [SvelteKit](https://svelte.dev/docs/kit) and [Svelte 5](https://svelte.dev/docs/svelte/legacy-overview) runes. It lets you create, edit, organize, and delete posts entirely in the browser — no backend or database required. Posts are persisted to `localStorage`, so your journal travels with your browser.

## Features

- **Create unlimited posts** through a clean, focused writing form
- **Edit and update** any post at any time
- **Delete posts** with a confirmation step
- **Tag-based organization** (comma-separated tags)
- **Fully responsive** layout with an animated mobile navigation menu
- **Local persistence** — posts survive reloads via `localStorage` (key: `think-flow-posts`)
- **SEO-first** — per-page metadata, Open Graph, Twitter Cards, canonical URLs, a generated `sitemap.xml`, and `robots.txt`
- **Security headers** injected on every server response
- **Fast** static-friendly architecture with hover data preloading

## Tech Stack

| Area                 | Choice                                                                  |
| -------------------- | ----------------------------------------------------------------------- |
| Framework            | SvelteKit 2                                                             |
| UI / Reactivity      | Svelte 5 (runes: `$state`, `$derived`, `$effect`, `$props`)             |
| Language             | TypeScript                                                              |
| Markdown             | [mdsvex](https://github.com/pngwn/MDsveX) (`.svx` components enabled)   |
| Bundler              | Vite 6                                                                  |
| Adapter              | `@sveltejs/adapter-auto` (deploys to Vercel, Netlify, Cloudflare, etc.) |
| Package manager      | pnpm                                                                    |
| Linting / Formatting | ESLint 9 (flat config) + Prettier                                       |
| Type checking        | `svelte-check`                                                          |

## Project Structure

```text
think.flow/
├── src/
│   ├── lib/
│   │   ├── components/       # Navigation, Footer, Github icon
│   │   ├── config/site.ts    # Site metadata & SEO defaults
│   │   ├── data/
│   │   │   ├── LocalStorage.svelte   # syncs posts <-> localStorage
│   │   │   ├── SEO.svelte            # <head> meta component
│   │   │   └── stores.svelte.ts      # reactive posts store + CRUD
│   │   └── types.ts          # Post interface
│   ├── routes/
│   │   ├── +layout.svelte    # app shell (nav + main + footer)
│   │   ├── +page.svelte      # home
│   │   ├── +error.svelte     # generic error page
│   │   ├── 404/              # not-found page
│   │   ├── about/            # about page
│   │   ├── new/              # create-post form
│   │   ├── posts/            # post listing
│   │   │   └── [slug]/       # single post
│   │   │       └── edit/     # edit-post form
│   │   └── sitemap.xml/      # server route -> XML sitemap
│   ├── app.css               # global styles & self-hosted fonts
│   ├── app.html              # HTML template
│   └── hooks.server.js       # security headers
├── static/                   # fonts, logos, favicons, manifest, robots.txt
├── svelte.config.js
├── vite.config.js
└── eslint.config.js
```

### The `Post` model

```ts
export interface Post {
	slug: string;
	title: string;
	content: string;
	date: string;
	tags: string[];
	author: string;
	updatedAt?: string;
}
```

Posts are held in a reactive $state array in src/lib/data/stores.svelte.ts and exposed through getPosts, addPost, updatePost, and deletePost. LocalStorage.svelte loads stored posts on mount and writes them back whenever the store changes.

## Getting Started

### Prerequisites

Node.js (LTS recommended)
pnpm (the project uses pnpm-lock.yaml and sets engine-strict=true)

## Installation

```ts
// Install dependencies
pnpm install

// Start the dev server (exposed on the local network)
pnpm dev

// Open http://localhost:5173
```

## Scripts

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `pnpm dev`         | Start the Vite dev server (`--host`)                     |
| `pnpm build`       | Create a production build                                |
| `pnpm preview`     | Preview the production build locally                     |
| `pnpm check`       | Run `svelte-kit sync` and type-check with `svelte-check` |
| `pnpm check:watch` | Type-check in watch mode                                 |
| `pnpm lint`        | Run Prettier check + ESLint                              |
| `pnpm format`      | Format the codebase with Prettier                        |

## Deployment

The project uses @sveltejs/adapter-auto, which detects your hosting provider at build time and produces the right output. The included sitemap.xml route assumes a Vercel deployment:

```ts
pnpm build
```

Before going live, update the placeholders in src/lib/config/site.ts and the baseUrl in src/routes/sitemap.xml/+server.ts:

- url → your real domain
- contact.email → your email
- baseUrl (sitemap) → your production origin

### Notes

- Storage is client-side only. Posts live in each browser’s localStorage; there is no shared backend, so content does not sync across devices or users.
- The sitemap is static. sitemap.xml currently lists a fixed set of routes rather than reading live posts (see the TODO comment in that route).
- mdsvex is configured but unused. .svx files are enabled via svelte.config.js, yet no markdown posts exist yet — the current posts are plain-text content managed through the store.
- Client routing for post pages. The [slug] pages read from the in-memory store on the client, so direct deep-links resolve against localStorage after hydration.

### Author

Built by [Gabe Atwell](https://atwell.dev) · [GitHub](https://github.com/gabeatwell)
