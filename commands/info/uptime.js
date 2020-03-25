const { RichEmbed } = require('discord.js'); 

module.exports = { 
    name: 'uptime',
    category: 'info',
    aliases: ['up'],
    descriptions: 'Shows the bot\'s uptime.',
    run: (client, message, args) => { 
let rawuptime = client.uptime;
let sseconds = (Math.round(rawuptime / 1000))
let days = Math.floor(Math.round(sseconds / 86400))
let hours = Math.floor(Math.round(sseconds / 3600))
sseconds %= 3600;
let minutes = Math.floor(Math.round(sseconds / 60))
let seconds = sseconds % 60

let embed = new RichEmbed()
.setTitle("Uptime")
.setColor("BLUE")
.setDescription(`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`)
.setFooter(client.user.username, client.user.avatarURL)
message.channel.send(embed);


    }}