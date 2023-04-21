
var express = require('express');
var router = express.Router();




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
  
  res.render('index', { DOMAIN: process.env.DOMAIN, CLIENT_ID: process.env.CLIENT_ID, REDIRECT_URL: process.env.CALLBACK_URL, returnToURL: returnToURL});
});

router.get('/join', function(req, res, next) {
    res.render('join');
});

router.post('/join', function(req, res, next) {
  res.render('join');
});

router.post('/loteria', function(req, res, next) {
  res.render('loteria', {gameID:'dummyid', nickname:'visitante', boardLayout:'fullboard'});
});

module.exports = router;
