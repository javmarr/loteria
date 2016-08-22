var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  facebookId: String,
  games: [{
    key: String,
    settings: String,
    cardsDealt: Array,
    deck: Array
  }]
});

module.exports = mongoose.model('User', UserSchema);
