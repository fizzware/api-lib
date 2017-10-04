const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const allowCrossDomain = require('./middleware/allow-cross-domain');
const disableCaching = require('./middleware/disable-caching');
const consoleLogError = require('./middleware/console-log-error');
const printStackTrace = require('./middleware/print-stack-trace');

const status = require('./routes/status');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

if (app.get('env') === 'development') {
  app.use(allowCrossDomain);
}

app.disable('etag');
app.use(disableCaching);

if (app.get('env') !== 'production') {
  app.use(consoleLogError);
}

app.use(printStackTrace);

app.use('/', status);

module.exports = app;
