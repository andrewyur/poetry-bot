import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { logger } from './utils/logger.js';

// create a child logger instance
const childLogger = logger.child({ scope: 'app.js' });

(async () => {

	// Create a new client instance
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Log in to Discord with your client's token and set up commands collection
	client.login(process.env.DISCORD_TOKEN);
	client.commands = new Collection();

	// get file path of app.js and navigate into /commands
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath);

	// import commands
	for (const file of commandFiles) {
		if (file.endsWith('.js')) {
			const modulePath = pathToFileURL(path.join(commandsPath, file));
			try {
				const commandModule = await import(modulePath);
				const command = commandModule.default || commandModule;
				if ('data' in command && 'execute' in command) {
					client.commands.set(command.data.name, command);
				}
				else {
					console.log(`[WARNING] The command at ${modulePath} is missing a required "data" or "execute" property.`);
				}
			}
			catch (error) {
				childLogger.error(error);
				console.error(`Error importing module from ${modulePath}:`, error);
			}
		}
	}

	// navigate into /events
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath);

	// set up event handling
	for (const file of eventFiles) {
		const filePath = pathToFileURL(path.join(eventsPath, file));
		try {
			const event = await import(filePath);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			}
			else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
		catch (error) {
			childLogger.error(error);
			console.error(`error importing event from ${filePath}.`);
		}
	}

	// log in
	client.login(process.env.DISCORD_TOKEN);

})().catch(error => childLogger.error(error));