FROM alpine:latest as documentation

# install git
RUN apk add --no-cache git

ARG HUGO_VERSION=0.63.1
ARG HUGO_BINARY=hugo_${HUGO_VERSION}_Linux-64bit.tar.gz
ARG SITE_DIR='/usr/share/site'

# fetch hugo
RUN wget -O /tmp/hugo.tar.gz \
    https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz \
    && tar xvzf /tmp/hugo.tar.gz \
    && install hugo /usr/local/bin/hugo \
    && mkdir ${SITE_DIR}

WORKDIR ${SITE_DIR}

COPY docs ${SITE_DIR}

# install theme and generate static documentation
RUN cd themes \
    && git clone https://github.com/matcornic/hugo-theme-learn.git \
    && cd ..\
    && hugo -d out


FROM node:10-alpine as app

ARG BASE_HREF=/veidemann
ARG DEPLOY_URL=/veidemann
ARG VERSION

RUN apk add --update --no-cache git

COPY package.json yarn.lock .yarnrc /usr/src/app/
WORKDIR /usr/src/app
RUN yarn

COPY . .

RUN VERSION=${VERSION:-$(git describe --tags --always)} \
&& sed -i "s/version: ''/version: '${VERSION}'/" src/environments/*.ts \
&& node_modules/@angular/cli/bin/ng build --configuration=production


FROM nginx:stable-alpine
LABEL maintainer="nettarkivet@nb.no"

ARG DEPLOY_URL=/veidemann

COPY --from=app /usr/src/app/dist/ /usr/share/nginx/html${DEPLOY_URL}
COPY --from=documentation /usr/share/site/out /usr/share/nginx/html${DEPLOY_URL}/docs

COPY nginx/default.conf /etc/nginx/conf.d/

