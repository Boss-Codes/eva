const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "prod",
    category: "dyno",
    description: "Tells you the shard and cluster that a Dyno server is on.",
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
        const cluster = Math.floor(((args.join(' ')/ 4194304) % 1536.00)/8)
        const shard = Math.floor((args.join(' ')/ 4194304) % 1536)
        const cdata = status.data.prod.statuses[cluster].result

        const embed = new RichEmbed()
        .setTitle('<:dyno:692216098820718602> Dyno Status')
        .addField('Server ID', args.join(' '), true)
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
      
       let count = 0;
       if (cdata.unavailableCount)(count +1) 

       if (count = 0) { 
           embed.setColor('#01E6CE')
           embed.setThumbnail("https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png")
       }
       if (count > 0) { 
        embed.setColor('#FF9B00')
        embed.setThumbnail("https://cdn.discordapp.com/attachments/661656555447648286/692216732823322674/unknown.png")
    }
    if (count > 7) { 
        embed.setColor('#FF414B')
        embed.setThumbnail("https://cdn.discordapp.com/attachments/661656555447648286/692216851308216340/unknown.png")
    }

       

       
       
        message.channel.send(embed)

        
    
    }
}