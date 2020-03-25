const { RichEmbed } = require('discord.js');

module.exports = async (client, message) => {

console.log(`I am online as ${client.user.tag} in ${client.guilds.size} guilds and for ${client.users.size} users!`)
client.user.setPresence({
 status: 'online', 
 game: { 
     name: 'Dyno Status', 
     type: 'LISTENING'
 }
});


};