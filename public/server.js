// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development Company, L.P.

/* eslint-disable import/no-unresolved */
import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../server/config';
import initializeDb from '../server/db/index';
import middleware from '../server/middleware/index';
import api from '../server/api/index';
import sockets from '../server/socket/index';

const app = express();
app.server = http.createServer(app);
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
// 3rd party middleware
app.use(cors());
// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middleware({ config, db }));
  // api router
  app.use('/api', api({ config, db }));
  const port = process.env.PORT || config.port;
  app.use('/', express.static(path.resolve(__dirname)));
  app.server.listen(port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
  sockets({ app: app.server, config, db });
});

