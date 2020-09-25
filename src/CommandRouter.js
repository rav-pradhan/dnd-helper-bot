import {spellHandler} from './modules/spellHandler'
import messageResponses from "./modules/messageResponses";

export default class CommandRouter {
    constructor(prefix, jukebox) {
        this.prefix = prefix
        this.musicPlayer = jukebox
    }

    async handleMessage(message, presenter) {
        const {command, parameters} = this.extractArgumentsFromText(message)
        if (this.startsWithPrefix(message)) {
            await this.delegateCommands(command, parameters, presenter)
        }
    }

    async delegateCommands(command, parameters, presenter) {
        switch (command) {
            case 'ping':
                return presenter.respondInChatWith('pong!')
            case 'play':
                const track = await this.musicPlayer.selectTrack(parameters[0])
                return track
                    ? presenter.play(track)
                    : presenter.respondInChatWith(messageResponses.INVALID_THEME_MESSAGE)
            case 'spell':
                if (spellHandler.isValidSlug(parameters.length)) {
                    let spellData;
                    try {
                        const spellSlug = await parameters[0]
                        spellData = await spellHandler.fetchSpellDetails(spellSlug)
                        return presenter.respondWithEmbeddedSpellFormat(spellData)
                    } catch(error) {
                        return presenter.respondInChatWith(messageResponses.ERROR_FINDING_SPELL)
                    }
                } else {
                    return presenter.respondInChatWith(messageResponses.NO_SPELL_PROVIDED)
                }
            default:
                return presenter.respondInChatWith(messageResponses.HELP_MESSAGE)
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
}
