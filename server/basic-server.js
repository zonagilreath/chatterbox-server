const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const messages = require('./Storage');
const URL = require('url').parse;
const _ = require('lodash');
const fs = require('fs');

app.use('/public', express.static(path.join(__dirname, '../public')));
// const handleRequest = require('./request-handler').requestHandler;

var port = 8000;

// var ip = '127.0.0.1';

// var server = http.createServer(handleRequest);
// console.log('Listening on http://' + ip + ':' + port);
// server.listen(port, ip);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/classes/messages', (req, res) => {
  let results = _.sortBy(messages.results, ['createdAt']).reverse();
  res.send(JSON.stringify(results));
});

app.post('/classes/messages', (req, res) => {
  console.log(req);
  res.send(JSON.stringify({message: "got a post request!"}))
  // request.on('data', function(message) {
  //   message = JSON.parse(message);
  //   message.createdAt = new Date();
  //   message.objectId = Math.floor(Math.random() * 1000000);
  //   console.log(message);
  //   messages.results.push(message);
  // });
});

app.listen(port, () => console.log(`Chattebox app listening on port ${port}!`))