var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/game/:num', function(req, res, next) {
  console.log(req.params.num);
  res.render('game', { gameFile: ('game'+req.params.num+'.js')});
});

module.exports = router;
