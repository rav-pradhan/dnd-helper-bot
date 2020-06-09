export default class Channel {
    constructor(channel) {
        this.originChannel = channel;
    }

    respondInChatWith(message) {
        this.originChannel.send(message)
    }

    responseInChatWithInvalidCommand(attemptedCommand) {
        this.originChannel.send(`The command ${attemptedCommand} is not valid.`)
    }
}