const mongoose = require('mongoose');


const serverSchema = mongoose.Schema({
    serverName: { type: String, require: true },
    serverId: { type: String, require: true },
    channelId: { type: String, require: true },
    channelName: { type: String, require: true },
});

module.exports = mongoose.model('Server', serverSchema);
