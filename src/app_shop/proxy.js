var proxy = require('http-proxy').createProxyServer({});

proxy.on(function(err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
});

var server = require('http').createServer(function(req, res) {
  var host = req.headers.host;
  console.log(host);
  switch (host) {
    case 'www.koacrab.wl':
      proxy.web(req, res, {
        target: 'http://127.0.0.1:1866/'
      });
      break;
    case 'koacrab.wl':
      proxy.web(req, res, {
        target: 'http://127.0.0.1:1866/'
      });
      break;
    default:
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Welcome to my server!');
  }
});

console.log("listening on port 80");
server.listen(80);
