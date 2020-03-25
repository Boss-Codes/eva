const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'dog', 
    description: 'Sends a random dog', 
    aliases: ['doge', 'doggy', 'woof'], 
    category: 'fun', 
    run: async (client, message, args) => { 
       const { body } = await snekfetch.get('https://some-random-api.ml/img/dog')
       const woof = new RichEmbed()
       .setAuthor('🐶 Woof Woof! Here is your doggy! 🐶')
       .setColor('BLUE')
       .setImage(body.link)

       message.channel.send(woof);
    }
}