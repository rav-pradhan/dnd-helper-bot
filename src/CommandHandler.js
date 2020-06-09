import selectTrack from './commands/selectTrack'
import { tracks } from './tracks/selection'

const HELP_MESSAGE =
  'Try any of the following commands: !play [theme], !stopTrack, !skipTrack, !ping'

const INVALID_THEME_MESSAGE =
  'Please enter a valid theme with the !play command: battle, boss, town, ambientCave'

export default class CommandHandler {
  constructor(prefix) {
    this.prefix = prefix
  }

  async handleMessage(message) {
    const { channel, text } = await message
    const { command, parameters } = this.extractArgumentsFromText(text)
    if (this.startsWithPrefix(text)) {
      await this.delegateCommands(channel, command, parameters)
    }
  }

  async delegateCommands(channel, command, parameters) {
    switch (command) {
      case 'ping':
        channel.respondInChatWith('pong!')
        break
      case 'play':
        const track = await selectTrack(tracks, parameters[0])
        track
          ? channel.play(track)
          : channel.respondInChatWith(INVALID_THEME_MESSAGE)
        break
      default:
        channel.respondInChatWith(HELP_MESSAGE)
    }
  }

  startsWithPrefix(text) {
    return text.startsWith(this.prefix)
  }

  extractArgumentsFromText(text) {
    const parameters = text
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g)
    const command = parameters.shift().toLowerCase()
    return {
      command,
      parameters
    }
  }

  sendMessage(channel, message) {
    channel.respondInChatWith(message)
  }
}
