export default function selectTrack(tracks, theme = '') {
  const themes = Object.keys(tracks)
  if (!themes.includes(theme)) {
    return null
  }

  const randomTrack =
    tracks[theme][Math.floor(Math.random() * tracks[theme].length)]
  return randomTrack
}
