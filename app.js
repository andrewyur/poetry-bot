import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

(async () => {


	// Create a new client instance
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Log in to Discord with your client's token
	client.login(process.env.DISCORD_TOKEN);

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	client.commands = new Collection();

	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath);

	for (const file of commandFiles) {
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
			console.error(`Error importing module from ${modulePath}:`, error);
		}
	}

	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath);

	for (const file of eventFiles) {
		const filePath = pathToFileURL(path.join(eventsPath, file));
		const event = await import(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}

	client.login(process.env.DISCORD_TOKEN);

})();