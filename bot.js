const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  console.log('Escanea este código QR:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Papoi bot listo!');
});

client.on('message', async msg => {
  if (msg.body === '!papoi' && msg.from.endsWith('@g.us')) {
    const chat = await msg.getChat();
    const mentions = chat.participants.map(p => p.id._serialized);
    const text = mentions.map(id => @${id.split('@')[0]}).join(' ');
    await chat.sendMessage(text, { mentions: mentions.map(id => ({ id })) });
  }
});

client.initialize();
