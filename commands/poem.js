import { SlashCommandBuilder } from 'discord.js';
import { completion } from '../openai.js';

export const data = new SlashCommandBuilder()
	.setName('poem')
	.setDescription('have the bot write a haiku on the subject of your choice')
	.addStringOption(option =>
		option.setName('type')
			.setDescription('the type of poem')
			.setRequired(true)
			.addChoices(
				{ name: 'haiku', value: 'haiku' },
				{ name: 'limerick', value: 'short limerick' },
				{ name: 'free verse', value: 'short free verse poem' },
			))
	.addStringOption(option =>
		option.setName('subject')
			.setDescription('what do you want the poem to be about?')
			.setRequired(true),
	);

export async function execute(interaction) {
	const subject = interaction.options.getString('subject');
	const type = interaction.options.getString('type');
	await interaction.deferReply();
	const haiku = await completion(`write a ${type} on the given subject, with title`, subject);
	interaction.editReply(haiku);
}