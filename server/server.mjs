import express from 'express';
import LRUCache from 'lru-cache';
import next from 'next';
import compression from 'compression';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import staticFiles from './static';
import routes from './routes';
import logger from './logger';
import modules from './modules';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

const getCacheKey = function getCacheKey(req) {
  return `${req.url}`;
};

const renderAndCache = function renderAndCache(
  req,
  res,
  pagePath,
  queryParams
) {
  const key = getCacheKey(req);

  if (ssrCache.has(key) && !dev) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      if (!dev) {
        console.log(`CACHE MISS: ${key}`);
        ssrCache.set(key, html);
      }

      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
};

const routerHandler = routes.getRequestHandler(
  app,
  ({
    req, res, route, query,
  }) => {
    renderAndCache(req, res, route.page, query);
  }
);

app.prepare()
  .then(() => {
    const server = express();
    if (!dev) {
      server.use(compression({ threshold: 0 }));
    }
    server.use(cors());
    modules.middleware(server);
    server.get('/sw.js', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/sw.js')));

    server.get('/manifest.html', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/manifest.html')));

    server.get('/manifest.appcache', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/manifest.appcache')));

    if (!dev) {
      server.get('/_next/-/app.js', (req, res) =>
        app.serveStatic(req, res, path.resolve('./.next/app.js')));
    }
    server.use(routerHandler);
    server.use('/', staticFiles());

    server.get('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) {
        return logger.error(err.message);
      }
      return logger.appStarted(port, 'localhost');
    });
  });
