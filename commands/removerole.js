const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tresspasser!!! You are not Premitted to use that command!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Thats a Negative! Suspect Not found.");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Thats a No sir! Please mention a role");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("```Role not Found!```");

  if (!rMember.roles.has(gRole.id)) return message.reply("Negetive Sir they dont have that role.");
  await(rMember.removeRole(gRole.id));
  try {
  await  rMember.send(`Our Appologies sir. ${gRole.name} has been ripped off from you.`)
  }catch(e){
return  message.channel.send(`Affermitive! ${gRole.name}  have been Successfully ripped off from <@${rMember.id}>`);
 }
}
module.exports.help = {
  name: "removerole"
}
