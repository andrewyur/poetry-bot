import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../../utils/logger.js';

const childLogger = logger.child({ scope: 'error.js' });

export const data = new SlashCommandBuilder()
	.setName('error')
	.setDescription('throws an error, and logs it. for testing purposes.');

export async function execute(interaction) {
	try {
		throw new Error('error command was called.');
	}
	catch (error) {
		childLogger.error(error);
		await interaction.reply('error successfully caught and logged.');
	}
}