import winston from 'winston';

const { combine, timestamp, colorize, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    colorize(),
    logFormat
  ),
  transports: [new winston.transports.Console()]
});

export default logger; 