const { RichEmbed } = require('discord.js'); 
const moment = require('moment')
module.exports = { 
    name: 'channel', 
    aliases: ['channel-info'], 
    description: 'Get information on a channel.', 
    category: 'info', 
    usage: '<channel>', 
    run: async (client, message, args) => { 

        const types = { 
            dm: 'DM', 
            group: 'Group DM', 
            text: 'Text Channel', 
            voice: 'Voice Channel', 
            category: 'Category', 
            unknown: 'Uknown'
        };

        const channelname = args.join(' ')
        if (!channelname) return message.channel.send('Provide a channel!')
        const channel = client.channels.get(channelname) || client.channels.find(c => c.name.toLowerCase().startsWith(channelname.toLowerCase()))


        if (!channel) return message.channel.send('Invalid channel! D:')

        const embed = new RichEmbed()
        .setColor('BLUE')
        .setAuthor('Channel Information!')
        .addField('Name', channel.type === 'dm' ? `@${channel.recipient.username}` : channel.name, true)
        .addField('ID', channel.id, true)
        .addField('Mention', `<#${channel.id}>`, true)
        .addField('NSFW', channel.nsfw ? 'Yes' : 'No', true)
        .addField('Category', channel.parent ? channel.parent.name : 'None', true)
        .addField('Type', types[channel.type], true)
        .addField('Creation Date', moment.utc(channel.createdAt).format('MM/DD/YYYY', true))
        .addField('Topic', channel.topic || 'None', true)
        .setFooter(`Channel Information for: ${channel.id}`)
        .setTimestamp()
        .setThumbnail(client.user.avatarURL)
        message.channel.send(embed)
        
    }
}