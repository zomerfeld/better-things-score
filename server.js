const http = require('http')
const fs = require('fs');
const url = require('url') ;

const port = 3000
const weighting = fs.readFileSync('weighting.html', 'utf8');
const results = fs.readFileSync('results.html', 'utf8');
const css = fs.readFileSync('better-things.css', 'utf8');

let products = require('./products.json');
let questions = require('./questions.json');

const handleUpdate = (options) => {
  let question = questions.filter((q) => {
    return q.index == options.index;
  })[0];

  question.weight = options.weight;
}

const sendHTML = (response, html) => {
  response.end(html);
  return;
}

const sendJSON = (response, json) => {
  response.writeHead(200, {
   'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(json));
  return;
}

const sendCSS = (response, css) => {
  response.writeHead(200, {
   'Content-Type': 'text/css'
  });
  response.end(css);
  return;
}


const requestHandler = (request, response) => {
  console.log(request.url)
  if (request.url == "/weighting") {
    return sendHTML(response, weighting);
  }

  if (request.url == "/results") {
    return sendHTML(response, results);
  }

  if (request.url == "/questions") {
    return sendJSON(response, questions);
  }

  if (request.url == "/products") {
    return sendJSON(response, products);
  }

  if (request.url.startsWith("/update")) {
    handleUpdate(url.parse(request.url, true).query);
    response.end('updated');
  }

  if (request.url.startsWith("/calculate")) {
    let scores = products.map((product) => {
      let score = questions.reduce((acc, question, index) => {
        var weight = question.weight || 1;
        return acc + product.answers[question.index] * weight;
      }, product.base);

      return {
        name: product.name,
        score: score
      }
    });

    sendJSON(response, scores);
  }

  if (request.url == "/better-things.css") {
    return sendCSS(response, css);
  }

  response.end("OH NO");
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
