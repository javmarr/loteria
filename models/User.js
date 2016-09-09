var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: {type: String, required: true, unique: true},
  games: [{
    gameID: {type: String, required: true},
    gameName: {type: String, required: true},
    boardLayout: {type: String, required: true},
    turn: Number,
    deck: Array,
    boards: Array
  }]
});

module.exports = mongoose.model('User', UserSchema);
