import { SlashCommandBuilder } from 'discord.js';
import { completion } from '../utils/openai.js';
import { logger } from '../utils/logger.js';

const childLogger = logger.child({ scope: 'freeverse.js' });

export const data = new SlashCommandBuilder()
	.setName('freeverse')
	.setDescription('have the bot write a free verse poem on the subject of your choice')
	.addStringOption(option =>
		option.setName('subject')
			.setDescription('what do you want the poem to be about?')
			.setRequired(true)
			.setMaxLength(100),
	);

export async function execute(interaction) {
	const subject = interaction.options.getString('subject');
	await interaction.deferReply();
	try {
		const haiku = await completion('write a super short free verse poem on the given subject, supply a title surrounded by double asterisks', subject);
		interaction.editReply(haiku);
	}
	catch (error) {
		childLogger.error(error);
		await interaction.editReply('it didnt work sorry \n try again maybe?');
	}
}