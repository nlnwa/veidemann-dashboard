FROM nginx

MAINTAINER Norsk Nettarkiv <nettarkivet@nb.no>

RUN apt-get update \
&& apt-get install curl gnupg -y \
&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
&& apt-get update \
&& apt-get install nodejs yarn -y \
&& rm -r /var/lib/apt/lists/*

COPY package.json yarn.lock /usr/src/app/
RUN mkdir -p /usr/src/app \
&& cd /usr/src/app \
&& yarn install \
&& yarn cache clean

COPY . /usr/src/app
RUN cd /usr/src/app \
&& node_modules/@angular/cli/bin/ng build --prod \
&& cp -r /usr/src/app/dist/* /usr/share/nginx/html/

RUN apt-get remove nodejs yarn -y \
&& apt-get autoremove -y


ENV PROXY_ADDR=localhost:3010 \
    EXTERNAL_HOSTNAME=host:32000

CMD envsubst '${PROXY_ADDR}' < /usr/src/app/nginx/default.conf > /etc/nginx/conf.d/default.conf \
&& MAIN_BUNDLE=$(basename "$(ls /usr/src/app/dist/main.*.bundle.js)") \
&& envsubst '${EXTERNAL_HOSTNAME}' < /usr/src/app/dist/${MAIN_BUNDLE} > /usr/share/nginx/html/${MAIN_BUNDLE} \
&& nginx -g "daemon off;"
