
var express = require('express');
var router = express.Router();


var User = require('../models/User.js');

// get only games
// db.getCollection('users').find({}, { games: 1})

// find user that is hosting a certain game
// db.getCollection('users').find({"games.gameID" : "3AZBYjMRlF" }, { games: 1})

var maxGamesPerPlayer = 5; // no more for each player
var deckSize = 54; // cards in deck

function shuffleDeck(deck) {
  var size = deck.length;
  var output = deck;
  // every card, swap to a random spot
  for (var i = 0; i < size; i++) {
    var temp = output[i];
    var random = ((Math.floor(Math.random() * 100)) % size); // 0 - (deckSize-1)

    // swap values
    output[i] = output[random];
    output[random] = temp;
  }
  return output;
}

function generateDeck(size) {
  var deck = [];
  for(var i = 1; i <= size; i++) {
    deck.push(i);
  }
  deck = shuffleDeck(deck);
  return deck;
}

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

function removeGameFromUser(gameID, userID, callback) {
  console.log("REMOVING GAME: " + gameID);
  User.update({'userID': userID},
              {$pull: {'games': {'gameID': gameID} }},
              function(err, doc) {
                callback(err, doc);
              });
}

function saveDeckToGame(gameID, userID, newDeck, callback) {
  console.log("SAVING DECK TO GAME: " + gameID);
  User.update({'userID': userID, 'games.gameID': gameID},
              {$set: {'games.$.deck': newDeck}},
              function(err, doc) {
                callback(err, doc);
              });
}

// assumes the user exists, this function will add a newGame to their db entry
function saveGame(newGame, user, userID, req, res, next) {
  // get values
  var savedGames = user.games;
  var gameID = generateRandomID();
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
    newGame['boards'] = [];
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
}

function addGameToUser(req, res, next) {
  var userID = req.session.user_id;

  var newGame = {}; // just the new game
  var boardLayout = req.body.boardLayout;
  var gameName = req.body.gameName;
  var newDeck = generateDeck(deckSize);
  // set values for the new game
  newGame['boardLayout'] = boardLayout;
  newGame['gameName'] = gameName;
  newGame['deck'] = newDeck;
  newGame['turn'] = 0;

  // check if userID is on the database
  User.findOne({'userID': userID }, function(err, user){
    if (err) {
      console.log('---FIND ERROR---'+err);
      req.session.error = "Error when finding userID in create";
      res.redirect('/create');
    }
    if (user) {
      // user found, add game to their entry
      saveGame(newGame, user, userID, req, res, next);

    } else {
      // userID not found, make a new user entry
      // var tempBoards = ["1,-1,39,28,1", "1,29,2,5,7"];
      var gameID = generateRandomID();
      newGame['gameID'] = gameID;
      newGame['boards'] = [];

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
          console.log('HOLA HOLA'+err.name);
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
    res.locals.error = req.session.error;
    res.locals.success = req.session.success;
    req.session.error = null;
    req.session.success = null;
  }
  returnToURL = "https://dev-qauothmtu2dhfuyy.us.auth0.com/v2/logout?federated&returnTo=url_encode(https://dev-qauothmtu2dhfuyy.us.auth0.com/logout?returnTo=http://www.example.com)&access_token=[X-Goog-Authenticated-User-ID']";

  res.render('index', { DOMAIN: process.env.DOMAIN, CLIENT_ID: process.env.CLIENT_ID, REDIRECT_URL: process.env.CALLBACK_URL, returnToURL: returnToURL});
});

router.get('/monitor', function(req, res, next) {
  if (req.user) {
    res.locals.error = req.session.error;
    res.locals.success = req.session.success;
    req.session.error = null;
    req.session.success = null;

    // user logged in, retrieve games from them
    var userID = req.session.user_id;
    User.findOne({'userID': userID}, function(err, docs){
      console.log(err);
      console.log(docs);
      if (err) { res.send('Error getting games');}

      if (docs) {
        if (docs.games.length <= 0) {
          // user exist but erased all games
          req.session.error = 'error: no games exist';
          res.redirect('/');
        } else {
          res.render('monitor', {games: docs.games});
        }

      }
      else {
        req.session.error = 'error: no games created';
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }

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
  // send to login/error page if failed
  console.log(req.body.nicknameContainer);
  console.log(req.body.secretCodeContainer);
  req.session.nickname = req.body.nicknameContainer
  // res.send(req.body.nicknameContainer + " " + req.body.secretCodeContainer);
  res.redirect('/loteria/' + req.body.secretCodeContainer);
});

// game variable related
router.get('/removeGame/:gameID', function(req, res, next) {
  if (req.user) {
    var userID = req.session.user_id;
    var gameID = req.params.gameID;
    removeGameFromUser(gameID, userID, function(err, doc) {
      if (err) {
        req.session.error = err;
        res.send("error removing game from user");
      }
      else {
        req.session.success = "successfully removed game";
        res.send('success');
      }
    });
  } else {
    req.session.error = 'invalid user';
    res.send('error');
  }
});

router.get('/nextCard/:gameID.json', function(req, res, next) {
  if (req.user) {
    var userID = req.session.user_id;
    var gameID = req.params.gameID;
    console.log('searching for: ' + gameID);
    //return only the game matching the id
    User.findOne({'games.gameID': gameID}, {"games.$.deck" : 1}, function(err, doc) {
      if (err) { res.send({error: err}); }
      console.log(err);
      console.log("doc");
      console.log(doc);

      // increment turn
      User.findOneAndUpdate({'games.gameID': gameID},
                  {$inc: {'games.$.turn': 1}},
                  function(err, result) {
                    console.log('--inc turn result');
                    console.log(err);
                    console.log(result);
                    var deck = doc['games'][0]['deck'];
                    var turn = doc['games'][0]['turn'];
                    console.log(deck);
                    console.log(turn);
                    res.send({error: null, turn: turn});
                  });

    });
  } else {
    res.send({error: 'error: action not valid'});
  }
});

router.get('/deck/:gameID.json', function(req, res, next) {
  var gameID = req.params.gameID;
  console.log('searching for: ' + gameID);
  //return only the game matching the id
  User.findOne({'games.gameID': gameID}, {"games.$.deck" : 1}, function(err, doc) {
    if (err) { res.send({error: err}); }
    console.log(err);
    console.log("doc");
    console.log(doc);
    var deck = doc['games'][0]['deck'];
    var turn = doc['games'][0]['turn'];
    console.log(deck);
    // doc.games[gameID]
    res.send({error: null, deck: deck, turn: turn});
  });
});

router.get('/newDeck/:gameID', function(req, res, next) {
  if (req.user) {
    var userID = req.session.user_id;
    var gameID = req.params.gameID;
    var newDeck = generateDeck(deckSize);

    // test callback using
    // saveDeckToGame(gameID, function);
    saveDeckToGame(gameID, userID, newDeck, function(err, doc) {
      if (err) {
        req.session.error = err;
        res.send("error with adding new deck to game: " + err);
      }

      // n indicates how many documents where selected for update
      if (doc.n == 0) {
        req.session.error = "game not valid (doesn't exist or user is not the owner): " + gameID;
        res.send("game not valid (doesn't exist or user is not the owner): " + gameID);
      }
      else if (doc.nModified == 0) {
        req.session.error = "didn't change values for: " + gameID;
        res.send("didn't change values for: " + gameID);
      }
      else {
        req.session.success = "created new deck for game: " + gameID;
        res.send({deck: newDeck});
      }
    });

  } else {
    req.session.error = 'invalid user';
    res.send('error');
  }
});

router.get('/dealGame/:gameID', function(req, res, next) {
  // anyone who typed a nickname
  if (req.user) {
    var gameID = req.params.gameID;
    var userID = req.session.user_id;
    console.log('gameID: ' + gameID);

    // get the game from the db only if the user created it
    User.findOne({"userID": userID, "games.gameID": gameID }, function (err, user) {
      console.log(err);
      console.log('user');
      console.log(user);
      if (err) {
        console.log('err');
        req.session.error = "Error when finding userID in dealGame";
        res.redirect('/monitor');
      }
      if (user) {
        // success
        res.render('loteria', {gameID: gameID, dealer: true});
      } else {
        req.session.error = "Game doesn't exist";
        res.redirect('/monitor');
      }

    });
  } else {
    res.redirect('/');
    // res.send('no nickname');
  }

});


router.get('/loteria/:gameID', function(req, res, next) {
  // anyone who typed a nickname
  if (req.session.nickname) {
    var gameID = req.params.gameID;
    var nickname = req.session.nickname;
    console.log('nickname: ' + nickname);
    console.log('gameID: ' + gameID);

    // get the game from the db
    User.findOne({"games.gameID": gameID}, {"games.$.deck": 1}, function (err, doc) {
      console.log(err);
      if (err) {
        console.log('err');
        req.session.error = "Error when finding docID in create";
        res.redirect('/join');
      }
      if (doc) {
        console.log("loteria get (doc):");
        console.log(doc);
        var boardLayout = doc.games[0]['boardLayout'];
        res.render('loteria', {gameID: gameID, nickname: nickname, boardLayout: boardLayout});
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
