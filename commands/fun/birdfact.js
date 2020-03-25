const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'birdfact', 
    description: 'Sends a random bird fact',  
    category: 'fun', 
    run: async (client, message, args) => { 
       const { body } = await snekfetch.get('https://some-random-api.ml/facts/bird')
       message.channel.send(body.fact)
       
    }
}