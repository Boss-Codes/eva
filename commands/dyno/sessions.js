const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require('../../config.json')
const axios = require('axios'); 

module.exports = {
    name: "sessions",
    category: "dyno",
    aliases: ["s"],
    description: "Shows Dyno session information.",
    run: async (client, message, args) => {
        if(!config.owner.includes(message.author.id)) return; 

        const getInformation = async () => { 
            try { 
                return await axios.get('https://dyno.gg/api/sessions')
            } catch (error) { 
                console.error(error)
            }
        }

        const sessionInfoVar = await getInformation(); 
        const sessionInfo = sessionInfoVar.data

        const embed = new RichEmbed()
        .setTitle('<:dyno:692216098820718602> Session Data')
        .addField('Reccomend Shards', `${sessionInfo["Recommended Shards"]}`, true)
        .addField('Session Limit', `${sessionInfo["Session Limit"]}`, true)
        .addField('Session Remaining', `${sessionInfo["Session Remaining"]}`, true)
        .addField('Reset After', `${sessionInfo["Reset After"]}`, true)
        .addField('Reset After Date', `${sessionInfo["Reset After Date"]}`, true)
        .setColor('#337fd5')
        .setFooter(`Timestamp • ${sessionInfo["Reset After Date"]}`)

        message.channel.send(embed)


    }
}
