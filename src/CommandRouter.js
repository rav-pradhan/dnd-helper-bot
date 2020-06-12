import {spellHandler} from './commands/spellHandler'
import selectTrack from './commands/selectTrack'
import {tracks} from './tracks/selection'
import messageResponses from "./commands/messageResponses";

export default class CommandRouter {
    constructor(prefix) {
        this.prefix = prefix
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
                const track = await selectTrack(tracks, parameters[0])
                return track
                    ? presenter.play(track)
                    : presenter.respondInChatWith(messageResponses.INVALID_THEME_MESSAGE)
            case 'spell':
                if (spellHandler.isValidSlug(parameters.length)) {
                    const spellSlug = await parameters[0]
                    const spellDetails = await spellHandler.fetchSpellDetails(spellSlug)
                    console.log("SPELL DETAILS", spellDetails)
                    presenter.respondInChatWith(spellDetails)
                } else {
                    return presenter.respondInChatWith(messageResponses.NO_SPELL_PROVIDED)
                }
                break
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
