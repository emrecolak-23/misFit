// Import Winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'gallery-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/gallery/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/gallery/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/gallery/combined.log' }),
  ],
});

module.exports = logger