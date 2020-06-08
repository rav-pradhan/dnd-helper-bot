'use strict';

var Discord = require('discord.js');

const themes = {
  battle: ["https://www.youtube.com/watch?v=lAGm9MTyRJ8"],
  boss: [    "https://www.youtube.com/watch?v=7sGMKm1Ozfw",
  "https://www.youtube.com/watch?v=ZIF-VbKfnxc"],
  town: ["https://www.youtube.com/watch?v=xu2pESvXcmM"],
  ambientCave: ["https://www.youtube.com/watch?v=E72yDpAfrgY"]
};

require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
	console.log('D&D Jukebox is now running');
});

client.login(process.env.ACCESS_TOKEN);
