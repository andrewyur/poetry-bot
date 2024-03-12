import { logger } from '../utils/logger.js';

const childLogger = logger.child({ scope: 'unhandledRejection.js' });

export const name = 'unhandledRejection';
export const once = false;
export function execute(error) {
	childLogger.error(error);
	console.error('unhandled promise rejection caught.');
}