import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
console.log(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const commandsPath = path.join(__dirname, 'commands');
console.log(commandsPath);
const commandFiles = fs.readdirSync(commandsPath);
console.log(commandFiles)
