export default class Channel {
  constructor(channel, voiceChannel) {
    this.originChannel = channel
    this.voiceChannel = voiceChannel
  }

  play(track) {
    return track
  }

  respondInChatWith(message) {
    this.originChannel.send(message)
  }

  respondInChatWithInvalidCommand(attemptedCommand) {
    this.originChannel.send(`The command ${attemptedCommand} is not valid.`)
  }
}
