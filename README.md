# poetry-bot

discord poetry bot using discord.js in ES6 and the openai API.
Uses a basic docker configuration, and winston for error logging.
Mounts `.env` and `errors.log` as volumes.

## Hosting instructions

create a `.env` file with:

- DISCORD_TOKEN: your discord bot's client secret
- APP_ID: your discord bot's application id
- OPENAI_API_KEY: your openai api key (must be generated from a paid account)

create a `errors.log` file, so it can be mounted as a volume by docker.

run `docker compose up --build` to build and run the bot in a docker container

run `docker image prune` to remove dangling images, should be run periodically

## development instructions

`yarn` to install modules

`yarn start` to run the bot

`yarn run register` to register new commands

- commands must be exported from separate files inside the commands directory
