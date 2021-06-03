const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  tag: { type: String, require: true },
  server: { type: String, require: true }
});

module.exports = mongoose.model('User', userSchema);
