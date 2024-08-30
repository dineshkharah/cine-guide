const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.statusCode) {
    // If the error has a specific status code, use it
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // Return a generic internal server error
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Something went wrong, please try again later.' });
}

module.exports = errorHandlerMiddleware;
