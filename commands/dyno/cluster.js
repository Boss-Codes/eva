const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "cluster",
    category: "dyno",
    aliases: ["c"],
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

            

        }
        if(args[0] === 'prem') { 
            cdata = status.data.premium.statuses[cluster].result
           
               
        }
        if(args[0] === 'alpha') { 
            cdata = status.data.alpha.statuses[cluster].result
           

        }

        const embed = new RichEmbed()
        .addField('Shard Count', `${cdata.shardCount}`, true)
        if(args[0] === 'prod') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/8`, true)
            embed.addField('Disconnected Guilds', `${cdata.unavailableCount}/${cdata.guildCount}`, true)


        }
        if(args[0] === 'prem') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Guilds', `${cdata.unavailableCount}/${cdata.guildCount}`, true)

        }
        if(args[0] === 'alpha') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Guilds', `${cdata.unavailableCount}/${cdata.guildCount}`, true)

        }
        embed.addField('Connected Guilds', `${cdata.guildCount}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Last Started', `${cdata.started}`, true)
        .setFooter(`Shards: ${cdata.shards}`)
       

        // if the clusters are disconnected per service
        if(args[0] === 'prod') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/01E6CE/80x80.png')
            }
            if(cdata.unavailableCount > 100) { 
             embed.setColor('#FF9B00')
             embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/FF9B00/80x80.png')

         }
        
         if (cdata.unavailableCount > 2500) { 

             embed.setColor('#FF414B')
             embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/FF414B/80x80.png')

         }
            

        }
        if(args[0] === 'prem') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/01E6CE/80x80.png')

            }
            if (cdata.unavailableCount > 100) { 
                embed.setColor('#FF414B')
                embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/FF414B/80x80.png')
            }
               
        }
        if(args[0] === 'alpha') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/01E6CE/80x80.png')

            }
            if (cdata.unavailableCount > 35) { 
                embed.setColor('#FF414B')
                embed.setAuthor(`${cdata.server}-${cdata.clusterId}`, 'https://color.dyno.gg/color/FF414B/80x80.png')

            }

        }



        message.channel.send(embed)
    
    }
}