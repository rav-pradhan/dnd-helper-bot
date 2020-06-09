export default class CommandHandler {
  constructor(prefix) {
    this.prefix = prefix
  }

  async handleMessage(message) {
    const { channel, text } = await message;
    const { command, parameters } = this.extractArgumentsFromText(text)
    if (this.startsWithPrefix(text)) {
      return this.handleCommands(channel, command, parameters)
    } else {
      return this.sendInvalidCommand(channel, command)
    }
  }

  handleCommands(channel, command, parameters) {
    switch(command) {
      case 'ping':
        channel.respondInChatWith("pong!");
    }
  }

  startsWithPrefix(text) {
    return text.startsWith(this.prefix);
  }

  extractArgumentsFromText(text) {
    const parameters = text.slice(this.prefix.length).trim().split(/ +/g);
    const command = parameters.shift().toLowerCase();
    return {
      command,
      parameters
    }
  }

  sendInvalidCommand(channel, command) {
    channel.respondInChatWithInvalidCommand(command)
  }
}
