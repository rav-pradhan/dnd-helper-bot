import {config} from '../../config'
import axios from 'axios'

const spellHandler = {
    async fetchSpellDetails(spellSlug) {
        try {
            const data = await axios.get(`${config.API_URL}/spells/${spellSlug}`, {data: null})
            return await this.formatResponse(data.data)
        } catch (error) {
            return `An error occurred: Status Code ${error.response.status} - ${error.response.statusText}`
        }
    },

    formatResponse(data) {
        const response =
        `
            Spell: ${data.name}
            School: ${data.school}
            Description: ${data.desc}
            Range: ${data.range}
            Cast Time: ${data.casting_time}
            Spell Level: ${data.level_int}
        `
        return response
    },

    isValidSlug(parametersLength) {
        if (parametersLength !== 1) {
            return false
        }
        return true
    }
}

export {spellHandler}