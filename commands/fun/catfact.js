
const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'catfact', 
    description: 'Sends a random cat fact',  
    category: 'fun', 
    run: async (client, message, args) => { 
       const { body } = await snekfetch.get('https://some-random-api.ml/facts/cat')
       message.channel.send(body.fact)
       
    }
}