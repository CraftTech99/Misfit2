const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Thats a negative sarge mention the correct suspect!.");
  let tmreason = args.join (" ").slice(22);
  if (!tmreason) return message.reply("Thats a negative! add a reason please!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");

  let muterole = message.guild.roles.find(`name`, "muted");


  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
let mutetime = args[1];
  if(!mutetime) return message.reply("Thats a negative sir! I need a timelimit to mute him.");

  await(tomute.addRole(muterole.id));
  message.reply(`Roger that! <@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

//end of module
}

module.exports.help = {
  name: "tempmute"
}
