
const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'panda', 
    description: 'Sends a random panda', 
    category: 'fun', 
    run: async (client, message, args) => { 
        const { body } = await snekfetch.get('https://some-random-api.ml/img/panda')
                let catembed = new RichEmbed()
                .setColor('BLUE')
                .setAuthor('🐼 Here is your panda! 🐼')
                .setImage(body.link)

                message.channel.send(catembed);
            }
    }