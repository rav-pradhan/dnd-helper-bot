import fs from 'fs'
import path from 'path'

export default function parsePlaylist(fileLocation) {
    if (path.extname(fileLocation) !== '.json') {
        return Error("Invalid file type to parse: must be JSON")
    }
    const rawData = fs.readFileSync(fileLocation)
    const playlist = JSON.parse(rawData)
    return playlist
}