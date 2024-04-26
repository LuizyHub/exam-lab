const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://exam-lab.store/api',
            changeOrigin: true,
        })
    );
    app.use(
      '/users',
      createProxyMiddleware({
          target: 'https://exam-lab.store/users',
          changeOrigin: true,
      })
  );
};
