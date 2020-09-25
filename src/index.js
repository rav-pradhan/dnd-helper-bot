import * as Discord from 'discord.js'
import dotenv from 'dotenv'
import {config} from '../config'
import CommandRouter from './CommandRouter'
import ChannelPresenter from './ChannelPresenter'
import Jukebox from './Jukebox'

dotenv.config()
const client = new Discord.Client()

let CommandHandler
let originChannelPresenter
let playlist = {}

client.once('ready', async () => {
    playlist = await parsePlaylist(fileLocation)
    console.log("D&D Helper ready for service.")
})

client.on('message', async message => {
    if (message.author.bot) return

    originChannelPresenter = new ChannelPresenter(
        message.channel,
        message.member.voice.channel,
        message.guild.me
    )
    
    Playlist = new Jukebox(playlist)
    CommandHandler = new CommandRouter(config.PREFIX, Playlist)
    await CommandHandler.handleMessage(message.content, originChannelPresenter)
})

client.login(process.env.ACCESS_TOKEN)
