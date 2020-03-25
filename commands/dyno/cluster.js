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

            

        }
        if(args[0] === 'prem') { 
            cdata = status.data.premium.statuses[cluster].result
           
               
        }
        if(args[0] === 'alpha') { 
            cdata = status.data.alpha.statuses[cluster].result
           

        }

        const embed = new RichEmbed()
        .setTitle(`<:dyno:692216098820718602> ${cdata.server}-${cdata.clusterId}`)
        .addField('Shard Count', `${cdata.shardCount}`, true)
        if(args[0] === 'prod') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/8`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/8`, true)


        }
        if(args[0] === 'prem') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/1`, true)


        }
        if(args[0] === 'alpha') { 
            embed.addField('Connected Shards', `${cdata.connectedCount}/1`, true)
            embed.addField('Disconnected Shards', `${cdata.unavailableCount}/1`, true)


        }
        embed.addField('Guilds', `${cdata.guildCount}`, true)
        .addField('Voice Connections', `${cdata.voiceConnections}`, true)
        .addField('Uptime', `${cdata.uptime}`, true)
        .addField('Last Started', `${cdata.started}`, true)
        .setFooter(`Shards: ${cdata.shards}`)
       

        // if the clusters are disconnected per service
        if(args[0] === 'prod') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
            }
            if(cdata.unavailableCount === 1) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 2) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 3) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 4) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 5) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 6) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
         if(cdata.unavailableCount === 7) { 
             embed.setColor('#FF9B00')
             .setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
         }
        
         if (cdata.unavailableCount === 8) { 

             embed.setColor('#FF414B')
             embed.setThumbnail("https://cdn.discordapp.com/attachments/679073762590589095/692225660802039889/unknown.png")
         }
            

            console.log(cdata)
        }
        if(args[0] === 'prem') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                embed.setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
            }
            if (cdata.unavailableCount === 1) { 
                embed.setColor('#FF414B')
                embed.setThumbnail("https://cdn.discordapp.com/attachments/679073762590589095/692225660802039889/unknown.png")
            }
               
        }
        if(args[0] === 'alpha') { 
            if(cdata.unavailableCount === 0) { 
                embed.setColor('#01E6CE')
                embed.setThumbnail('https://cdn.discordapp.com/attachments/661656555447648286/692216659825655898/unknown.png')
            }
            if (cdata.unavailableCount === 1) { 
                embed.setColor('#FF414B')
                embed.setThumbnail("https://cdn.discordapp.com/attachments/679073762590589095/692225660802039889/unknown.png")
            }

        }



        message.channel.send(embed)
    
    }
}