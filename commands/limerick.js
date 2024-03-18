import { SlashCommandBuilder } from "discord.js";
import { completion } from "../utils/openai.js";
import { logger } from "../utils/logger.js";

const childLogger = logger.child({ scope: "limerick.js" });

export const data = new SlashCommandBuilder()
	.setName("limerick")
	.setDescription("have the bot write a limerick on the subject of your choice")
	.addStringOption((option) =>
		option
			.setName("subject")
			.setDescription("what do you want the poem to be about?")
			.setRequired(true)
			.setMaxLength(100)
	);

export async function execute(interaction) {
	const subject = interaction.options.getString("subject");
	await interaction.deferReply();
	try {
		const limerick = await completion(
			"write a limerick on the given subject",
			subject
		);
		interaction.editReply(limerick);
	} catch (error) {
		childLogger.error(error);
		await interaction.editReply("it didnt work sorry \n try again maybe?");
	}
}
