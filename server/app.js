/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
// Using Cloudant
require('dotenv').load();
var Cloudant = require('cloudant');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Load Cloudant Library
// Load the Cloudant library.
// var Cloudant = require('cloudant');

// Initialize Cloudant with settings from .env
var cUsername = process.env.cloudant_username || "nodejs";
var cPassword = process.env.cloudant_password;
var cApikey = process.env.cloudant_apikey;
// Initialize the library with my account.
console.log('Cloudand credentials. Username: ',cUsername, ' Password: ' ,cPassword)
var cloudant = Cloudant({account:cUsername, key:cApikey, password:cPassword});

// cloudant.db.list(function(err, allDbs) {
//   console.log('All my databases: %s', allDbs.join(', '))
// });
// Remove any existing database called "alice".
cloudant.db.destroy('alice', function(err) {

  // Create a new "alice" database.
  cloudant.db.create('alice', function() {

    // Specify the database we are going to use (alice)...
    var alice = cloudant.db.use('alice')

    // ...and insert a document in it.
    alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
      if (err) {
        return console.log('[alice.insert] ', err.message);
      }

      console.log('You have inserted the rabbit.');
      console.log(body);
    });
  });
});

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    socketio.on('connection', function(socket){
      socket.emit('info',{hello: 'world'})
      socket.on('client', function(data){
        console.log('data in client channel', data)
      })
    })
    console.log('Process.Env.Port is: ', process.env.PORT, 'Other Process.Env K/V ',process.env.cloudant_username)
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
