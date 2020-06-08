require('dotenv').config();
import * as Discord from 'discord.js'
import { themes } from './themes/themes'
import dotenv from 'dotenv'

dotenv.config()
const client = new Discord.Client();

client.once('ready', () => {
	console.log('D&D Jukebox is now running');
	console.log(themes)
});

client.login(process.env.ACCESS_TOKEN);