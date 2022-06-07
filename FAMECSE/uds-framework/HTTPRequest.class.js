const ApplicationComponent = require("uds-framework/ApplicationComponent.class");
const url = require('url');
const querystring = require('querystring');
/**
 * @class HTTPRequest
 * @param {Application} app 
 */
const HTTPRequest = module.exports = function (app) {
	ApplicationComponent.call(this, app);

	this.serveurComponents = global.serveurComponentsObject;

	this.cookieData = function (key) {
		return "";
	}

	this.cookieExists = function (key) { return }
	this.setAttribute = function (key) { return }
	this.getAttribute = function (key) { return }

	this.getData = function (key) {
		var params = querystring.parse(url.parse(this.serveurComponents._$reqObject.url).query);
		params = this.mergeArrays(global._$params, params);

		return params[key] !== undefined ? params[key] : null;
	}

	this.method = function () {
		return this.serveurComponents._$reqObject.method;
	}

	this.postData = function (key) {
		var body = this.serveurComponents._$reqObject.postData;

		var post = querystring.parse(body);
		post = Object.keys(post).shift();
		if (post !== undefined) {
			post = JSON.parse(post);
		}
		else post = [];

		return post[key] !== undefined ? post[key] : null;
	}

	this.postExists = function (key) {
		var body = this.serveurComponents._$reqObject.postData;

		var post = querystring.parse(body);
		return post[key] !== undefined;
	}

	this.getParam = function (key) {
		return this.getData(key) !== null ? this.getData(key) : this.postData(key);
	}

	this.getParams = function () {
		var params = querystring.parse(url.parse(this.serveurComponents._$reqObject.url).query);
		params = this.mergeArrays(global._$params, params);

		var body = this.serveurComponents._$reqObject.postData;
		var post = querystring.parse(body);
		post = Object.keys(post).shift();
		if (post !== undefined) {
			// console.log(post);
			// console.log(JSON.parse(post));
			params = this.mergeArrays(params, JSON.parse(post));
		}
		// console.log(post);
		return params;
	}

	this.fileData = function (key) { return }
	this.fileExists = function (key) { return }
	this.getUpFile = function (key) { return }
	this.forward = function (key) { return }
	this.getParamNames = function (key) { return }
	this.postParamNames = function (key) { return }
	this.paramNames = function (key) { return }
	this.paramValues = function (key) { return }

	/**
	 * @returns {String}
	 */
	this.requestURI = function () {
		return url.parse(this.serveurComponents._$reqObject.url).pathname;
	}
}