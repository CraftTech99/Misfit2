const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Cannot find the user u mentioned, Please Re-Check :smile:");
  let reason = args.join (" ").slice(22);

  let ricon = message.guild.iconURL
  let reportEmbed = new Discord.RichEmbed ()
  .setDescription("Reports")
  .setColor("#ce0606")
  .setThumbnail (ricon)
  .addField("Reported User", `${rUser} with ID: ${rUser.id} `)
  .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel )
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let reportschannel = message.guild.channels.find('name', "misfit-bot-logs");
  if (!reportschannel) return message.channel.send(":no_entry_sign:Reports Channel not found :no_entry_sign:, ``Please make a Reports Channel and try again`` ");

   message.delete().catch(O_o=>{});
   reportschannel.send(reportEmbed);
    
  }


module.exports.help = {
  name: "report"
}
