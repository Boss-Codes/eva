module.exports = {
    name: "eval",
    aliases: ["e"],
    category: "owner",
    description: "Evaluates JavaScript Code.",
    usage: "<code>", 
      run: (client, message, args) => { 
    const fs = require('fs');
    const wuper = 'Super duper wuper'
    const boss = 'Boss is a bad dev!'
    const db = require('quick.db');
    const discord = require('discord.js');
    const Discord = require('discord.js');
    const hi = 'Hi im fred'
    if(message.author.id !== '344954369285947392') return; 
    const content = message.content.split(' ').slice(1).join(' ');
            const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then(output => { 
            if(typeof output !== 'string') output = require('util').inspect(output, { 
                depth: 0
            });
            if (output.includes(client.token)) output = output.replace(client.token, "Sorry sir/ma'am, I cannot do that."); 
            if (output.length > 1990) console.log(output), output = 'The result of this eval is over 2000 characters long and cannot be sent, check the console for the output.'

            return message.channel.send(output, {code: 'js'}); 
            }).catch(err => { 
                console.error(err); 
                err = err.toString(); 

                if (err.includes(client.token)) err = err.replace(client.token, "So sorry sir/ma'am, cannot give yout that information."); 

                return message.channel.send(err, {code: 'js'})
            });
      }

}