import ytdl from 'ytdl-core'

export default class ChannelInteractor {
  constructor(channel, voiceChannel) {
    this.originChannel = channel
    this.voiceChannel = voiceChannel
  }

  play(track) {
    if (!this.voiceChannel) {
      return this.respondInChatWith("You need to be in a voice channel for this to work.")
    }
    this.voiceChannel.join().then(connection => {
			const stream = ytdl(track, { filter: 'audioonly'});
      const dispatcher = connection.play(stream, { volume: 0.07 });
			dispatcher.on('end', () => this.voiceChannel.leave());
		});
  }

  stop() {

  }

  enqueue() {

  }

  dequeue() {

  }

  respondInChatWith(message) {
    this.originChannel.send(message)
  }
}
