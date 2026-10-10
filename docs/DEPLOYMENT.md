# Deployment

The NIA portal is a **pure front-end** application. It is built into a set of
static files and served by any static web server. There is no database, server
runtime or external API.

## 1. Build

```bash
pnpm install --frozen-lockfile
pnpm generate
```

The output is written to `.output/public/`. The app is a client-rendered SPA:
each known route is written as a `<route>/index.html` shell that boots the same
application, and `200.html` is used as the fallback for unknown routes.

```bash
# copy the build to the web root
rsync -a --delete .output/public/ /var/www/nia-gov42/
```

## 2. Serve

Example configurations are provided:

- [`deploy/nginx.conf`](../deploy/nginx.conf)
- [`deploy/Caddyfile`](../deploy/Caddyfile)

Both fall back to `/200.html` for unknown routes, set long-lived caching for
`/_nuxt/` assets and send the following security headers:

| Header | Value |
| --- | --- |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `Content-Security-Policy` | see the example configs |

> The application emits a small inline script (the colour-mode bootstrap) and
> Naive UI injects inline styles, so the CSP allows `'unsafe-inline'` for
> `script-src` and `style-src`. No third-party origins are allowed.

## 3. DNS

`nia.gov.dn42` is resolved by the dn42 root zone. Add a record for the
subdomain in the dn42 registry:

```
# data/dns/nia.gov.dn42
domain:             nia.gov.dn42
nserver:            <your nameserver>
```

Point `nia.gov.dn42` (and, when the ePass42 portal is deployed,
`epass.nia.gov.dn42` and `portal.nia.dn42`) at the host that serves this build.

## 4. TLS

dn42 has no public certificate authority. Two common options:

- **Caddy** — use `tls internal` (a local CA) and distribute the root to clients.
- **nginx** — issue a certificate from the dn42 community CA, or use a
  self-signed certificate and distribute it out of band.

The certificate must be valid for `nia.gov.dn42`.

## 5. Verification

After deployment, confirm that:

- every route returns `200` and serves the SPA shell;
- `/_nuxt/*` assets are cached and served over HTTPS;
- the security headers above are present;
- there are **no requests to the public internet** (icons and scripts are
  bundled, fonts are the system stack).

```bash
curl -sI https://nia.gov.dn42/ | grep -iE 'content-security-policy|strict-transport'
curl -sI https://nia.gov.dn42/_nuxt/ | grep -i 'cache-control'
```

## 6. Container image

A `Dockerfile` is provided: it builds the SPA (`nuxt generate`) and serves the
static bundle with nginx. The image is static and runs behind a reverse proxy
(it does not terminate TLS).

```bash
docker build -t nia-gov42 .
docker run --rm -p 8080:8080 \
  -e NIA_FRONTEND_HOST=0.0.0.0 \
  -e NIA_FRONTEND_PORT=8080 \
  nia-gov42
```

`NIA_FRONTEND_HOST` / `NIA_FRONTEND_PORT` control the address nginx listens on
inside the container (`deploy/docker/nginx.conf.template`). The image exposes
`/healthz` for health checks. CI builds and, on version tags, publishes a
multi-arch (amd64 + arm64) image to GitHub Packages — see
`.github/workflows/`.

