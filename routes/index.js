
var express = require('express');
var router = express.Router();


var User = require('../models/User.js');

// get only games
// db.getCollection('users').find({}, { games: 1})

// find user that is hosting a certain game
// db.getCollection('users').find({"games.gameID" : "3AZBYjMRlF" }, { games: 1})

var maxGamesPerPlayer = 5; // no more for each player

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
  var boardLayout = req.body.boardLayout;
  var gameID = generateRandomID();

  // set values for the new game
  newGame['boardLayout'] = boardLayout;

  // check if userID is on the database
  User.findOne({'userID': userID }, function(err, user){
    if (err) {
      req.session.error = "Error when finding userID in create";
      res.redirect('/create');
    }
    if (user) {
      // found
      // console.log('user is: ');
      // console.log(user);

      // get values
      savedGames = user.games;
      // console.log(user.games);

      // check number of games
      if (savedGames.length >= maxGamesPerPlayer) {
        req.session.error = 'Cannot create more than ' + maxGamesPerPlayer + ' games.';
        res.redirect('/create');
      } else {
        // can add more games

        // make sure id is different from the other games the user has
        for (var i = 0; i < savedGames.length; i++) {
          while (savedGames[i].gameID == gameID){
            gameID = generateRandomID();
          }
        }


        // set values for the new game
        newGame['gameID'] = gameID;
        newGame['deck'] = user.games.deck;
        newGame['boards'] = user.games.boards;
        console.log(newGame);

        // add to savedGames
        savedGames.push(newGame);

        // update the db entry using the old + new games
        User.findOneAndUpdate({'userID': userID}, {games: savedGames}, function(err, raw){
            if (err) return handleError(err);
            // console.log('The raw response from Mongo was ', raw);
            req.session.success = 'Game created';
            req.session.gameID = gameID;
            res.redirect('/create');
        });
      }
    } else {
      // userID not found, make a new entry
      var tempDeck = [1,2,45];
      var tempBoards = ["1,-1,39,28,1", "1,29,2,5,7"];
      newGame['gameID'] = gameID;
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
          req.session.gameID = gameID;
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
    res.locals.gameID = req.session.gameID;
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
  res.locals.error = req.session.error;
  res.locals.success = req.session.success;
  req.session.error = null;
  req.session.success = null;

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
  console.log(req.body.nicknameContainer);
  console.log(req.body.secretCodeContainer);
  req.session.nickname = req.body.nicknameContainer
  // res.send(req.body.nicknameContainer + " " + req.body.secretCodeContainer);
  res.redirect('/loteria/' + req.body.secretCodeContainer);
});

router.get('/loteria/:gameID', function(req, res, next) {
  if (req.session.nickname) {
    var gameID = req.params.gameID;
    var nickname = req.session.nickname;
    console.log('nickname: ' + nickname);
    console.log('gameID: ' + gameID);

    // get the game from the db
    User.findOne({"games.gameID" : gameID }, function (err, user) {
      console.log(err);
      console.log('user');
      console.log(user);
      if (err) {
        console.log('err');
        req.session.error = "Error when finding userID in create";
        res.redirect('/join');
      }
      if (user) {
        console.log('user');
        console.log("loteria get (user):");
        console.log(user);
        
        res.render('loteria', {gameID: gameID, nickname: nickname});
      } else {
        req.session.error = "Game doesn't exist";
        res.redirect('/join');
      }

    });
  } else {
    res.redirect('/');
    // res.send('no nickname');
  }

});

module.exports = router;
