
const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'bird', 
    description: 'Sends a random bird', 
    aliases: ['birb', 'flatbird'], 
    category: 'fun', 
    run: async (client, message, args) => { 
    const { body } = await snekfetch.get('https://some-random-api.ml/img/birb')
       const tweet = new RichEmbed()
       .setAuthor('🐤 Tweet, here is your random birb! 🐤')
       .setColor('BLUE')
       .setImage(body.link)
                message.channel.send(tweet);
            }
    }