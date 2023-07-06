module.exports = {
	dev: false,
	data: {
		name: "ping",
		description: "Replies with pong!"
	},
	execute: async (interaction)=>{
		const botLatency = Date.now() - interaction.createdTimestamp;
		return interaction.reply(`Pong!\n||Bot Latency: ${botLatency} ms||`);
	}
}
