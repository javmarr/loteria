#!/bin/env node
var debug = require('debug')('server');
var app = require('./app');
var http = require('http');

// Removed 'SIGPIPE' from the list - bugz 852598.
var signals = [
  'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
  'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM',
];

function normalizePort(val) {
  var parsed = parseInt(val, 10);
  if (isNaN(parsed)) return val;
  if (parsed >= 0) return parsed;
  return false;
}

var ipaddress = process.env.HOST || '0.0.0.0';
var port = normalizePort(process.env.PORT || 5000);

function terminator(signal) {
  if (!signal) {
    debug(new Date() + ': Node server stopped.');
  } else {
    debug(new Date() + ': Received' + signal + ' - terminating sample app ...');
    process.exit(1);
  }
}

process.on('exit', function () {terminator()});
signals.forEach( function (signal) {process.on(signal, terminator.bind(null, signal))});

var server = http.createServer(app);
app.io.attach(server);

server.listen(port, ipaddress, function () {
  debug(new Date() + ': Node server started on ' + ipaddress + ':' + port + ' ...');
});

server.on('error', function (error) {
  if (error.syscall !== 'listen') throw error;

  var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      debug(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', function () {debug('Server on port: ' + server.address().port)});
