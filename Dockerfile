FROM node:slim

MAINTAINER Norks Nettarkiv <nettarkivet@nb.no>

RUN mkdir /app

WORKDIR /app

RUN groupadd -r nnadmin \
  && useradd --no-log-init -r -g nnadmin nnadmin \
  && mkdir /home/nnadmin \
  && chown -R nnadmin:nnadmin /home/nnadmin

USER nnadmin

COPY . .

RUN chown -R nnadmin:nnadmin . \
   && npm install \
   && node_modules/@angular/cli/bin/ng build --aot \
   && rm -rf src/

EXPOSE 3010

CMD ["node", "server.js"]

