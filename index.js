'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (req, res) => 'Hello World!'
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (req, res) => {
    req.logger.info('In handler %s', req.path);
    return 'Hello, ' + encodeURIComponent(req.params.name) + '!'
  }
});

const init = async () => {
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart']
    }
  });

  await server.start();
  console.log(`Server is running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();