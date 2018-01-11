const cleverbot = require("cleverbot.io");
const settings = require("../settings.json"),
        user = settings.cleverbot_user,
        token = settings.cleverbot_token;

const bot = new cleverbot(user, token);

bot.setNick("Sherly-response");
bot.create( (err, session) => {
    console.log("Chatbot running...\n", (err ? "ERROR: " + err + "\n" : ""), "SessionID: ", session);
});

exports.askBot = (message, content) => bot.ask(content, (err, response) => {
    console.log("Asking: ", content);
    console.log("Response: ", response);
    message.channel.send(response);
});
