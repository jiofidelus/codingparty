const ServeurComponents = require('uds-framework').ServeurComponents;
const http = require('http');
const url = require('url');

var server = http.createServer(function (req, res) {
	var path = url.parse(req.url).pathname
	// res.end('{ "changed":' + count + '}');
	if (path.indexOf(".") === -1) {
		const serveurComponents = new ServeurComponents(req, res, http);

	}
});

server.listen(8086);