# syntax=docker/dockerfile:1

# NIA portal image.
#
# Builds the Nuxt SPA as a fully static bundle (`nuxt generate`) and serves it
# with nginx:alpine-slim. The container runs *behind a reverse proxy* and does
# not terminate TLS itself.
#
# The listen address is configurable at runtime, so a single image works for
# every deployment:
#
#   * NIA_FRONTEND_HOST / NIA_FRONTEND_PORT - the address nginx listens on
#     inside the container (default 0.0.0.0:8080).
#
# Build from the repository root:
#   docker build -t nia-gov42 .
#
# Run:
#   docker run --rm -p 8080:8080 nia-gov42

FROM node:26-slim AS build
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN npm install -g pnpm@11.26.0
WORKDIR /app

# The whole repository is copied; host state (node_modules, .output, …) is
# excluded by .dockerignore.
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run generate


FROM nginx:alpine-slim AS runtime

# nginx renders this template to /etc/nginx/conf.d/default.conf at startup,
# substituting the NIA_FRONTEND_HOST / NIA_FRONTEND_PORT environment variables.
COPY deploy/docker/nginx.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build /app/.output/public /usr/share/nginx/html

ENV NIA_FRONTEND_HOST=0.0.0.0 \
    NIA_FRONTEND_PORT=8080

EXPOSE 8080

# ENTRYPOINT and CMD are inherited from the nginx image: the entrypoint runs the
# /docker-entrypoint.d/ hooks and then starts nginx in the foreground.
