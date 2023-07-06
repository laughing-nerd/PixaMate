require("dotenv").config();
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");

const client = new Client({
	intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent
	]
});

client.on("ready", ()=>{
	client.user.setPresence({
		activities: [{ name: `/help`, type: ActivityType.Listening }],
	});
	const all_commands = require("./register-commands.js"); //Register / commands_list
	
	client.commands = new Collection(all_commands);
	client.create_queue = [];

	console.log("Bot is online");
});

client.on("interactionCreate", async(interaction)=>{
	if(!interaction.isChatInputCommand()) return;

	const command_to_exec = client.commands.get(interaction.commandName);

	if(command_to_exec == undefined) return;

	try{
		if(command_to_exec.dev)
		{
			if(interaction.user.id === '812753087545737218')
				await command_to_exec.execute(interaction, client);
			else
				interaction.reply({ content: "Sorry, but this command is under development. It will be available soon" });
		}
		else
			await command_to_exec.execute(interaction, client);
	}
	catch(error){
		console.log(error);
		interaction.reply("Some error occured X(\nTry again");
	}
	
});

client.login(process.env.TOKEN);
