require("dotenv").config();
import * as Discord from "discord.js";
import dotenv from "dotenv";
import { config } from '../config'
import CommandHandler from './CommandHandler'
import Message from './Message'
import Channel from './Channel'

dotenv.config();
const client = new Discord.Client();
let commandHandler = new CommandHandler(config.prefix)
const general = new Channel() 

client.once("ready", () => {
  console.log("D&D Jukebox is now running");
});

client.on("message", async message => {
  if (message.author.bot) return;
  const message = new Message( message)
})

client.login(process.env.ACCESS_TOKEN);