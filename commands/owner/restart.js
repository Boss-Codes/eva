const { RichEmbed } = require('discord.js'); 

module.exports = {
    name: "restart",
    aliases: ["rs", "r"],
    category: "owner",
    description: "Restarts the bot.",
    run: (client, message, args) => {
        if (message.author.id !== '344954369285947392') return;

        message.channel.send('Restarting now.').then(message => {
            console.log(`Restart started by ${message.author.tag} (${message.author.id}).`);

            client.destroy(client.token);
            console.log('Client logged out due to restart.');

            client.login(process.env.TOKEN);
            console.log('Successfully restarted.');
            return message.edit('Restarted.');

        });
    }
};