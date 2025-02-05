const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/confs",
    createProxyMiddleware({
      target: "http://manager.example.com:19876",
      changeOrigin: true,
      logger: console,
      pathRewrite: { "^/": "/confs/" },
    })
  );
  app.use(
    "/manager.fcgi",
    createProxyMiddleware({
      target: "http://manager.example.com:19876",
      changeOrigin: true,
      logger: console,
      pathRewrite: { "^/": "/manager.fcgi/" },
    })
  );
  app.use(
    "/partial",
    createProxyMiddleware({
      target: "http://manager.example.com:19876",
      changeOrigin: true,
      logger: console,
      pathRewrite: { "^/": "/partial/" },
    })
  );
  app.use(
    "/prx",
    createProxyMiddleware({
      target: "http://manager.example.com:19876",
      changeOrigin: true,
      logger: console,
      pathRewrite: { "^/": "/prx/" },
    })
  );
  app.use(
    "/psgi.js",
    createProxyMiddleware({
      target: "http://manager.example.com:19876",
      changeOrigin: true,
      logger: console,
      pathRewrite: { "^/": "/psgi.js", "^/psgi.js": "/psgi.js" },
    })
  );
};
