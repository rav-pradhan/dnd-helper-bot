require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const themes = require('../public/Themes')

client.once('ready', () => {
	console.log('D&D Jukebox is now running');
});

client.login(process.env.ACCESS_TOKEN);