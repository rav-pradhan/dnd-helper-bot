import CommandHandler from './CommandHandler'
import ChannelPresenter from './ChannelPresenter'

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

  beforeEach(() => {
    ChannelPresenter.mockClear()
    mockCommandHandler = new CommandHandler('!')
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
})
