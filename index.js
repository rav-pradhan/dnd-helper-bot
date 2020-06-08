require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('D&D Jukebox is now running');
});

client.login(process.env.ACCESS_TOKEN);