# poetry-bot
discord poetry bot using discord.js in ES6 and the openai API.
Uses a basic docker configuration, and winston for error logging.
Mounts `.env` and `errors.log` as volumes.

## instructions

create a  `.env` file with: 
- DISCORD_TOKEN: your discord bot's client secret
- APP_ID: your discord bot's application id
- OPENAI_API_KEY: your openai api key (must be generated from a paid account)

create a `errors.log` file, so it can be mounted as a volume by docker.

`yarn` to install modules

`yarn start` to run the bot

`docker compose up --build` to build and run the bot in a docker container

`yarn run register` to register new commands
- commands must be exported from separate files inside the commands directory

## todo
- CI/CD (would need my own server)
- raspberry pi + ssh?

