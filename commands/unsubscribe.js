const UserController = require("../controller/user");

module.exports = {
  name: 'unsubscribe',
  description: 'Unsubscribe a user or a tag to be pinged!',
  execute(msg, args, bot) {
    UserController.RemoveUser(args[0], 'test', msg);
  },
};
