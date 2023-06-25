const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/react/mycontracts',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
      secure: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  );
};
