const UserController = require("../controller/user");

module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args, bot) {
    
    UserController.PingUsers(msg.guild.id, msg);    
    
  },
};
