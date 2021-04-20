// REPLIT.COM localhost hosting
// https://replit.com/@madalinaeleonor/Enowra-DiscordBot
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";

var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
});

bot.on("ready", function (evt) {
  logger.info("Connected");
});

bot.on("message", function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == "!") {
    // case if user call the bot by the command
    var args = message.substring(1).split(" ");
    var cmd = args[0];
    args = args.splice(1);

    switch (cmd) {
      // !ping
      case "ping":
        bot.sendMessage({
          to: channelID,
          message: "Pong!",
        });
        break;
    }
  } else {
    // case if the bot is called by default on some words
    const noNoWords = ["discord.gg"];

    message.replace(/\s+/g, "").toLowerCase();
    for (var i = 0; i < noNoWords.length; i++) {
      if (message.includes(noNoWords[i])) {
        bot.deleteMessage({
          channelID,
          messageID: evt.d.id,
        });
        break;
      }
    }
  }
});
