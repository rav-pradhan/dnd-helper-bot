import Jukebox from './Jukebox'

const mockTracks = {
  battle: ['battle-track'],
  boss: [
    'boss-track-1',
    'boss-track-2'
  ],
  town: ['town-track'],
  ambientCave: ['ambientCave-track']
}


describe('selectTrack command', () => {
  test('that a message is sent when no theme is passed', () => {
    const EmptyMusicPlayer = new Jukebox({})
    const got = EmptyMusicPlayer.selectTrack({}, '')
    const want = null
    expect(got).toEqual(want)
  })
  test('that a message is sent when no theme is passed', () => {
    const TestMusicPlayer = new Jukebox(mockTracks)
    const got = TestMusicPlayer.selectTrack({}, 'invalidTheme')
    const want = null
    expect(got).toEqual(want)
  })
  test('that a track is selected from the battle theme at random', async () => {
    const SuccessfulMusicPlayer = new Jukebox(mockTracks)
    const got = await SuccessfulMusicPlayer.selectTrack('battle')
    const aValidTrack = mockTracks['battle'].find(
      track => track === got
    )
    expect(got).toBe(aValidTrack)
  })
})
