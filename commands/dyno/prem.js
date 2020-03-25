const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "prem",
    category: "dyno",
    description: "Tells you the shard and cluster that a Dyno Premium server is on.",
    usage: '<server id>',
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
      
        if (!args.join(' ')) return message.channel.send('Provide a server ID!')
        const cluster = Math.floor(((args.join(' ')/ 4194304) % 20)/1)
        const shard = Math.floor((args.join(' ')/ 4194304) % 20)
        const cdata = status.data.premium.statuses[cluster].result

       
        const embed = new RichEmbed()
        .setTitle('<:dyno:692216098820718602> Dyno Status')
        .addField('Server ID', args.join(' '))
        .addField('Server', `${cdata.server}`, true)
        .addField('Cluster', cluster, true)
        .addField('Shard', shard, true)
        .addField('Connected Shards', `${cdata.connectedCount}/8`, true)
        .addField('Unavailable Shards', `${cdata.unavailableCount}/8`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Last Started', `${cdata.started}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)

       if(cdata.unavailableCount === 0) { 
           embed.setColor('#01E6CE')
           .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
       }
   
    if (cdata.unavailableCount === 1) { 
        embed.setColor('#FF414B')
        embed.setThumbnail("https://cdn.discordapp.com/attachments/679073762590589095/692225660802039889/unknown.png")
    }

        message.channel.send(embed)
    
    }
}