# node-svelte-grunt-watch


skeleton for development setup using node/svelte

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```

Grunt-watch will look for changes in the `client/src` directory, and Grunt-nodemon will monitor the `server` directory. These watchers will recompile/rollup the client assets and/or restart the Node server when necessary.

## server

The server process is a Node/Express server app.

## client

This app uses the Svelte compiler to generate vanilla javascript from component files in `client/src`
