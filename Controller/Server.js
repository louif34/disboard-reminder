const Server = require('../model/server');

exports.GetServer = async (serverId) => {
  return await Server.findOne({ serverId: serverId });
};

exports.IsServerCreated = async (serverId) => {
  return await this.GetServer(serverId).then(server => {

    if (server) {
      return true;
    } else {
      return false;
    }
  });
}

exports.InstanciateServer = (guild, channel, msg) => {

  const server = new Server({
    serverId : guild.id,
    serverName : guild.name,
    channelId: channel.id,
    channelName: channel.name,
  });

  server.save()
    .then((document) => {
        msg.channel.send("Server" + guild.name + " is instanciate. Please subscribe to receive pings");
    }).catch(error => {
        msg.channel.send("Error. Server " + guild.name + " is not instanciate");
        console.log(error);
  });
};

exports.RemoveServer = (serverId, msg) => {
  
    Server.deleteOne({server:server}).then((result) => {
        if(result.n > 0){
            msg.channel.send(serverId + " removed");
        }else{
            msg.channel.send(serverId + " not removed");
        }
      }).catch(error => {
        msg.channel.send("Error " + serverId + " not removed");
        console.log(error);
    });
  };