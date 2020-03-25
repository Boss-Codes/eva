
const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'dogfact', 
    description: 'Sends a random dog fact',  
    category: 'fun', 
    run: async (client, message, args) => { 
       const { body } = await snekfetch.get('https://some-random-api.ml/facts/dog')
       message.channel.send(body.fact)
       
    }
}