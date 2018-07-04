const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Cannot find the user u mentioned, Please Re-Check :smile:");
  let breason = args.join (" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":no_entry_sign:Thats a Negative Private!:no_entry_sign:");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Roger That! Enemy Neutralized! ");
  let bicon = bot.user.displayAvatarURL;
  let banEmbed = new Discord.RichEmbed ()
  .setDescription ("-=[Ban Detected]=-")
  .setColor("#ce0606")
  .setThumbnail(bicon)
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Time", message.createdAt)
  .addField("Reason", breason)

  let banchannel = message.guild.channels.find(`name`, "misfit-bot-logs");
  if (!banchannel) return message.channel.send(":no_entry_sign:Reports Channel not found :no_entry_sign:, ``Please make a misfit-bot-logs Channel and try again`` ");

  message.guild.member(bUser).ban(breason);
  banchannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
