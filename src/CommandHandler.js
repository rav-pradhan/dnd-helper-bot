export default class CommandHandler {
  constructor(prefix) {
    this.prefix = prefix
  }

  handleMessage(message) {
    const { channel, text } = message;
    if (prefixNotInText(text)) {
      channel.conveyMessage("pong");
    }
  }

  prefixNotInText(text) {
    message.content.slice(config.prefix.length).trim().split(/ +/g)
  }
}
