/**
 * @class Route
 */
const Route = module.exports = function (url, module, action, varsNames, vars = []) {
	this._$url = url;
	this._$module = module;
	this._$action = action;
	this._$varsNames = varsNames;
	this._$vars = vars;

	this.match = function (url) {
		var regex = new RegExp("^" + this._$url.replace(/\//g, '\\\/') + "$");
		// var regexO = new RegExp("^\/$");
		// console.log(this._$url.replace(/\//g, '\\\/'));
		// console.log(this._$url);
		if (regex.test(url)) {
			// console.log(regex.exec(url));
			return regex.exec(url);
		}
		return false;
	}

	this.hasVars = function () {
		return this._$varsNames.length > 0;
	}

	this.url = function () {
		return this._$url;
	}

	this.module = function () {
		return this._$module;
	}

	this.action = function () {
		return this._$action;
	}

	this.vars = function () {
		return this._$vars;
	}

	this.varsNames = function () {
		return this._$varsNames;
	}

	this.setVars = function (vars) {
		this._$vars = vars;
	}
}