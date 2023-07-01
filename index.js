require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({
	intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent
	]
});

client.on("ready", ()=>{
	const all_commands = require("./register-commands.js"); //Register / commands_list
	client.commands = new Collection(all_commands);
	console.log("Bot is online");
});

client.on("interactionCreate", async(interaction)=>{
	if(!interaction.isChatInputCommand()) return;

	const command_to_exec = client.commands.get(interaction.commandName);

	if(command_to_exec == undefined) return;

	try{
		await command_to_exec.execute(interaction, client);
	}
	catch(error){
		console.log(error);
		interaction.reply("Some error occured X(\nTry again");
	}
	
});

client.login(process.env.TOKEN);
