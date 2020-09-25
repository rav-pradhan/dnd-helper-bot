export default class Jukebox {
  constructor(tracks) {
    this.tracks = tracks
  }

  selectTrack(theme) {
    const themes = Object.keys(this.tracks)

    if (!themes.includes(theme)) return null

    const randomTrack = this.tracks[theme][Math.floor(Math.random() * this.tracks[theme].length)]

    return randomTrack
  }
}