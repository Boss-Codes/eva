const { RichEmbed } = require('discord.js'); 
let giveMeAJoke = require('give-me-a-joke');
module.exports = { 
    name: 'joke', 
    description: 'Sends a random joke', 
    category: 'fun', 
    run: async (client, message, args) => { 
       giveMeAJoke.getRandomDadJoke(function(joke){ 
            message.channel.send(joke)
       })
    }
}