require("dotenv").config();
const { REST, Routes, Collection } = require("discord.js");
const fs = require("fs");

const commands_list = [];
const commands = new Map();

const files = fs.readdirSync("commands");
for(const file of files)
{
	if(file.endsWith('.js'))
	{
		const command = require(`./commands/${file}`);
		commands_list.push(command.data);
		commands.set(command.data.name, command);
	}
}

const rest = new REST().setToken(process.env.TOKEN);

//Registering commands
(async()=>{
	try {
		console.log("Registering / commands...");
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands_list }
		)
		console.log("Finished registering / commands");
	} catch (error) {
		console.log(error);
	}
})();

module.exports = commands;
