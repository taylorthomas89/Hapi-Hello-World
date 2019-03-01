'use strict';

module.exports = {
  method: 'GET',
  path: '/{name}',
  handler: (req, res) => {
    req.logger.info('In handler %s', req.path);
    return 'Hello, ' + encodeURIComponent(req.params.name) + '!'
  }
}