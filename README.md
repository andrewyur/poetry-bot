# poetry-bot
discord poetry bot using discord.js and chatgpt API

## instructions

create a  `.env` file with: 
- DISCORD_TOKEN: your discord bot's client secret
- APP_ID: your discord bot's application id
- OPENAI_API_KEY: your openai api key (must be generated from a paid account)

`yarn` to install modules

`yarn start` to run the bot

`yarn run register` to register new commands
- commands must be exported from separate files inside the commands directory

## todo
- dockerize
- github workflow to build and deploy
- error logging + alerts
- raspberry pi + ssh

