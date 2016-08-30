
var express = require('express');
var router = express.Router();

var User = require('../models/User.js');



function generateRandomID() {
  var keyLength = 10;
  var key = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0 ; i < keyLength; i++) {
    random = ((Math.floor(Math.random() * 100)) % possible.length); // 0 - (length-1)
    key += possible.charAt(random);
  }
  console.log('returning key: ' + key);
  return key;
}

function addGameToUser(req, res, next) {
  var userID = req.session.user_id;
  var savedGames; // array of games
  var newGame = {}; // just the new game

  // check if userID is on the database
  User.findOne({'userID': userID }, function(err, user){
    if (err) {
      req.session.error = "Error when finding userID in create";
      res.rediret('/create');
    }
    if (user) {
      // found
      console.log('user is: ');
      console.log(user);

      // get values
      savedGames = user.games;
      // console.log(user.games);

      // set values for the new game
      newGame['gameID'] = generateRandomID();
      newGame['deck'] = user.deck;
      newGame['boards'] = user.boards;
      console.log(newGame);

      // make sure id is different from the other games the user has

      // add to savedGames
      savedGames.push(newGame);

      // update the db entry using the old + new games
      User.findOneAndUpdate({'userID': userID}, {games: savedGames}, function(err, raw){
          if (err) return handleError(err);
          console.log('The raw response from Mongo was ', raw);
      });
    } else {
      // userID not found, make a new entry
      var tempDeck = [1,2,45];
      var tempBoards = ["1,-1,39,28,1", "1,29,2,5,7"];
      newGame['gameID'] = generateRandomID();
      newGame['deck'] = tempDeck;
      newGame['boards'] = tempBoards;

      console.log(newGame);

      // save the user with the new information
      // console.log(JSON.stringify(result, null, '  '));
      var user = new User({
        userID: userID,
        games: newGame
      });

      user.save(function(err){
        if (err) {
          console.log('---SAVE ERROR---');
          if (err.name == 'MongoError' && err.code == '11000') {
            console.log('Duplicate key');
            req.session.error = 'User is already on the list';
            res.redirect('/create');
          }
        } else {
          req.session.success = 'Game created';
          res.redirect('/create');
        }
      });
    } // end else
  });
}


/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.user) {
    console.log(req.user.displayName);
    console.log(req.user);
    res.locals.displayName = req.user.displayName;
  }
  returnToURL = "https://javmarr.auth0.com/v2/logout?federated&returnTo=url_encode(https://javmarr.auth0.com/logout?returnTo=http://www.example.com)&access_token=[facebook access_token]"

  res.render('index', { DOMAIN: process.env.DOMAIN, CLIENT_ID: process.env.CLIENT_ID, REDIRECT_URL: process.env.CALLBACK_URL, returnToURL: returnToURL});
});

router.get('/create', function(req, res, next) {
  if (req.user) {
    res.locals.error = req.session.error;
    res.locals.success = req.session.success;
    req.session.error = null;
    req.session.success = null;
    res.render('create', {displayName: req.session.user.displayName});
  }
  else {
    res.redirect('/');
  }
});

router.post('/create', function(req, res, next) {
  // req.session.error = "Post create";
  // req.session.success = "It worked"
  // res.redirect('/create');

  console.log('post create called');
  addGameToUser(req, res, next);

});


router.get('/join', function(req, res, next) {
  if (req.user) {
    res.render('join', {displayName: req.session.user.displayName});
  } else {
    res.render('join');
  }
});

router.post('/join', function(req, res, next) {

  // get room number from link

  // var roomID = str.substring(str.lastIndexOf('/') + 1);

  // call socket io join
  // socket.join(roomID)

  // send them to the game if joined

  // send to login/error page if failed
  console.log(req.body.nickname);
  console.log(req.body.secretLink);

  res.send(req.body.nickname + " " + req.body.secretLink);
});

router.get('/loteria/:gameID', function(req, res, next) {
  var gameID = req.params.gameID;
  console.log(gameID);
  if (req.user) {
    res.render('loteria', { gameID: gameID});
  }
  res.redirect('/');
});

module.exports = router;
