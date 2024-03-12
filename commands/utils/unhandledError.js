import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('unhandlederror')
	.setDescription('throws an error, doesn\'t catch it. for testing purposes.');

export async function execute() {
	throw new Error('unhandled error command called');
}