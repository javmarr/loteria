var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: {type: String, required: true, unique: true},
  games: [{
    gameID: String,
    deck: Array,
    boards: Array
  }]
});

module.exports = mongoose.model('User', UserSchema);
