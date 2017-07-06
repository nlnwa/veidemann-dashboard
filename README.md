# Broprox-gui

Broprox-gui is an frontend web-application of the [broprox harvester](https://github.com/nlnwa/broprox), written in angular2/4.

Since GRPC does not work in browsers yet (atleast not officially) we're using an express app as a proxy for the grpc part, in addition to serve the static files.

## Installation

$ git clone https://github.com/nlnwa/broprox-gui.git

$ cd broprox-gui 

$ npm install

## Development server

Run `node/nodemon server.js` to fire up grpc proxy 
Run `ng serve --proxy proxy-cfg.json --host 0.0.0.0` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build

Run `ng build --aot` to build the project. The build artifacts will be stored in the `dist/` directory.

## Note

Always run `ng serve --aot --proxy proxy-cfg.json --host 0.0.0.0` before pushing to git `--aot` (ahead of time compilation) can sometimes be picky. 
