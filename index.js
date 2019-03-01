'use strict';

const Hapi = require('hapi');
const routes = [
  require('./routes/greeting'),
  require('./routes/helloword'),
  require('./routes/profile')
];

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
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

server.route(routes);

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();