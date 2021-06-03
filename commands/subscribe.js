const UserController = require("../controller/user");

module.exports = {
  name: 'subscribe',
  description: 'Subscribe a user or a tag to be pinged!',
  execute(msg, args, bot) {
    UserController.AddUser(args[0], msg.guild.id, msg);
  },
};
