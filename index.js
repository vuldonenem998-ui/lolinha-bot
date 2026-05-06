const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('clientReady', () => {
  console.log('💗 Lolinha está online!');
});

// 🎀 Mensagem de boas-vindas
client.on('guildMemberAdd', member => {
  const canal = member.guild.channels.cache.find(c => c.name === "geral" && c.isTextBased());
  if (canal) {
    canal.send(`💖 Oii ${member}, seja bem-vindo(a)! Eu sou a Lolinha~ 🎀`);
  }
});

// 🔊 Aviso de entrada em call
client.on('voiceStateUpdate', (oldState, newState) => {
  if (!oldState.channel && newState.channel) {
    const canalTexto = newState.guild.channels.cache.find(c => c.name === "geral" && c.isTextBased());

    if (canalTexto) {
      canalTexto.send(`🎧 ${newState.member.user.username} entrou na call **${newState.channel.name}** às ${new Date().toLocaleTimeString()}`);
    }
  }
});

// 💬 Respostas fofas
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === "!lolinha") {
    message.reply("💗 Oii! Eu sou a Lolinha, vou cuidar de vocês~ 🎀");
  }

  if (message.content === "!ajuda") {
    message.reply("🌸 Comandos: !lolinha | !ajuda");
  }
});

// 🔐 LOGIN SEGURO
client.login(process.env.TOKEN);