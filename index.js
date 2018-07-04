const config = require("./config.json");
const Discord = require ("discord.js");
const fs = require ("fs");
const bot = new Discord.Client ({disableEveryone: true});

bot.commands = new Discord.Collection();
//below command to check files in ./commands
fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js")
if (jsfile.length <= 0){
  console.log("Couldnt find commands");
  return;
}


//below command to show the loaded files from ./commands


jsfile.forEach((f, i) =>{
  let props = require (`./commands/${f}`);
  console.log(`${f} Loaded Successfully!`);
  bot.commands.set(props.help.name, props);
});


});


//Playing tag on discord~

bot.on("ready", async () => {
  console.log (`${bot.user.username} is online!`);
  bot.user.setActivity("Roger that! Help Dispatched!", {type:"WATCHING"})
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot,message,args);

//Talking commands from here

if (message.content.startsWith(`${prefix}hello`)){
  return message.channel.send("Hello!");
}
//ADDROLE commands
if (message.content.startsWith(`${prefix}addrole`)){
return;
}
//Remove Role
if (message.content.startsWith(`${prefix}removerole`)){
return;
}
//TEMPMUTE command

if (message.content.startsWith(`${prefix}tempmute`)){
return;
}


//KICK COMMAND

if (message.content.startsWith(`${prefix}kick`)){
return;
}

//Ban Command

if (message.content.startsWith(`${prefix}ban`)){
}


//REPORT COMMAND

if (message.content.startsWith(`${prefix}report`)){
  return;
}




//Misc Commands
let bicon = bot.user.displayAvatarURL;
let ricon = message.guild.iconURL
if (message.content.startsWith(`${prefix}serverinfo`)){

  let sicon = message.guild.iconURL
  let serverembed = new Discord.RichEmbed()
  .setDescription("-=[Server Information]=-")
  .setColor("#0e4eb5")
  .setThumbnail (ricon)
  .addField("Server Name", message.guild.name)
  .addField("Created On", message.guild.createdAt)
  .addField("You Joined on", message.member.joinedAt)
  .addField("Owners", 'CraftTech, _Althia_')
  .addField("Total Members", message.guild.memberCount)

  return message.channel.send(serverembed);
}

if (message.content.startsWith(`${prefix}botinfo`)){

  let botembed = new Discord.RichEmbed()
    .setDescription("-=[Bot Information]=-")
    .setColor("#138205")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Version",'V2.0')
    .addField("Server Count", bot.guilds.size)
    .addField("Bot Owner", 'CraftTech')
    .addField("Owner's Discord", 'Craftec#6739')
    .addField("Date Created", bot.user.createdAt)
    .addField("Deployed on server", 'Misfit MC Faction Server')

    return message.channel.send(botembed);
}
});

bot.login(process.env.BOT_TOKEN)
