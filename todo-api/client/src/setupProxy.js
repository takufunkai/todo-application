const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://mysterious-gorge-55099.herokuapp.com',
            changeOrigin: true,
        })
    );
};