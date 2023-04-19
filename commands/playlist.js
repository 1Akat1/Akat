const { SlashCommandBuilder} = require("discord.js")

module.exports = {
 data: new SlashCommandBuilder()
     .setName("wallpaper")
     .setDescription("Link Do Programa De Wallpaper"),
 async execute(interaction) {
  await interaction.reply("https://www.microsoft.com/store/productId/9NTM2QC6QWS7\nhttps://www.example.com/");

  
}
}