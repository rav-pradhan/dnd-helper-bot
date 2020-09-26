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
let trackList = {}

client.once('ready', async () => {
    trackList = await parsePlaylist(fileLocation)
    console.log("D&D Helper ready for service.")
})

client.on('message', async message => {
    if (message.author.bot) return

    originChannelPresenter = new ChannelPresenter(
        message.channel,
        message.member.voice.channel,
        message.guild.me
    )
    
    const MusicPlayer = new Jukebox(trackList)
    CommandHandler = new CommandRouter(config.PREFIX, MusicPlayer)
    await CommandHandler.handleMessage(message.content, originChannelPresenter)
})

client.login(process.env.ACCESS_TOKEN)
