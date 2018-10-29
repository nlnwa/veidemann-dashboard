FROM node:8-alpine

ARG BASE_HREF=/veidemann
ARG DEPLOY_URL=/veidemann

RUN apk add --update --no-cache git

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app
RUN yarn install && yarn cache clean

COPY . .
RUN sed -i "s/version: ''/version: '$(git describe --tags)'/" src/environments/*.ts \
&& node_modules/@angular/cli/bin/ng build --configuration=production


FROM nginx:stable-alpine
LABEL maintainer="nettarkivet@nb.no"

ARG DEPLOY_URL=/veidemann

COPY --from=0 /usr/src/app/dist/ /usr/share/nginx/html${DEPLOY_URL}

COPY nginx/default.conf /etc/nginx/conf.d/

