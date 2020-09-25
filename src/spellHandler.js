import {config} from '../config'
import axios from 'axios'

const spellHandler = {
    async fetchSpellDetails(spellSlug) {
        try {
            const {data} = await axios.get(`${config.API_URL}/spells/${spellSlug}`, {data: null})
            return data
        } catch(error) {
            throw new Error
        }
    },

    isValidSlug(numberOfArguments) {
        if (numberOfArguments !== 1) {
            return false
        }
        return true
    }
}

export {spellHandler}