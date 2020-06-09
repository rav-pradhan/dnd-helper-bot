require('dotenv').config()
import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import { config } from '../config'
import CommandHandler from './CommandHandler'
import Message from './Message'
import ChannelInteractor from './ChannelInteractor'

dotenv.config()
const client = new Discord.Client()
let handler
let originChannelInteractor

client.once('ready', () => {
  handler = new CommandHandler(config.prefix)
})

client.on('message', async message => {
  if (message.author.bot) return
  originChannelInteractor = new ChannelInteractor(
    message.channel,
    message.member.voice.channel
  )
  const messageData = new Message(originChannelInteractor, message.content)
  handler.handleMessage(messageData)
})

client.login(process.env.ACCESS_TOKEN)
