
const { RichEmbed } = require('discord.js'); 
const { getMember } = require('../../functions.js'); 
const snekfetch = require('snekfetch');

module.exports = { 
    name: 'hug', 
    description: 'Hugs a user', 
    usage: '<user>', 
    category: 'fun', 
    run: async (client, message, args) => { 
        const member = getMember(message, args.join('')); 
        if (!member) return message.channel.send('I need a member smh.')
        if(message.author.id === member.user.id) return message.channel.send('You cannot hug yourself!')
        const { body } = await snekfetch.get('https://some-random-api.ml/animu/hug')
        const hug = new RichEmbed()
        .setDescription(`<@${message.author.id}> hugged <@${member.id}>`)
        .setColor('#bbaaee')
        .setImage(body.link)
        .setFooter('❤️ Love!')
        .setTimestamp()

        message.channel.send(hug)

    }
}