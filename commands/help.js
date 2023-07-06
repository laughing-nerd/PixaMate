const { EmbedBuilder } = require("discord.js");

module.exports = {
	dev: false,
	data: {
		name: "help",
		description: "Help command"
	},
	execute: async(interaction, client)=>{
		const command_list = [];
		for (const [key, value] of client.commands){
			command_list.push({
				name: `/${key}`,
				value: value.data.description
			});
		}

		const desc = "Hi there:sparkles:  I am PixaMate and I can use my skills to create art for you based on your request:grin:  But I can only create upto 150 images for you since my developer doesn't pay me enough for this job :sweat_smile:\nAnyway, here are my commands. Feel free to use them as much as you like";
		const embed = new EmbedBuilder()
		.setColor("ff0000")
		.setTitle("PixaMate help")
		.setDescription(desc)
		.addFields(command_list);
		interaction.reply({ embeds: [embed] });
	}
}
