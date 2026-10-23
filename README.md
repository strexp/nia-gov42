# NIA Portal (`nia.gov.dn42`)

Front-end for the **National Immigration Agency (NIA)** portal, the public entry
point for the immigration authority on [dn42](https://dn42.dev/).

The portal is deliberately small: it introduces the Agency and points to the
services, which are operated separately. Services that are documented in full by
[ePass42™](#related-projects) are described only briefly here and linked to.

## Related projects

- **ePass42™** — `https://epass.nia.gov.dn42`: CSCA, Document Signer
  certificates, personalisation files and the public PKD directory
  ([`strexp/epass42`](https://github.com/strexp/epass42)).
- **card42** — [`strexp/card42`](https://github.com/strexp/card42): EMV + eMRTD
  (ICAO 9303) Java Card toolkit.
- **passportcard42** — [`strexp/passportcard42`](https://github.com/strexp/passportcard42):
  TD1 (ICAO 9303) e-Passport card artwork, print-ready masters and a browser-based
  card generator.
- **Card personalisation and delivery** — ordered from a trusted partner.

## Site structure

- **Home** — the tasks people arrive for most often ("Most requested"), the
  latest notices and a short introduction to the Agency. It does not repeat the
  service catalogue.
- **Services** — the service catalogue, grouped by theme (public key
  infrastructure, travel documents, immigration and residence). The certificate
  authority (CSCA), Document Signer certificates (DSC), the Public Key Directory
  (PKD) and the stolen/lost document register (SLTD) are individual services
  provided through the ePass 42 platform.
- **Notices** — announcements, service updates and security notices.
- **Open source** — the projects that power NIA services.
- **About** — the Agency's mission, mandate, headline figures and directorates.
- **Contact** — email and offices.
- **Legal** — accessibility, privacy and terms.

## Tech stack

- [Nuxt 4](https://nuxt.com/) + Vue 3 + TypeScript
- [Naive UI](https://www.naiveui.com/) — the same component library and visual
  style as ePass42™
- [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) — English and 中文 (all copy lives
  behind i18n keys; the locale is detected, persisted and switchable in the
  header)
- [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/) — light/dark theme
- [`@nuxtjs/sitemap`](https://sitemap.nuxtjs.org/)
- Prettier + ESLint + Vitest

## Requirements

- Node.js >= 22 (developed against Node 26)
- pnpm 11

## Commands

```bash
pnpm install        # install dependencies (runs `nuxt prepare`)
pnpm dev            # development server
pnpm generate       # static build into .output/public
pnpm preview        # preview the production build
pnpm typecheck      # TypeScript / Vue type checks
pnpm lint           # ESLint
pnpm format         # Prettier (write)
pnpm test           # Vitest
pnpm check          # format:check + lint + typecheck + test
```

## Repository structure

```
app/
  app.vue              Root component (Naive UI config provider + global style)
  assets/css/          Shell styles (everything else is Naive UI)
  components/          Layout (header, footer, page header) and cards
  data/                Typed structured data (services, notices, tasks, navigation, …)
  layouts/             Layout shell
  pages/               File-based routes (home, services, notices, …)
  composables/         usePageSeo
  plugins/             Locale detection and persistence
i18n/locales/*.json    UI strings (en, zh)
public/                Static assets (favicon, robots.txt, manifest)
deploy/                nginx and Caddy examples
docs/                  Documentation
```

## Content

The portal is a **client-rendered SPA** built into static files. Structured data
(services, notices, tasks, offices, directorates) lives in typed modules under
`app/data/`; all labels are i18n keys, never hard-coded copy.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). In short: `pnpm generate` writes
a static site to `.output/public/` that can be served by nginx or Caddy.

A container image is also provided — it serves the static bundle with nginx:

```bash
docker build -t nia-gov42 .
docker run --rm -p 8080:8080 nia-gov42
```

CI (`.github/workflows/ci.yml`) runs format/lint/typecheck/test and the static
build; tagged releases publish a multi-arch image to GitHub Packages
(`.github/workflows/docker-build.yml`, `release.yml`).

## Offline (dn42) operation

dn42 has no access to the public internet, so the site makes **no third-party
runtime requests**:

- Icons are bundled locally from `@lucide/vue`.
- Fonts are the system UI font stack — nothing is downloaded.
- No analytics, CDN or API calls.

## Conventions

- Code, comments, identifiers and this README are written in **English**.
- All user-facing copy lives behind i18n keys — never hard-coded in components.
- Prefer Naive UI components over hand-written markup or CSS.
- Country codes follow `epass42`: MRZ/ICAO three-letter code `UDN`, alpha-2 code
  `XD`.
