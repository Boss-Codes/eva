const { Client, Collection } = require('discord.js'); 
const { stripIndents } = require('common-tags'); 
const { config } = require('dotenv'); 
const fs = require('fs')
const client = new Client({
    disableEveryone: true, 
}); 

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection(); 

client.categories = fs.readdirSync('./commands')
client.eventCategories = fs.readdirSync('./events'); 

config({
    path: __dirname + "/.env"
}); 

['command', 'event'].forEach(handler => { 
    require(`./handlers/${handler}`)(client); 
}); 

client.login(process.env.TOKEN); 