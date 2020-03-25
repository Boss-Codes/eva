const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'pandafact', 
    description: 'Sends a random panda fact',  
    category: 'fun', 
    run: async (client, message, args) => { 
       const { body } = await snekfetch.get('https://some-random-api.ml/facts/panda')
       message.channel.send(body.fact)
       
    }
}