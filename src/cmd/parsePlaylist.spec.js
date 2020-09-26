import parsePlaylist from './parsePlaylist'


describe('parsePlaylist', () => {
    test('that the correct object is returned from the playlist json', () => {
        const got = parsePlaylist(`${__dirname}/parsePlaylistTest.json`)
        const want = {
            battle: ["asdf"],
            test: ["jkl;"]
        }
        expect(got).toEqual(want)
    })

    test('that invalid file types are managed correctly', () => {
        const got = parsePlaylist(`${__dirname}/parsePlaylistTest.fasdf`)
        const want = "Invalid file type to parse: must be JSON"
        expect(got.message).toEqual(want)
    })
})