
const { RichEmbed } = require('discord.js'); 
const snekfetch = require('snekfetch');
module.exports = { 
    name: 'meme', 
    description: 'Sends a random meme', 
    category: 'fun', 
    run: async (client, message, args) => { 
        const { body } = await snekfetch.get('https://some-random-api.ml/meme')
                let catembed = new RichEmbed()
                .setColor('BLUE')
                .setAuthor('Here is your meme.')
                .setImage(body.image)

                message.channel.send(catembed);
            }
    }