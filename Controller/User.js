const User = require('../model/user');
const ServerController = require('../controller/server');


exports.PingUsers = (server, msg) => { 
    ServerController.GetServer(server).then(currentServer => {
        console.log(currentServer);

        const userQuery = User.find({server: currentServer.id});
        userQuery.then(documents => {
            console.log(documents);
            if(documents.length){
                documents.forEach(user => {
                    const channel = msg.guild.channels.find(channel => channel.id === currentServer.channelId);
                    channel.send(user.tag + " It's time");
                });
            }else{
                msg.channel.send("No user to ping");
                console.log("No user to ping");
            }          
        });
    }); 
};


exports.AddUser = (tag, server, msg) => {

    ServerController.GetServer(server).then(currentServer => {
        const user = new User({
            tag: tag,
            server : currentServer.id
        });

        user.save()
            .then((document) => {
                msg.channel.send(document.tag + " added");
            }).catch(error => {
                msg.channel.send("Error " + tag + " not added");
                console.log(error);
        });
    });
};

exports.RemoveUser = (tag, server, msg) => {
  
    User.deleteOne({tag: tag, server:server}).then((result) => {
        if(result.n > 0){
            msg.channel.send(tag + " removed");
        }else{
            msg.channel.send(tag + " not removed");
        }
      }).catch(error => {
        msg.channel.send("Error " + tag + " not removed");
        console.log(error);
    });
  };