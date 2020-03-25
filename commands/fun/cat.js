const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'cat', 
    description: 'Sends a random cat', 
    aliases: ['kitty', 'meow'], 
    category: 'fun', 
    run: async (client, message, args) => { 
        const { body } = await snekfetch.get('https://some-random-api.ml/img/cat')
                let catembed = new RichEmbed()
                .setColor('BLUE')
                .setAuthor('🐱 Meow! Here is your kitty uwu 🐱')
                .setImage(body.link)

                message.channel.send(catembed);
            }
    }