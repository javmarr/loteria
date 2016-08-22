
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.user) {
    console.log(req.user.displayName);
    console.log(req.user);
    res.locals.displayName = req.user.displayName;
  }
  returnToURL = "https://javmarr.auth0.com/v2/logout?federated&returnTo=url_encode(https://javmarr.auth0.com/logout?returnTo=http://www.example.com)&access_token=[facebook access_token]"

  res.render('index', { DOMAIN: process.env.DOMAIN, CLIENT_ID: process.env.CLIENT_ID, REDIRECT_URL: process.env.CALLBACK_URL, returnToURL: returnToURL});
});

router.get('/create', function(req, res, next) {
  if(req.user) {
    res.render('create', {displayName: req.session.user.displayName});
  }
  res.redirect('/');
});

router.get('/loteria/:gameID', function(req, res, next) {
  var gameID = req.params.gameID;
  console.log(gameID);
  if(req.user) {
    res.render('loteria', { gameID: gameID});
  }
  res.redirect('/');
});

module.exports = router;
