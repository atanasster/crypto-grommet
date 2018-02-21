/* eslint-disable import/no-unresolved */
import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import sslRedirect from 'heroku-ssl-redirect';
import defaults from '../server/config';
import Passport from '../server/passport';
import api from '../server/api/index';
import sockets from '../server/socket/index';

const app = express();
app.server = http.createServer(app);
app.use(compression());
app.use(morgan('tiny'));
// 3rd party middleware
// enable ssl redirect
app.use(sslRedirect());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = { ...defaults, ...process.env };
Passport(app, config);
// api router
app.use('/api', api(config));
const port = config.PORT;
const dir = path.resolve(__dirname);
app.use(express.static(dir));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dir, 'index.html'));
});
app.server.listen(port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});
sockets({ app: app.server, config });
