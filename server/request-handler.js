/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const messages = require('./Storage');
const URL = require('url').parse;
const _ = require('lodash');
const fs = require('fs');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept,',
  'access-control-max-age': 10 // Seconds.
};

const postHandler = (message) => {
  message.createdAt = new Date();
  message.objectId = Math.floor(Math.random() * 1000000);
  console.log(message);
  messages.results.push(message);
  // fs.readFile('messages.json', (err, stored) => {
  //   let messages = JSON.parse(stored);
  //   messages.push(message);
  //   let data = JSON.stringify(messages);
  //   fs.writeFile('messages.json', data, (err) => {
  //     if (err) console.log(err);
  //     console.log('Successfully Written to File');
  //     response.writeHead(statusCode, headers);
  //     response.end(responseBody);
  //   })
  // });
};



var requestHandler = function(request, response) {
  var statusCode;  
  const url = URL(request.url);
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  let responseBody = 'Hello, World!';
  // console.log(request.url);
  // console.log(request.method);

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  if (url.pathname === '/classes/messages') {
    if (request.method === 'POST') {
      // console.log(request, '\n*******************\n')
      request.on('data', function(chunk) {
        // console.log('Received body data:');
        // console.log(chunk.toString());
        postHandler(JSON.parse(chunk));
        // console.log(messages);
        // response.writeHead(statusCode, headers);
        // response.end(responseBody);
      });
      responseBody = '{"message":"post received"}';
      statusCode = 201;
    } else if (request.method === 'GET') {
      statusCode = 200;
      // fs.readFile('messages.json', (err, stored) => {
      //   console.log(stored);
      //   stored = JSON.parse(stored);
      //   console.log(stored);
      //   let results = _.sortBy(stored, ['createdAt']).reverse();
      //   responseBody = JSON.stringify({results: stored});
      //   response.writeHead(statusCode, headers);
      //   response.end(responseBody);
      // })
      let results = _.sortBy(messages.results, ['createdAt']).reverse();
      responseBody = JSON.stringify({results});
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      responseBody = '{"Messages": "/classes/messages"}';
    } else {
      statusCode = 400;
      responseBody = JSON.stringify({Error: "Currently only accepting GET and POST requests"});
    }
  } else {
    statusCode = 404;
    responseBody = 'Not found';
  }

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // console.log(statusCode);
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(responseBody);
};


module.exports.requestHandler = requestHandler;
