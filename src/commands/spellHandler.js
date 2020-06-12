import {config} from '../../config'
import axios from 'axios'
import * as Discord from 'discord.js';

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
        return new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(data.name)
            .setDescription(data.desc)
            .addFields(
                {name: 'School', value: data.school},
                {name: 'Range', value: data.range, inline: true},
                {name: 'Cast Time', value: data.casting_time, inline: true},
                {name: 'Spell Level', value: data.level_int, inline: true},
            )
            .setTimestamp()
    },

    isValidSlug(parametersLength) {
        if (parametersLength !== 1) {
            return false
        }
        return true
    }
}

export {spellHandler}