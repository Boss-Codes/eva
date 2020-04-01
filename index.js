const { Client, Collection } = require('discord.js'); 
const { stripIndents } = require('common-tags'); 
const { config } = require('dotenv'); 
const fs = require('fs')
const client = new Client({
    disableEveryone: true, 
    fetchAllMembers: true, 
    messageCacheMaxSize: 100, 
    disabledEvents: [
        'channelCreate', 
        'channelDelete', 
        'channelPinsUpdate', 
        'clientUserGuildSettingsUpdate', 
        'clientUserSettingsUpdate', 
        'debug', 
        'emojiCreate', 
        'emojiDelete', 
        'guildBanAdd', 
        'guildBanRemove', 
        'guildIntegrationsUpdate', 
        'guildMemberAdd', 
        'guildMemberRemove', 
        'guildMembersChunk', 
        'guildMemberSpeaking', 
        'guildMemberUpdate', 
        'guildUnavailable',
        'guildUpdate',
        'invalidated', 
        'inviteCreate', 
        'inviteDelete', 
        'messageDelete', 
        'messageDeleteBulk', 
        'messageReactionAdd', 
        'messageReactionRemove', 
        'messageReactionRemoveAll', 
        'messageReactionRemoveEmoji', 
        'messageUpdate', 
        'rateLimit', 
        'roleCreate', 
        'roleUpdate', 
        'roleDelete', 
        'shardDisconnect', 
        'shardError', 
        'shardReady', 
        'shardReconnecting', 
        'shardResume',
        'typingStart', 
        'userUpdate', 
        'voiceStateUpdate', 
        'warn', 
        'webhookUpdate'   
        ]
}); 

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection(); 

client.categories = fs.readdirSync('./commands')
client.eventCategories = fs.readdirSync('./events'); 

config({
    path: __dirname + "/.env"
}); 

['command', 'event'].forEach(handler => { 
    require(`./handlers/${handler}`)(client); 
}); 

client.login(process.env.TOKEN); 
