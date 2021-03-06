const { RichEmbed, WebhookClient } = require('discord.js');
const moment = require('moment'); 

module.exports = async (client, message) => { 
    
    if (message.author.bot) return; 
    if (!message.guild) return; 
    let prefix = '!'
    if (!message.content.startsWith(prefix)) return; 

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase(); 

    if (cmd.length === 0) return; 

    let command = client.commands.get(cmd); 
    if(!command) command = client.commands.get(client.aliases.get(cmd)); 

    if (!command) return; 

    if (command) { 
       let datem = moment.utc(Date.now()).format('MM/DD/YYYY')
       let today = new Date()
       let timevar = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
       let time = moment(timevar, "HH:mm:ss").format("hh:mm A");

        console.log(`Command: ${command.name}\nRan by: ${message.author.tag} (${message.author.id})\nIn guild: ${message.guild.name} (${message.guild.id})\nIn channel: ${message.channel.name} (${message.channel.id})\nDate: ${datem}\nAt: ${time}`)
        command.run(client, message, args)
    }
};

