const { RichEmbed } = require('discord.js'); 
const { getMember, formatDate } = require('../../functions.js'); 

module.exports = { 
    name: 'whois',
    aliases: ['userinfo', 'w'], 
    descriptions: 'Shows information about a user.',
    category: 'info',
    usage: '[username | id | mention]',
    run: (client, message, args) => { 
        const member = getMember(message, args.join('')); 
        const joined = formatDate(member.joinedAt);
        const roles = member.roles 
        .filter(r => r.id !== message.guild.id)
        .map(r => r).join(', ') || 'None'; 

        function checkUserPermission(guild, member) { 
            const arrayOfPerms = []; 
            if (member.hasPermission('ADMINISTRATOR')) { 
                arrayOfPerms.push('Administrator')
            }
            if (member.hasPermission('MANAGE_GUILD')) { 
                arrayOfPerms.push('Manage Server')
            }
            if (member.hasPermission('MANAGE_ROLES')) { 
                arrayOfPerms.push('Manage Roles')
            }
            if (member.hasPermission('MANAGE_CHANNELS')) { 
                arrayOfPerms.push('Manage Channels')
            }
            if (member.hasPermission('VIEW_AUDIT_LOG')) { 
                arrayOfPerms.push('View Audit Logs')
            }
            if (member.hasPermission('KICK_MEMBERS')) { 
                arrayOfPerms.push('Kick Members')
            }
            if (member.hasPermission('BAN_MEMBERS')) { 
                arrayOfPerms.push('Ban Members')
            }
            if (member.hasPermission('MANAGE_NICKNAMES')) { 
                arrayOfPerms.push('Manage Nicknames')
            }
            if (member.hasPermission('MANAGE_EMOJIS')) { 
                arrayOfPerms.push('Manage Emojis')
            }
            if (member.hasPermission('MANAGE_WEBHOOKS')) { 
                arrayOfPerms.push('Manage Webhooks')
            }
            if (member.hasPermission('MANAGE_MESSAGES')) { 
                arrayOfPerms.push('Manage Messages')
            }
            if (member.hasPermission('MENTION_EVERYONE')) { 
                arrayOfPerms.push('Mention Everyone')
            }
            return arrayOfPerms;
        }
        function staffFunction(member) { 
            var staffArray = []; 
            if (member.id == '344954369285947392') { 
                staffArray.push('Developer, Certified JS Retard, Wuper Wednesday Enthusiast')
            }
            if (member.id == '489989456175300618') { 
                staffArray.push('Potato, Wuper Wednesday Guy!') 
            }
            if (member.id == '659605081238536192') { 
                staffArray.push('The OG Team Member')
            }
            if (member.id == '253233185800847361') { 
                staffArray.push('Wuper Wednesday Enthusiast, Egg, Sally Owner, Lima Beans')
            }
            return staffArray
        }
 /*if (toKick.roles.has(modrole)) { 
                return message.channel.send('<:No:625122928849059860> That user is a moderator/administrator, I cannot kick them.')
            }*/
        aPerms = void 0;
        if (member.hasPermission('MANAGE_MESSAGES')) { 
            aPerms = 'Server Moderator'
        }
        if (member.hasPermission('MANAGE_GUILD')) { 
            aPerms = 'Server Manager'
        }
        if (member.hasPermission('ADMINISTRATOR')) { 
            aPerms = 'Server Admin'
        }
        if (member.id === message.guild.ownerID) { 
            aPerms = 'Server Owner'
        }

        const game = member.user.presence.game !== null ? member.user.presence.game : 'None'

        const created = formatDate(member.user.createdAt); 

        const embed = new RichEmbed()
        embed.setThumbnail(member.user.displayAvatarURL)
        embed.setFooter(`ID: ${member.id}`)
        embed.setAuthor(member.user.tag, member.user.displayAvatarURL)
        embed.setTimestamp()
        embed.addField('Status', member.user.presence.status, true)
        embed.addField('Joined', `${joined}`, true)
        embed.addField('Registered', `${created}`, true)
        embed.addField('Game', `${game}`, true)
        embed.addField('Roles [' + (member.roles.size - 1) + ']', '' + `${roles}`);
        embed.setColor('BLUE')
        if (checkUserPermission(message.guild, member).length > 0) {            
            embed.addField('Key Permissions', '' + checkUserPermission(message.guild, member).join(', '));
          }
          if (aPerms) {
            embed.addField('Acknowledgements', aPerms);
          }
          if (staffFunction(member).length) {
            embed.addField('Special Acknowledgements', '' + staffFunction(member).join(', '));
          }
        message.channel.send(embed);
    }

}