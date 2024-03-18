import { SlashCommandBuilder } from "discord.js";
import { completion } from "../utils/openai.js";
import { logger } from "../utils/logger.js";

const childLogger = logger.child({ scope: "tweet.js" });

export const data = new SlashCommandBuilder()
	.setName("tweet")
	.setDescription("modern poetry. have the bot write a tweet on its own.");

export async function execute(interaction) {
	await interaction.deferReply();
	try {
		const tweet = await completion(
			"you are a gen z internet microcelebrity, famous for his weird, freaky, gross, and unhinged gen z style tweets using modern internet slang, without hashtags or emojis."
		);
		interaction.editReply(tweet);
	} catch (error) {
		childLogger.error(error);
		await interaction.editReply("it didnt work sorry \n try again maybe?");
	}
}
