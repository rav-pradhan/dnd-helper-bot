import {spellHandler} from "./spellHandler";

describe('validating slugs', () => {
    test('that no arguments passed returns false', () => {
        const got = spellHandler.isValidSlug(null)
        const expected = false;
        expect(got).toEqual(expected)
    })
    test('that more than one arguments passed returns false', () => {
        const got = spellHandler.isValidSlug(3)
        const expected = false;
        expect(got).toEqual(expected)
    })
    test('that one argument passed returns true', () => {
        const got = spellHandler.isValidSlug(1)
        const expected = true;
        expect(got).toEqual(expected)
    })
})

describe('fetchSpellDetails', () => {

})