'user strict';

module.exports = {
  method: 'GET',
  path: '/profile/{id}',
  handler: (req, res) => {
    req.logger.info('In handler %s', req.path);
    return 'Hello, user ' + encodeURIComponent(req.params.id) + '!'
  }
}