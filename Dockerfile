FROM node:20.11-alpine as build

ARG BASE_HREF=/veidemann/
ARG VERSION

# Install git because git dependency in package.json
# Install gettext because envsubst
RUN apk add --update --no-cache git gettext

COPY package.json yarn.lock .yarnrc /usr/src/app/
WORKDIR /usr/src/app
RUN yarn install --non-interactive --frozen-lockfile

COPY . .

# Give the application a version
RUN sed -i "s/version: ''/version: '${VERSION}'/" src/environments/*.ts

RUN yarn ng build \
--configuration production \
--base-href=${BASE_HREF} \
--output-path=dist/${BASE_HREF}

# Configure nginx location
RUN envsubst \$BASE_HREF < nginx/default.template.conf > nginx/default.conf


FROM nginx:stable-alpine
LABEL maintainer="nettarkivet@nb.no"

COPY --from=build /usr/src/app/dist /usr/share/nginx/app

COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/conf.d/
