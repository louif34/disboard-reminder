const ServerController = require("../controller/server");

module.exports = {
  name: 'start',
  description: 'Setup the bot!',
  execute(msg, args, bot) {
    console.log("Server starting");

    ServerController.IsServerCreated(msg.guild.id).then(IsServerCreated => {
        console.log(IsServerCreated);
        if(IsServerCreated){
            msg.channel.send("Server already initialized");
            return;
        }

        let filter = m => m.author.id === msg.author.id
        msg.channel.send("Please write the name of the channel for pings (don't that the channel)").then(() => {
            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(messages => {
                message = messages.first();
                
                const channel = message.guild.channels.find(channel => channel.id === message.content.replace(/<|>|#/g,''));
                ServerController.InstanciateServer(message.guild, channel, msg);
            })
            .catch(error => {
                message.channel.send('Timeout');
                console.log(error);
            });
        })
      
    });
  },
};


