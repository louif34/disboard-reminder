require('dotenv').config();
const Discord = require('discord.js');
const mongoose = require('mongoose');

const uri = "mongodb+srv://Disboard-Reminder:" + process.env.MONGO_ATLAS_PW + "@louis-cluster.mwefy.mongodb.net/Disboard-Reminder?retryWrites=true&w=majority";
const dbConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, dbConnectionOptions).then(() => {
  console.log("Connected to database");
}).catch((error) => {
  console.log("Connection failed");
  console.log(error);
});

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');


Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args, bot);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
