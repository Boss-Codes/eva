const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "cluster",
    category: "dyno",
    description: "Gives all information on a specific cluster.",
    usage: '\n`!cluster prod [cluster id]` for prod cluster information\n\`!cluster prem [cluser id]` for premium cluster information\n\`!cluster alpha [cluster id]` for alpha cluster information',
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
      
        const cluster = args[1];
        if(!cluster) return message.channel.send('Provide a cluster')

        if(args[0] === 'prod') { 
            cdata = status.data.prod.statuses[cluster].result
    

            console.log(cdata)
        }
        if(args[0] === 'prem') { 
            cdata = status.data.premium.statuses[cluster].result
    
        }
        if(args[0] === 'alpha') { 
            cdata = status.data.alpha.statuses[cluster].result
    

        }

        const embed = new RichEmbed()
        .setTitle('Dyno Cluster Information')
        .addField('Server', `${cdata.server}`, true)
        .addField('Cluster', cluster, true)
        .addField('Shards', `${cdata.shards}`, true)
        .addField('Guilds', `${cdata.guildCount}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Cluster Started', `${cdata.started}`, true)
        .setColor('BLUE')
        .setTimestamp()
       
        if(args[0] === 'prod') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/8`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/8`, true)

            console.log(cdata)
        }
        if(args[0] === 'prem') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/1`, true)


        }
        if(args[0] === 'alpha') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/1`, true)


        }

        message.channel.send(embed)
    
    }
}