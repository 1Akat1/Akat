const { SlashCommandBuilder } = require("discord.js");
const ytdl = require('ytdl-core-discord');
const Discord = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reproduz musicas")
    .addStringOption((option) =>
      option
        .setName("urls")
        .setDescription(
          "URLs das músicas da playlist a serem reproduzidas. Separe as URLs por vírgulas."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
  
    if (!voiceChannel) {
      await interaction.reply("Você precisa estar em um canal de voz para efetuar a reprodução");
      return;
    }
  
    if (voiceChannel.type !== 'GUILD_VOICE') {
      await interaction.reply("Você precisa estar em um canal de voz válido para efetuar a reprodução");
      return;
    }
  
    // conectar ao canal de voz
    const connection = await voiceChannel.join();
  
    // restante do código...

    const { voice } = interaction.member;
    if (!(voiceChannel instanceof Discord.VoiceChannel)) {
      await interaction.reply("Você precisa estar em um canal de voz válido para efetuar a reprodução");
      return;
       
    }

    //conectar

    const urls = interaction.options.getString("urls").split(",");

    for (const url of urls) {
      const stream = await ytdl(url, { filter: 'audioonly' });
      const dispatcher = connection.play(stream, { type: 'opus' });

      await new Promise(resolve => {
        dispatcher.on("finish", () => {
          if (urls.indexOf(url) === urls.length - 1) {
            voice.channel.leave();
          }
          resolve();
        });
      });
    }

    await interaction.reply(`Reproduzindo ${urls.length} músicas`);
  },
};
