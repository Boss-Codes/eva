const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "cluster",
    category: "dyno",
    description: "Gives all information on a specific cluster.",
    run: async (client, message, args) => {
        if(!config.whitelisted.includes(message.author.id)) return; 

        const getStatus = async () => { 
            try { 
                return await axios.get('https://dyno.gg/api/status')
            } catch (error) { 
                console.error(error)
            }
        }
        
        const status = await getStatus()
      
        const cluster = args.join(' ')
        if(!cluster) return message.channel.send('Provide a cluster')
        const cdata = status.data.prod.statuses[cluster].result

        const embed = new RichEmbed()
        .setTitle('Dyno Cluster Information')
        .addField('Server', `${cdata.server}`, true)
        .addField('Cluster', cluster, true)
        .addField('Shards', `${cdata.shards}`, true)
        .addField('Connected Shards', `${cdata.connectedCount}/8`, true)
        .addField('Disconnected Shards', `${cdata.unavailableCount}`, true)
        .addField('Guilds', `${cdata.guildCount}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Cluster Started', `${cdata.started}`, true)
        .setColor('BLUE')
        .setTimestamp()

        message.channel.send(embed)
    
    }
}