FROM node:8-alpine

ARG BASE_HREF=/veidemann
ARG DEPLOY_URL=/veidemann

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install && yarn cache clean
COPY . .
RUN node_modules/@angular/cli/bin/ng build \
--target=production \
--base-href ${BASE_HREF} \
--deploy-url ${DEPLOY_URL}


FROM nginx:alpine
LABEL maintainer="nettarkivet@nb.no"

ARG BASE_HREF=/veidemann

COPY --from=0 /usr/src/app/dist/ /usr/share/nginx/html${BASE_HREF}
COPY nginx/default.conf src/assets/config/environment.json /tmp/

# RUN cp /usr/share/nginx/html${BASE_HREF}/assets/auth_config.json /tmp/auth_config.json
ENV BASE_HREF=${BASE_HREF} \
    API_GATEWAY=http://localhost:3010/api \
    OPENID_CONNECT_ISSUER="" \
    OPENID_CONNECT_ISSUER_BACKEND=http://dex:5556/dex


CMD envsubst '${BASE_HREF} ${API_GATEWAY} ${OPENID_CONNECT_ISSUER_BACKEND}' < /tmp/default.conf > /etc/nginx/conf.d/default.conf \
&& envsubst '${OPENID_CONNECT_ISSUER}' < /tmp/environment.json > /usr/share/nginx/html${BASE_HREF}/assets/config/environment.json \
&& nginx -g "daemon off;"
