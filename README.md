# Second Bell

Second Bell is a UK-focused blog about changing career into teaching, particularly for people making the move later in their working life.

The site is built with Astro, managed in GitHub and deployed as a static site using Cloudflare Workers Static Assets.

## Live site

`https://secondbell.co.uk`

## Technology

- Astro
- TypeScript
- Markdown content collections
- GitHub
- Cloudflare Workers Static Assets
- GoatCounter
- Cloudflare Web Analytics

## Requirements

- Node.js 24
- npm

The recommended Node version is recorded in `.nvmrc`.

When using nvm, switch to the correct version with:

```bash
nvm use
```

Confirm the active version with:

```bash
node --version
```

## Local setup

Clone the repository:

```bash
git clone https://github.com/tim-od/teaching-blog.git
cd teaching-blog
```

Install dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Astro will display a local address, normally:

```text
http://localhost:4321
```

## Available commands

| Command           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the local development server           |
| `npm run check`   | Run Astro and TypeScript checks              |
| `npm run build`   | Check and build the production site          |
| `npm run preview` | Preview the production build locally         |
| `npm outdated`    | Show available dependency updates            |
| `npm audit`       | Check dependencies for known vulnerabilities |

Before pushing changes, run:

```bash
npm run check
npm run build
```

## Project structure

```text
teaching-blog/
├── .github/
│   ├── dependabot.yml
│   └── workflows/
├── public/
│   ├── _headers
│   └── scripts/
│       └── site.js
├── src/
│   ├── components/
│   │   └── TableOfContents.astro
│   ├── content/
│   │   └── posts/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── posts/
│   │   │   └── [id].astro
│   │   └── tags/
│   │       └── [tag].astro
│   └── styles/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── wrangler.jsonc
```

## Creating a blog post

Posts are stored in:

```text
src/content/posts/
```

Create a new Markdown file using a lowercase, hyphenated filename:

```text
changing-career-into-teaching.md
```

A typical post begins with frontmatter:

```yaml
---
title: "Changing career into teaching"
description: "A practical guide to preparing for a career change into teaching in the UK."
pubDate: 2026-08-06
tags:
  - "My Journey"
heroImage: "./images/changing-career.jpg"
heroImageAlt: "A notebook and teaching materials on a desk"
---
```

Write the article below the closing `---`.

```markdown
## Why I considered teaching

Article text here.

## What I needed to research

Article text here.

### Training routes

More detailed text here.
```

Do not add another level-one heading with `#` inside the post. The post title is already rendered as the page’s main heading.

## Available tags

Posts must use one or more of the approved tags:

- Routes In
- My Journey
- Should You Move?
- Practical Advice
- Classroom Life

The permitted values are defined in:

```text
src/content.config.ts
```

Tag routes are generated in:

```text
src/pages/tags/[tag].astro
```

When adding or renaming a tag, update both locations.

## Images

### Hero images

Hero images are optional.

When a hero image is supplied, `heroImageAlt` must also be supplied. The content schema enforces this requirement.

Hero images are:

- cropped for consistent post cards and thumbnails;
- displayed without aggressive cropping on individual post pages;
- processed by Astro for responsive delivery and optimisation.

### Images inside posts

Images can be added in Markdown:

```markdown
![Descriptive alternative text](./images/example.jpg)
```

In-post images are constrained by the article layout so they remain responsive and do not overflow the text column.

Always provide meaningful alternative text unless an image is purely decorative.

## Table of contents

Longer posts display a table of contents generated from level-two and level-three Markdown headings:

```markdown
## Section heading

### Subsection heading
```

On larger screens, the table appears in a sticky sidebar to the right of the article.

On smaller screens, it moves above the article content.

The component is located at:

```text
src/components/TableOfContents.astro
```

The individual post layout is controlled by:

```text
src/pages/posts/[id].astro
```

## Analytics

The site currently uses:

- GoatCounter for simple, long-term visitor analytics;
- Cloudflare Web Analytics for Cloudflare traffic and performance reporting.

GoatCounter is loaded from:

```text
src/layouts/BaseLayout.astro
```

Cloudflare Web Analytics is enabled through Cloudflare and may be injected at the edge rather than included directly in the Astro source.

The two platforms may report different totals because they use different definitions and collection methods.

## Security headers

Static security headers are defined in:

```text
public/_headers
```

Astro copies this file to:

```text
dist/_headers
```

during the build.

The configuration includes controls such as:

- Strict Transport Security
- MIME-sniffing protection
- referrer policy
- frame protection
- permissions policy
- cross-origin opener policy
- Content Security Policy

The Content Security Policy should remain in report-only mode until all required scripts, fonts, images and analytics services have been tested.

Inline site scripts have been moved to:

```text
public/scripts/site.js
```

This allows them to run under an enforced policy using:

```text
script-src 'self'
```

## Deployment

Changes pushed to the `main` branch are deployed automatically by Cloudflare.

Recommended deployment workflow:

```bash
npm run check
npm run build
git status
git add .
git commit -m "Describe the change"
git push origin main
```

After pushing, check the Cloudflare deployment status and test the live site.

## Cloudflare configuration

The site is deployed using Cloudflare Workers Static Assets.

Worker and asset settings are stored in:

```text
wrangler.jsonc
```

The production build output is:

```text
dist/
```

The custom production domain is:

```text
secondbell.co.uk
```

The automatic `workers.dev` address should be marked `noindex` so search engines index only the custom domain.

## Dependency maintenance

The repository uses `package-lock.json` to keep installations reproducible.

Use:

```bash
npm ci
```

for clean installations and automated builds.

Review dependencies periodically:

```bash
npm outdated
npm audit
```

Do not routinely use:

```bash
npm audit fix --force
```

because it may install breaking major versions.

Astro upgrades should be tested with:

```bash
npx @astrojs/upgrade
npm run check
npm run build
```

## Dependabot

Dependabot configuration is stored at:

```text
.github/dependabot.yml
```

Dependabot checks npm dependencies and GitHub Actions for available updates.

Security updates should be reviewed promptly. Routine updates should be tested before merging.

## GitHub Actions

Automated checks should run:

```bash
npm ci
npm run check
npm run build
```

for pull requests and changes to `main`.

This helps identify broken builds and dependency problems before deployment.

## Accessibility

The site aims to meet WCAG 2.2 AA.

Current accessibility features include:

- semantic page structure;
- keyboard focus indicators;
- a skip link;
- reduced-motion support;
- responsive layouts;
- required alternative text for hero images;
- keyboard-accessible navigation;
- accessible table-of-contents navigation.

Changes should be checked using keyboard navigation and, where possible, VoiceOver on macOS.

## SEO

The site includes:

- canonical URLs;
- page titles and descriptions;
- an XML sitemap;
- RSS;
- `robots.txt`;
- semantic article pages;
- stable post URLs.

Planned improvements include:

- fuller Open Graph metadata;
- social-sharing images;
- structured data;
- breadcrumbs;
- article modification dates;
- draft-post handling.

## Rollback

The original live version of the site was tagged in Git before major development work.

Available tags can be viewed with:

```bash
git tag
```

To inspect a tagged version without changing `main`:

```bash
git switch --detach v1-original-site
```

Return to the live development branch with:

```bash
git switch main
```

Do not make normal development commits while in detached HEAD mode.

## Licence

Unless stated otherwise, the site’s written content, branding and original images are copyright Second Bell.

Third-party software remains subject to its own licence terms.
