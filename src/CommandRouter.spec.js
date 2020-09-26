import CommandRouter from './CommandRouter'
import ChannelPresenter from './ChannelPresenter'
import {testSpellData, failedTestSpellData} from "./testData";
import messageResponses from "./responses";
import Jukebox from './Jukebox'
import axios from 'axios'

jest.mock('axios')

jest.mock('./ChannelPresenter')
ChannelPresenter.mockImplementation(() => {
    return {
        respondInChatWith: jest.fn(),
        play: jest.fn()
    }
})

describe('Command Handlers', () => {
    let mockChannelPresenter
    let mockCommandHandler
    let mockJukebox

    beforeEach(() => {
        ChannelPresenter.mockClear()
        mockJukebox = new Jukebox({
            ambientCave: ['ambient-cave-track']
        })
        mockCommandHandler = new CommandRouter('!', mockJukebox)
        mockChannelPresenter = new ChannelPresenter()
    })

    describe('Ping Command Handler', () => {
        test('that the message !ping gets a response of pong', async () => {
            const text = '!ping'
            const expectedResponse = 'pong!'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledWith(
                expectedResponse
            )
        })
        test('that the bot does not send a response if the message is not a valid command', async () => {
            const text = 'Hello world'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(0)
        })
        test('that the bot responds if an invalid command is entered', async () => {
            const text = '!Hello world'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledWith(messageResponses.HELP_MESSAGE)
        })
    })

    describe('Play Command Handler', () => {
        test('that the bot sends an error if an invalid theme is requested in the !play command', async () => {
            const text = '!play test'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
        })
        test('that bot calls for the play method in Channel when a valid theme is requested', async () => {
            const text = '!play ambientCave'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.play).toBeCalledTimes(1)
        })
    })

    describe('Spell Details command handler', () => {
        test('that the bot sends an error if no parameter is provided in the !spell command', async () => {
            const text = '!spell'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledWith(messageResponses.NO_SPELL_PROVIDED)
        })
        test('that the bot sends an error if an invalid parameter is provided in the !spell command', async () => {
            const text = '!spell Hideous Laughter'
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledWith(messageResponses.NO_SPELL_PROVIDED)
        })
        test('that the bot returns a response on successful call', async () => {
            const text = '!spell magic-missile'
            axios.get.mockImplementationOnce(() => Promise.resolve(testSpellData));
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
        })
        test('that the bot returns a response on an unsuccessful call', async () => {
            const text = '!spell deliberately-non-existent-spell'
            axios.get.mockRejectedValueOnce(failedTestSpellData);
            await mockCommandHandler.handleMessage(text, mockChannelPresenter)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledTimes(1)
            expect(mockChannelPresenter.respondInChatWith).toBeCalledWith(messageResponses.ERROR_FINDING_SPELL)
        })
    })
})
