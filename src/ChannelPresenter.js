import ytdl from 'ytdl-core'

export default class ChannelPresenter {
    constructor(channel, voiceChannel, bot) {
        this.originChannel = channel
        this.voiceChannel = voiceChannel
        this.bot = bot
    }

    play(track) {
        if (!this.voiceChannel) {
            return this.respondInChatWith("You need to be in a voice channel for this to work.")
        }
        this.voiceChannel.join().then(connection => {
            const stream = ytdl(track, {filter: 'audioonly', quality: 'lowestaudio'});
            const dispatcher = connection.play(stream, {volume: 0.05});
            dispatcher.on('end', () => this.voiceChannel.leave());
        });
    }

    stopPlaying() {
        this.bot
    }

    respondInChatWith(message) {
        this.originChannel.send(message)
    }
}
