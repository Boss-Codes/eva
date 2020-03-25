const { RichEmbed } = require('discord.js'); 
const moment = require('moment')
module.exports = { 
    name: 'emoji', 
    aliases: ['emoji-info', 'emote'], 
    description: 'Get information on an emoji.', 
    category: 'info', 
    usage: '<emoji>', 
    run: async (client, message, args) => { 

        const emoteargs = args.join(' ')
        if (!emoteargs) return message.channel.send('Provide an emote!')
        const emote = client.emojis.get(emoteargs) || client.emojis.find(e => e.name.toLowerCase().startsWith(emoteargs.toLowerCase()))


        if (!emote) return message.channel.send('Invalid Emoji!')

        const embed = new RichEmbed()
        .setColor('BLUE')
        .setAuthor('Emoji Information')
        .addField('Name', emote.name, true)
        .addField('ID', emote.id, true)
        .addField('Unique ID', `\`<:${emote.name}:${emote.id}>\``)
        .addField('Creation Date', moment.utc(emote.createdAt).format('MM/DD/YYYY'), true)
        .addField('Animated?', emote.animated ? 'Yes' : 'No', true)
        .setFooter(`Emoji Information for: ${emote.id}`)
        .setTimestamp()
        .setThumbnail(emote.url)
        message.channel.send(embed)
        
    }
}