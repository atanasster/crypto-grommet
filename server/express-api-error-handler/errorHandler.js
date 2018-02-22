import HTTPStatus from 'http-status';

/**
 * Original: https://github.com/lsentkiewicz/express-api-error-handler
 * By Łukasz Sentkiewicz, https://github.com/lsentkiewicz
 * Create an express handler middleware for error handling
 * @param {Function} [log] the function to log the occurred error
 * @param {Boolean} [hideProdError] hide the message from 5xx errors in prod mode
 * @returns {Function} the express error middleware
 */
function errorHandler({ log, hideProdErrors } = {}) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    let status = err.statusCode || HTTPStatus.INTERNAL_SERVER_ERROR;
    if (err.isJoi) {
      status = HTTPStatus.BAD_REQUEST;
    }
    if (status < HTTPStatus.BAD_REQUEST) {
      status = HTTPStatus.BAD_REQUEST;
    }
    const body = { status };
    if (err.isOAuth && typeof err.body === 'string') {
      res.send(err.body);
    } else {
      if (err.isJoi) {
        body.error = 'Validation failed';
        body.details = err.details;
      } else {
        body.error = err.message;
      }
      if (process.env.NODE_ENV !== 'production') {
        body.stack = err.stack;
      }
      if (hideProdErrors && process.env.NODE_ENV === 'production' && status >= HTTPStatus.INTERNAL_SERVER_ERROR) {
        body.error = HTTPStatus[status];
      }
      if (log) {
        log({ err, req, res, body });
      }
      res.status(status);
      res.json(body);
    }
  };
}

export default errorHandler;
