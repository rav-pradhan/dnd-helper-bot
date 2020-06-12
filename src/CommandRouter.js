import spellHandler from './commands/spellHandler'
import selectTrack from './commands/selectTrack'
import {tracks} from './tracks/selection'

const HELP_MESSAGE =
    'Try any of the following commands: !play [theme], !ping'

const INVALID_THEME_MESSAGE =
    'Please enter a valid theme with the !play command: battle, boss, town, forest, ambientCave, ambientForest, victory'

const NO_SPELL_PROVIDED = "Please include a slugified version of the spell name, e.g., Acid Arrow => acid-arrow, or Arcanist's Magic Aura => arcanists-magic-aura"

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
                    : presenter.respondInChatWith(INVALID_THEME_MESSAGE)
            case 'spell':
                if (spellHandler.isValidSlug(parameters.length)) {
                    const spellSlug = await parameters[0]
                    const spellDetails = await spellHandler.fetchSpellDetails(spellSlug)
                } else {
                    return presenter.respondInChatWith(NO_SPELL_PROVIDED)
                }
                break
            default:
                console.log("DEFAULT")
                return presenter.respondInChatWith(HELP_MESSAGE)
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
