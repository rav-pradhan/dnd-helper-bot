import ytdl from 'ytdl-core'
import * as Discord from "discord.js";

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

    respondInChatWith(message) {
        this.originChannel.send(message)
    }

    respondWithEmbeddedSpellFormat(spellData) {
        const spellMessage = new Discord.MessageEmbed()
        spellMessage
            .setColor('#0099ff')
            .setTitle(spellData.name)
            .setDescription(spellData.desc)
            .addFields(
                {name: 'School', value: spellData.school, inline: true},
                {name: 'Range', value: spellData.range, inline: true},
                {name: 'Cast Time', value: spellData.casting_time, inline: true},
                {name: 'Spell Level', value: spellData.level_int, inline: true},
            )
            .setTimestamp()
        return this.originChannel.send(spellMessage)
    }
}
