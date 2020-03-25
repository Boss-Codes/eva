
const { RichEmbed } = require('discord.js'); 

module.exports = { 
    name: '8ball', 
    description: 'Ask the magic 8ball anything', 
    category: 'fun', 
    usage: '<question>', 
    run: async (client, message, args) => { 
        if (!args[1]) return message.channel.send('Please enter a question with one or more words.')
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];
        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(' '); 
        
        let ballembed = new RichEmbed()
        .setAuthor('🎱 8-ball 🎱 ')
        .setColor('#00ff00')
        .addField('Question', question)
        .addField('Answer', replies[result])
        .setFooter(`${client.user.username}' 8ball`)
        .setTimestamp()

        message.channel.send(ballembed); 

    }
}