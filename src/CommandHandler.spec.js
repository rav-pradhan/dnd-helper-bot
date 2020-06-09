import CommandHandler from './CommandHandler'
import Message from './Message'
import Channel from './Channel'

jest.mock('./Channel')

Channel.mockImplementation(() => {
  return {
    respondInChatWith: jest.fn(),
    respondInChatWithInvalidCommand: jest.fn()
  }
})

describe('Command Handler', () => {
  let mockCommandHandler;
  let mockChannel;

  beforeEach(() => {
    Channel.mockClear();
    mockCommandHandler = new CommandHandler('!');
    mockChannel = new Channel();
  })

  test('that the message !ping gets a response of pong', async () => {
    const text = "!ping";
    const expectedResponse = "pong!";
    const message = new Message(mockChannel, text);

    await mockCommandHandler.handleMessage(message);
    expect(mockChannel.respondInChatWith).toBeCalledTimes(1)
    expect(mockChannel.respondInChatWith).toBeCalledWith(expectedResponse);
  })

  test('that the bot does not send a response if the message is not a valid command', async () => {
    const text = "Hello world"
    const message = new Message(mockChannel, text)

    await mockCommandHandler.handleMessage(message)
    expect(mockChannel.respondInChatWithInvalidCommand).toBeCalledTimes(1)
  })
})