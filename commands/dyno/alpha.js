const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "alpha",
    category: "dyno",
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
        .setTitle('Dyno Cluster/Shard Information')
        .addField('Server ID', args.join(' '))
        .addField('Server', `${cdata.server}`)
        .addField('Cluster', cluster)
        .addField('Shard', shard)
        .setColor('BLUE')
        .setFooter(`Uptime: ${cdata.uptime}`)
        .setTimestamp()

        message.channel.send(embed)
    
    }
}