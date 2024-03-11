import { REST, Routes } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import 'dotenv/config';

(async () => {

	const commands = [];

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath);

	for (const file of commandFiles) {
		const modulePath = pathToFileURL(path.join(commandsPath, file));
		try {
			const commandModule = await import(modulePath);
			const command = commandModule.default || commandModule;
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			}
			else {
				console.log(`[WARNING] The command at ${modulePath} is missing a required "data" or "execute" property.`);
			}
		}
		catch (error) {
			console.error(`Error importing module from ${modulePath}:`, error);
		}
	}


	const rest = new REST().setToken(process.env.DISCORD_TOKEN);

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();