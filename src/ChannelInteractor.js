export default class ChannelInteractor {
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
}
