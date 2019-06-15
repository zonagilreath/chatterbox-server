const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const messages = require('./Storage');
const URL = require('url').parse;
const _ = require('lodash');
const fs = require('fs');

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json())


var port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/classes/messages', (req, res) => {
  fs.readFile(path.join(__dirname, 'storage.json'), 'utf-8', (err, data) => {
    let messages = JSON.parse(data);
    const results = _.sortBy(messages.results, ['createdAt']).reverse();
    res.send(JSON.stringify({results}));
  });
});

app.post('/classes/messages', (req, res) => {
  fs.readFile(path.join(__dirname, 'storage.json'), 'utf-8', (err, data) => {
    // console.log('reading from file:  ---->', data);
    const messages = JSON.parse(data);
    const newMessage = req.body;
    newMessage.createdAt = new Date();
    newMessage.objectId = Math.floor(Math.random() * 10000000);
    messages.results.push(newMessage);
    const writeData = JSON.stringify(messages);
    fs.writeFile(path.join(__dirname, 'storage.json'), writeData, 'utf-8', (err) => {
      if(err) console.log(error);
      res.send(JSON.stringify({message: "message posted!"}));
    })
  });
  
  
});

app.listen(port, () => console.log(`Chattebox app listening on port ${port}!`))