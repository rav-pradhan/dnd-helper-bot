require('dotenv').config()
import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import {config} from '../config'
import CommandRouter from './CommandRouter'
import ChannelPresenter from './ChannelPresenter'

dotenv.config()
const client = new Discord.Client()
let handler
let originChannelPresenter

client.once('ready', () => {
    console.log("Beep boop beep. D&D Jukebox now taking requests.")
})

client.on('message', async message => {
    if (message.author.bot) return
    originChannelPresenter = new ChannelPresenter(
        message.channel,
        message.member.voice.channel,
        message.guild.me
    )
    handler = new CommandRouter(config.PREFIX)
    await handler.handleMessage(message.content, originChannelPresenter)
})

client.login(process.env.ACCESS_TOKEN)
