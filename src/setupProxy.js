const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
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

    // app.use(
    //     '/',
    //     createProxyMiddleware({
    //         target: 'https://exam-lab.store',
    //         changeOrigin: true,
    //         onProxyRes: function (proxyRes, req, res) {
    //             res.setHeader('Access-Control-Allow-Origin', '*');
    //         }
    //     })
    // );
};
