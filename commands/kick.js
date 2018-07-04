const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {
let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if (!kUser) return message.channel.send("Cannot find the user u mentioned, Please Re-Check :smile:");
let kreason = args.join (" ").slice(22);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry_sign:Thats a Negative Private!:no_entry_sign:");
if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mission Accomplished, HOORAH!");

let bicon = bot.user.displayAvatarURL;
let kickEmbed = new Discord.RichEmbed ()
.setDescription ("-=[Kick Detected]=-")
.setColor("#ff9000")
.setThumbnail(bicon)
.addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Reason", kreason)

let kickchannel = message.guild.channels.find(`name`, "misfit-bot-logs");
if (!kickchannel) return message.channel.send(":no_entry_sign:Reports Channel not found :no_entry_sign:, ``Please make a misfit-bot-logs Channel and try again`` ");

message.guild.member(kUser).kick(kreason);
kickchannel.send(kickEmbed);

 
}

module.exports.help = {
  name: "kick"
}
