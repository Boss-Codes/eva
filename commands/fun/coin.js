
const { RichEmbed } = require('discord.js'); 
module.exports = { 
    name: 'coin', 
    description: 'Flips a coin', 
    category: 'fun', 
    aliases: ['flip'],
    run: async (client, message, args) => { 
       const sides = ['heads', 'tails']; 
       message.channel.send(`It landed on ${sides[Math.floor(Math.random() * sides.length)]}!`);

    }
}