import selectTrack from './commands/selectTrack'
import { tracks } from './tracks/selection'

const HELP_MESSAGE =
  'Try any of the following commands: !play [theme], !stopTrack, !skipTrack, !ping'

const INVALID_THEME_MESSAGE =
  'Please enter a valid theme with the !play command: battle, boss, town, ambientCave'

export default class CommandHandler {
  constructor(prefix, presenter) {
    this.prefix = prefix
  }

  async handleMessage(message, presenter) {
    const { command, parameters } = this.extractArgumentsFromText(message)
    if (this.startsWithPrefix(message)) {
      await this.delegateCommands(command, parameters, presenter)
    }
  }

  async delegateCommands(command, parameters, presenter) {
    switch (command) {
      case 'ping':
        presenter.respondInChatWith('pong!')
        break
      case 'play':
        const track = await selectTrack(tracks, parameters[0])
        track
          ? presenter.play(track)
          : presenter.respondInChatWith(INVALID_THEME_MESSAGE)
        break
      default:
        presenter.respondInChatWith(HELP_MESSAGE)
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
