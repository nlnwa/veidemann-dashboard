FROM node:20-alpine as build

ARG VERSION

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --non-interactive --frozen-lockfile

COPY . .

RUN sed -i "s/version: ''/version: '${VERSION}'/" src/environments/*.ts

RUN yarn ng build --configuration production


FROM nginx:stable-alpine
LABEL maintainer="nettarkivet@nb.no"

COPY --from=build /usr/src/app/dist /usr/share/nginx

COPY --from=build /usr/src/app/nginx/default.conf /etc/nginx/conf.d/
