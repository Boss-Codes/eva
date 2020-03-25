const { RichEmbed } = require('discord.js'); 

module.exports = { 
    name: 'roleinfo', 
    description: 'Shows information about a role.',
    category: 'info', 
    usage: '<rolename | role id>', 
    run: async (client, message, args) => { 

            if (!args[0]) return message.channel.send('<:No:625122928849059860> You must provide a role!')
            let roleM = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(r => r.name.toLowerCase() == args.join(' ').toLocaleLowerCase());
            if (!roleM) return message.channel.send('<:No:625122928849059860> Cannot find that role!')


            function checkRolePermission(guild, roleM) {
              const arrayOfPerms = [];
              if (roleM.hasPermission('ADMINISTRATOR')) {
                arrayOfPerms.push('Administrator');
              }
              if (roleM.hasPermission('MANAGE_GUILD')) {
                arrayOfPerms.push('Manage Server');
              }
              if (roleM.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
                arrayOfPerms.push('Manage Roles');
              }
              if (roleM.hasPermission('MANAGE_CHANNELS')) {
                arrayOfPerms.push('Manage Channels');
              }
              if (roleM.hasPermission('VIEW_AUDIT_LOG')) {
                arrayOfPerms.push('View Audit Logs');
              }
              if (roleM.hasPermission('KICK_MEMBERS')) {
                arrayOfPerms.push('Kick Members');
              }
              if (roleM.hasPermission('BAN_MEMBERS')) {
                arrayOfPerms.push('Ban Members');
              }
              if (roleM.hasPermission('MANAGE_NICKNAMES')) {
                arrayOfPerms.push('Manage Nicknames');
              }
              if (roleM.hasPermission('MANAGE_EMOJIS')) {
                arrayOfPerms.push('Manage Emojis');
              }
              if (roleM.hasPermission('MANAGE_WEBHOOKS')) {
                arrayOfPerms.push('Manage Webhooks');
              }
              if (roleM.hasPermission('MANAGE_MESSAGES')) {
                arrayOfPerms.push('Manage Messages');
              }
              if (roleM.hasPermission('MENTION_EVERYONE')) {
                arrayOfPerms.push('Mention Everyone');
              }
        
        
              return arrayOfPerms;
            }
        
          
            const embed = new RichEmbed();
        
            //embed.setAuthor(client.user.username, client.user.avatarURL);
            embed.setTitle(`Role | **${roleM.name}**`);
            embed.setColor(`${roleM.hexColor}`);
            embed.addField('Members', `${roleM.members.size}`, true);
            embed.addField('Color', `${roleM.hexColor.toUpperCase()}`, true);
            embed.addField('Position', `${roleM.position}`, true);
            embed.addField('Mention', `\`\`<@&${roleM.id}>\`\``, true);
            if (roleM.hoist === false) {
              embed.addField('Hoisted', 'No', true);
            }
            else {
              embed.addField('Hoisted', 'Yes', true);
            }
            if (roleM.mentionable == false) {
              embed.addField('Mentionable', 'No', true);
            }
            else {
              embed.addField('Mentionable', 'Yes', true);
            }
            if (roleM.managed == true) {
              embed.addField('Managed', 'Yes', true);
            }
            if (checkRolePermission(message.guild, roleM).length > 0) {
              embed.addField('Key Permissions', `${checkRolePermission(message.guild, roleM).join(', ')}`, true);
            }
            embed.addField('Created At', `${roleM.createdAt.toLocaleString('en-US')}`, true);
            embed.setFooter(`${client.user.username} | Role ID: ${roleM.id}`, client.user.avatarURL);
            embed.setTimestamp();
            
            message.channel.send(embed);
        
        
        
        
        }
    }