const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "alpha",
    category: "dyno",
    aliases: ["a"],
    description: "Tells you the shard and cluster that a Dyno Alpha server is on.",
    usage: '<server id>',
    run: async (client, message, args) => {
        if(!config.whitelisted.includes(message.author.id)) return; 

        const getStatus = async () => { 
            try { 
                return await axios.get('https://staff.dyno.gg/api/status')
            } catch (error) { 
                console.error(error)
            }
        }
        
        const status = await getStatus()
      
        if (!args.join(' ')) return message.channel.send('Provide a server ID!')
        const cluster = Math.floor(((args.join(' ')/ 4194304) % 2)/1)
        const shard = Math.floor((args.join(' ')/ 4194304) % 2)
        const cdata = status.data.alpha.statuses[cluster].result

           
        const embed = new RichEmbed()
        .addField('Server ID', args.join(' '))
        .addField('Server', `${cdata.server}`, true)
        .addField('Cluster', cluster, true)
        .addField('Shard', shard, true)
        .addField('Connected Shards', `${cdata.connectedCount}/1`, true)
        .addField('Disconnected Guilds', `${cdata.unavailableCount}/${cdata.guildCount}`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Last Started', `${cdata.started}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)

        if(cdata.unavailableCount === 0) { 
            embed.setColor('#01E6CE')
            embed.setAuthor(`Alpha Status`, 'https://color.dyno.gg/color/01E6CE/80x80.png')

        }
        if (cdata.unavailableCount > 35) { 
            embed.setColor('#FF414B')
            embed.setAuthor(`Alpha Status`, 'https://color.dyno.gg/color/FF414B/80x80.png')

        }

        message.channel.send(embed)
    
    }
}