
module.exports = { 
    name: 'big', 
    description: 'Displays a big emoji', 
    category: 'fun', 
    usage: '<emoji>',
    aliases: ['big-emote'],
    run: async (client, message, args) => { 

        const emoteargs = args.join(' ')
        if (!emoteargs) return message.channel.send('Provide an emote!')
        const emote = client.emojis.get(emoteargs) || client.emojis.find(e => e.name.toLowerCase().startsWith(emoteargs.toLowerCase()))


        if (!emote) return message.channel.send('Invalid Emoji!')

        message.channel.send({ files: [emote.url] });
    }
}