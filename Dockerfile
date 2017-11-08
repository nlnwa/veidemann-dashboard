FROM node:8-alpine

COPY package.json yarn.lock /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install && yarn cache clean
COPY . .
RUN node_modules/@angular/cli/bin/ng build --target=production


FROM nginx:alpine
LABEL maintainer="nettarkivet@nb.no"

COPY --from=0 /usr/src/app/dist/ /usr/src/app/nginx/ /usr/src/app/

RUN cp -r /usr/src/app/* /usr/share/nginx/html/ \
&& rm -r /usr/share/nginx/html/default.conf

ENV PROXY_ADDR=localhost:3010 \
    EXTERNAL_HOSTNAME=host:32000

CMD envsubst '${PROXY_ADDR}' < /usr/src/app/default.conf > /etc/nginx/conf.d/default.conf \
&& MAIN_BUNDLE=$(basename "$(ls /usr/src/app/main.*.bundle.js)") \
&& envsubst '${EXTERNAL_HOSTNAME}' < /usr/src/app/${MAIN_BUNDLE} > /usr/share/nginx/html/${MAIN_BUNDLE} \
&& nginx -g "daemon off;"
