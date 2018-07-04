const Discord = require ("discord.js")

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tresspasser!!! You are not Premitted to use that command!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Thats a Negative! Suspect Not found.");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Thats a No sir! Please mention a role");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("```Role not Found!```");

  if (rMember.roles.has(gRole.id)) return message.reply("Negetive Sir They have the role already.");
  await(rMember.addRole(gRole.id));
  try {
  await  rMember.send(`Affermitive! ${gRole.name} has been Deployed on you.`)
  }catch(e){
return  message.channel.send(`Affermitive! <@${rMember.id}> have been Successfully added to ${gRole.name}`);
 }
}
module.exports.help = {
  name: "addrole"
}
