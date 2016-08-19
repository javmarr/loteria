var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loteria/:gameID', function(req, res, next) {
  var gameID = req.params.gameID;
  console.log(gameID);
  res.render('loteria', { gameID: gameID});
});

module.exports = router;
