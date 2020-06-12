import {config} from '../../config'

const spellHandler = {
    fetchSpellDetails(spellSlug) {
        console.log(config.API_URL)
    },

    isValidSlug(parametersLength) {
        if (parametersLength !== 1) {
            return false
        }
        return true
    }
}

export default spellHandler