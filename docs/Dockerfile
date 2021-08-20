FROM alpine:latest as build

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

COPY . .

# install theme
RUN cd themes && git clone --depth 1 https://github.com/matcornic/hugo-theme-learn.git
# generate site
RUN hugo -d out

FROM nginx:stable-alpine
LABEL maintainer="nettarkivet@nb.no"

COPY --from=build /usr/share/site/out /usr/share/nginx/html/
