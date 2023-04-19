const { SlashCommandBuilder, EmbedBuilder} = require("discord.js")

const exampleEmbed = new EmbedBuilder()
    .setColor("DarkPurple")
	.setTitle('Comandos')
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: 'Ok', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)

module.exports = {
 data: new SlashCommandBuilder()
     .setName("git")
     .setDescription("Relembrar git"),
 async execute(interaction) {
  await interaction.reply({ embeds: [exampleEmbed] })
}
}