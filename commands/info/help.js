const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {
        if(!config.whitelisted.includes(message.author.id)) return; 
        
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}
function getAll(client, message) {
    const embed = new RichEmbed()
        .setColor("BLUE")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
             .map(cmd => `\`${cmd.name}\``)
            .join(",");
    }

  
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);
 
        const size = client.commands.size
    embed.setTitle(`${client.user.username} | Help`)
    embed.setDescription('Use `e!help [command]` to get information on a specfic command.\n\nPrefix: e!')
    embed.setThumbnail(client.user.avatarURL)
    embed.setFooter(`${client.user.username} | ${size} total commands`, client.user.ava)
    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }
 
    embed.setTitle('Eva | Help')
    embed.setThumbnail(client.user.avatarURL)
    embed.setColor('BLUE')

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}