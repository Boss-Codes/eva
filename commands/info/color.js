const { RichEmbed } = require('discord.js'); 

module.exports = { 
    name: 'color', 
    description: 'Displays a color based on the HEX code provided.', 
    usage: '<hex code>', 
    category: 'info', 
    run: async (client, message, args) => { 

        const color = args[0]
        if (!args[0]) { 
            return message.channel.send('<:No:625122928849059860> Provide a color.')
        }
        const colorembed = new RichEmbed()
        .setAuthor(`Color`)
        .setDescription(`Color: ${color}`)
        .setColor(color)
        .setThumbnail(`https://dummyimage.com/600x400/${color}/fff&text=Boss+Bot+`)

        message.channel.send(colorembed);

    }
}