require('dotenv').config();
const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, createMessageComponentCollector, ComponentType } = require("discord.js");
const axios = require("axios");

const generateImage = async(interaction, api_options)=>{
		try {
			const embed1 = new EmbedBuilder().setColor("ff0000").setImage("https://media.tenor.com/C3EjExGGzrIAAAAM/kuru-kuru-kururin.gif");
			interaction.reply({ content: "**Creating an image. Please wait...**", embeds: [embed1] });

			const response = await axios.request(api_options);
			const image_url = response.data.openai.items[0].image_resource_url;
			if(image_url)
			{
				interaction.editReply({ content: "Done!", embeds:[] });
				let randomColor = Math.floor(Math.random() * 16777215).toString(16);
				randomColor = randomColor.padEnd(6, '0');
				const embed = new EmbedBuilder().setColor(randomColor).setDescription(`You asked for: ${api_options.data.text}`).setImage(image_url);
				await interaction.followUp({ embeds: [embed] });
			}

		} catch (error) {
			console.log(error);
			interaction.reply("Something went wrong X(\nContact the developer for more info");
		}
}

module.exports = {
	data:{
		name: "create",
		description: "Generates an image based on your prompt",
		options: [
			{
				name: "prompt",
				description: "Describe what you want me to create",
				required: true,
				type: ApplicationCommandOptionType.String
			}
		]
	},
	execute: async(interaction)=>{
		const prompt = interaction.options.get("prompt").value;
		const api_options = {
			method: 'POST',
			url: 'https://api.edenai.run/v2/image/generation',
			headers: {
				authorization: `Authorization: Bearer ${process.env.API_TOKEN}`
			},
			data: {
				providers: 'openai',
				text: prompt,
				resolution : '512x512',
			}
		};
		await generateImage(interaction, api_options);
	}
}
