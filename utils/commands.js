import { REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import 'dotenv/config';
import { logger } from './logger.js';

// create a logger instance
const childLogger = logger.child({ scope: 'commands.js' });

(async () => {

	const commands = [];

	// get commands.js path and navigate to /commands
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(path.dirname(__filename));

	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath);

	// import and store commands in `commands`
	for (const file of commandFiles) {
		if (file.endsWith('.js')) {
			const modulePath = pathToFileURL(path.join(commandsPath, file));
			try {
				const commandModule = await import(modulePath);
				const command = commandModule.default || commandModule;
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				}
				else {
					childLogger.warn(`[WARNING] The command at ${modulePath} is missing a required "data" or "execute" property.`);
					console.log(`[WARNING] The command at ${modulePath} is missing a required "data" or "execute" property.`);
				}
			}
			catch (error) {
				childLogger.error(error);
				console.error(`Error importing module from ${modulePath}:`, error);
			}
		}
	}

	// not entirely sure how this bit works, but it resgisters the imported commands with discord
	const rest = new REST().setToken(process.env.DISCORD_TOKEN);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		childLogger.error(error);
		console.error(error);
	}
})().catch(error => childLogger.error(error));