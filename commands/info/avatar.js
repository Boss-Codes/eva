
const { RichEmbed } = require('discord.js'); 
const { getMember } = require('../../functions.js'); 

module.exports = { 
    name: 'avatar', 
    description: 'Gets a users or your avatar.', 
    category: 'info',
    aliases: ['av'], 
    usage: ['username | id | mention'], 
    run: (client, message, args) => { 
        const member = getMember(message, args.join(' ')); 

        const embed = new RichEmbed()
        .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
        .setColor(member.displayHexColor)
        .setImage(member.user.avatarURL)

        message.channel.send(embed);
    }
}