const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://exam-lab.store',
            changeOrigin: true,
        })
    );
};
// // src/setupProxy.js
// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api/v1',
//     createProxyMiddleware({
//       target: 'https://exam-lab.store',
//       changeOrigin: true,
//       pathRewrite: {'^/api/v1' : ''},
//       cookieDomainRewrite: "localhost",
//       secure: false,
//       withCredentials: true
//     })
//   );
// };
// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://www.exam-lab.store',
//       changeOrigin: true,
//     })
//   );
// };