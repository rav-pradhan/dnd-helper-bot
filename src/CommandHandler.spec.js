import CommandHandler from './CommandHandler'
import Message from './Message'
import ChannelInteractor from './ChannelInteractor'

jest.mock('./ChannelInteractor')

ChannelInteractor.mockImplementation(() => {
  return {
    respondInChatWith: jest.fn(),
    play: jest.fn()
  }
})

describe('Command Handlers', () => {
  let testCommandHandler
  let mockChannelInteractor

  beforeEach(() => {
    ChannelInteractor.mockClear()
    testCommandHandler = new CommandHandler('!')
    mockChannelInteractor = new ChannelInteractor()
  })

  describe('Ping Command Handler', () => {
    test('that the message !ping gets a response of pong', async () => {
      const text = '!ping'
      const expectedResponse = 'pong!'
      const message = new Message(mockChannelInteractor, text)

      await testCommandHandler.handleMessage(message)
      expect(mockChannelInteractor.respondInChatWith).toBeCalledTimes(1)
      expect(mockChannelInteractor.respondInChatWith).toBeCalledWith(
        expectedResponse
      )
    })

    test('that the bot does not send a response if the message is not a valid command', async () => {
      const text = 'Hello world'
      const message = new Message(mockChannelInteractor, text)

      await testCommandHandler.handleMessage(message)
      expect(mockChannelInteractor.respondInChatWith).toBeCalledTimes(0)
    })
  })

  describe('Play Command Handler', () => {
    test('that the bot sends an error if an invalid theme is requested in the !play command', async () => {
      const text = '!play test'
      const message = new Message(mockChannelInteractor, text)

      await testCommandHandler.handleMessage(message)
      expect(mockChannelInteractor.respondInChatWith).toBeCalledTimes(1)
    })
    test('that bot calls for the play method in Channel when a valid theme is requested', async () => {
      const text = '!play ambientCave'
      const message = new Message(mockChannelInteractor, text)

      await testCommandHandler.handleMessage(message)
      expect(mockChannelInteractor.play).toBeCalledTimes(1)
    })
  })
})
