require('dotenv').config();
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
	dev: false,
	data: {
		name: "create",
		description: "Generates an image based on your prompt",
		options: [
			{
				name: "prompt",
				description: "Describe what you want me to create",
				required: true,
				type: ApplicationCommandOptionType.String
			},
		]
	},
	execute: async (interaction, client) => {
		try {

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
					resolution: '512x512',
				}
			};

			client.create_queue.push(interaction);
			if (client.create_queue.length == 1) {
				const embed1 = new EmbedBuilder().setColor("ff0000").setImage("https://media.tenor.com/C3EjExGGzrIAAAAM/kuru-kuru-kururin.gif");
				interaction.reply({ content: "**Creating an image. Please wait...**", embeds: [embed1] });

				const response = await axios.request(api_options);
				if (response.data.openai.status == 'fail')
					interaction.followUp("Oops! 😬 Sorry, but I can't show you the requested image. There's some sensitive data in there");
				else {

					const image_url = response.data.openai.items[0].image_resource_url;
					if (image_url) {
						interaction.editReply({ content: "Done!", embeds: [] });
						let randomColor = Math.floor(Math.random() * 16777215).toString(16);
						randomColor = randomColor.padEnd(6, '0');
						const embed = new EmbedBuilder().setColor(randomColor).setDescription(`You asked for: ${api_options.data.text}`).setImage(image_url);
						await interaction.followUp({ embeds: [embed] });
					}
					client.create_queue.shift();
				}
			}
			else return;

		} catch (error) {
			console.log(error);
			interaction.reply("Something went wrong X(\nContact the developer for more info");
		}
	}
}
