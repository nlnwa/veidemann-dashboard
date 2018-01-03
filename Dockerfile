FROM node:8-alpine

ENV BASE_HREF=/veidemann

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install && yarn cache clean
COPY . .
RUN node_modules/@angular/cli/bin/ng set warnings.typescriptMismatch=false \
&& node_modules/@angular/cli/bin/ng build --target=production --base-href ${BASE_HREF}


FROM nginx:alpine
LABEL maintainer="nettarkivet@nb.no"

COPY --from=0 /usr/src/app/dist/ /usr/src/app/nginx/ /usr/src/app/

ENV BASE_HREF=/veidemann \
    API_GATEWAY=localhost:3010 \
    OPENID_CONNECT_ISSUER=http://localhost:32000/dex

RUN mkdir -p /usr/share/nginx/html${BASE_HREF} \
&& cp -r /usr/src/app/* /usr/share/nginx/html${BASE_HREF} \
&& rm -r /usr/share/nginx/html${BASE_HREF}/default.conf

CMD envsubst '${BASE_HREF} ${API_GATEWAY}' < /usr/src/app/default.conf > /etc/nginx/conf.d/default.conf \
&& envsubst '${OPENID_CONNECT_ISSUER}' < usr/src/app/assets/auth_config.json > /usr/share/nginx/html/assets/auth_config.json \
&& nginx -g "daemon off;"
