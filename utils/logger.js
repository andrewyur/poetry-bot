import winston from 'winston';

const { combine, timestamp, json, errors } = winston.format;

// Create and export new logger instance
export const logger = winston.createLogger({
	level: 'info',
	format: combine(errors({ stack: true }), timestamp(), json()),
	transports: [new winston.transports.File({
		filename: 'errors.log',
	})],
});