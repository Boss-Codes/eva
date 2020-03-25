const { getMember } = require('../../functions.js'); 
module.exports = { 
    name: 'id', 
    description: 'Displays a user\'s ID', 
    category: 'info', 
    usage: '[username]',
    run: async (client, message, args) => { 

        const member = getMember(message, args.join('')); 
        message.channel.send(`${member.user.username}'s ID is ${member.id}`)
    }
}