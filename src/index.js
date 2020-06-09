require('dotenv').config()
import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import { config } from '../config'
import CommandHandler from './CommandHandler'
import Message from './Message'
import Channel from './Channel'

dotenv.config()
const client = new Discord.Client()
let handler
let messageOriginChannel

client.once('ready', () => {
  handler = new CommandHandler(config.prefix)
})

client.on('message', async message => {
  if (message.author.bot) return
  messageOriginChannel = new Channel(
    message.channel,
    message.member.voice.channel
  )
  const messageData = new Message(messageOriginChannel, message.content)
  handler.handleMessage(messageData)
})

client.login(process.env.ACCESS_TOKEN)
