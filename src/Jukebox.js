export default class Jukebox {
  constructor(tracks) {
    this.tracks = tracks
    this.themes = Object.keys(this.tracks)
  }

  selectTrack(theme) {
    if (!this.themes.includes(theme)) return null
    const randomTrack = this.tracks[theme][Math.floor(Math.random() * this.tracks[theme].length)]
    return randomTrack
  }
}