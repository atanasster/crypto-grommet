// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development Company, L.P.

/* eslint-disable import/no-unresolved */
import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import config from '../server/config.json';
import initializeDb from '../server/db';
import middleware from '../server/middleware';
import api from '../server/api';
import sockets from '../server/socket';

const app = express();
app.server = http.createServer(app);
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json());
// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));
// connect to db
initializeDb((db) => {
  // internal middleware
  app.use(middleware({ config, db }));
  // api router
  app.use('/api', api({ config, db }));
  app.use('/', express.static(path.resolve(__dirname)));
  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
  sockets({ config, db });
});

