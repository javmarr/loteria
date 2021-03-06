/*
TODO:
  WORK ON TURNS ($INC)
  RESET WHEN MAKING NEW deck
  USE JAVASCRIPT TO CHANGE CANVAS
  BOARD GENERATION WHEN JOINING games
  VIEW FOR "DEALER"
  boards have nickname
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var socketio = require('socket.io');

var passport = require('passport');
var strategy = require('./setup-passport');

var Auth0Strategy = require('passport-auth0');

// variables for client/host management
var debug = false;
var timeOutDelay = 2500;
var maxPlayers = 4; // per game
if (debug) {
    maxPlayers = 2;
}

var clientPlayers = {};
var clients = {};
var hosts = {};
var games = [];

// db connection
var mongoose = require('mongoose');
const MONGO_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST;
const MONGO_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT;
const MONGO_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
const DB_NAME = 'loteria';

if(MONGO_HOST) {
  mongoose.connect('mongodb://admin:' + MONGO_PASSWORD + '@' + MONGO_HOST + ':' + MONGO_PORT + '/' + DB_NAME);
}
else {
  require('dotenv').config();
  mongoose.connect('mongodb://localhost/' + DB_NAME);
}
var app = express();


// io setup
var server = require('http').Server(app);
var io = global.io = app.io = socketio();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.CLIENT_SECRET, resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.get('*', function(req, res, next) {
  if(req.user){
    req.session.user = req.user;
    req.session.user_id = req.session.user._json.user_id;
  }
  next();
});

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/Error' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    console.log('login worked!');
    res.redirect("/login");
  });

app.get('/login', function (req, res) {
  // req.session.user = req.user;
  res.redirect('/'); // index

});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


io.on('connection', function(socket) {

  // app.get('session').socketId = socket.getId();

  var room = io.sockets.adapter.rooms;
  console.log(room);
  console.log('--- user ' + socket.id + ' connected ---');

  console.log('room length' + room.length);

  // socket for each session
  // get socket from saved socket_id


  socket.on('join', function(data) {
    console.log('Client says: ' + data);

  });

  socket.on('chat message', function(msg) {
    // send to everyone except the one who started it
    socket.broadcast.emit('chat message', msg);
    console.log('>' + msg);
  });

  socket.on('disconnect', function() {
    console.log('-- user disconnected --');
  });
});








module.exports = app;
