import selectTrack from './selectTrack'

const mockTracks = {
  battle: ['https://www.youtube.com/watch?v=lAGm9MTyRJ8'],
  boss: [
    'https://www.youtube.com/watch?v=7sGMKm1Ozfw',
    'https://www.youtube.com/watch?v=ZIF-VbKfnxc'
  ],
  town: ['https://www.youtube.com/watch?v=xu2pESvXcmM'],
  ambientCave: ['https://www.youtube.com/watch?v=E72yDpAfrgY']
}

describe('selectTrack command', () => {
  test('that a message is sent when no theme is passed', () => {
    const got = selectTrack({}, '')
    const want = null
    expect(got).toEqual(want)
  })
  test('that a message is sent when no theme is passed', () => {
    const got = selectTrack({}, 'invalidTheme')
    const want = null
    expect(got).toEqual(want)
  })
  test('that a track is selected from the battle theme at random', () => {
    const got = selectTrack(mockTracks, 'battle')
    const aTrackInsideTheBattleselectTracklist = mockTracks['battle'].find(
      track => track === got
    )
    expect(got).toBe(aTrackInsideTheBattleselectTracklist)
  })
})
