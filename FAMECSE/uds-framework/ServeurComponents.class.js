const http = require('http');
/**
 * @class ServeurComponents
 * @param {http.IncomingMessage} _req
 * @param {http.ServerResponse} _resp
 * @param {http} _http
 */
const ServeurComponents = module.exports = function (_req, _resp, _http) {
	this._$reqObject = _req;
	this._$respObject = _resp;
	this._$httpObject = _http;
	// res.writeHead(200, { "Content-Type": "text/json" });
	this._$reqObject.postData = "";
	global.serveurComponentsObject = this;
	this._$reqObject.on('data', function (data) {
		global.serveurComponentsObject._$reqObject.postData += data;
		// console.log(data);
		// Too much POST data, kill the connection!
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (global.serveurComponentsObject._$reqObject.postData.length > 1e6)
			global.serveurComponentsObject.serveurComponents._$reqObject.connection.destroy();
	});
	// res.end('{ "changed":' + count + '}');
	this._$reqObject.on('end', function () {
		const Frontend = require('../../Applications/Frontend/FrontendApplication.class');
		var frontend = new Frontend();
		const run = async () => {
			await frontend.run();
		};

		(async () => {
			await run();
		})();
	});
	// res.end("outXmlString Me");
	// res.end(manager.readFile("./vues-test/index.xml"));
}