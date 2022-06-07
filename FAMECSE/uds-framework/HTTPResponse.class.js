const ApplicationComponent = require("uds-framework/ApplicationComponent.class");
/**
 * @class HTTPResponse
 * @param {Application} app 
 */
const HTTPResponse = module.exports = function (app) {
	ApplicationComponent.call(this, app);
	this.serveurComponents = global.serveurComponentsObject;

	this._$page = null;

	this.addHeaderAccess = function (headerAccess) {
		this.serveurComponents._$respObject.setHeader('Access-Control-Allow-Origin', headerAccess); // update to match the domain you will make the request from
		this.serveurComponents._$respObject.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
	}

	this.addHeader = function (name, value) {
		this.serveurComponents._$respObject.setHeader(name, value);
		// update to match the domain you will make the request from
	}

	/**
	 * @param {string} location 
	 */
	this.redirect = function (location) {
		this.serveurComponents._$respObject.writeHead(200, { 'Location': location });
		this.serveurComponents._$respObject.end();
	}

	this.redirect404 = function () {

	}

	this.send = function () {
		this.serveurComponents._$respObject.writeHead(200, { "Content-Type": "text/html" });
		this.serveurComponents._$respObject.end(this._$page.getGeneratedPage());
	}

	this.setPage = function (page) {
		this._$page = page;
	}

	this.page = function () {
		return this._$page;
	}

	this.setCookie = function (name, value = '', expire = 0, path = null, domain = null, secure = false, httpOnly = true) {

	}
}