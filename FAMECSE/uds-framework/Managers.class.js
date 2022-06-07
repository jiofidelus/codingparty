const PObject = require('uds-framework/PObject.class');
/**
 * @class Managers
 * @param {String} api 
 * @param {Application} api 
 */
const Managers = module.exports = function (api, dao) {
	PObject.call(this);
	this._$api = api;
	this._$dao = dao;
	this._$table = '';
	// console.log(dao);
	this._$classeTable = '';
	this._$namespace = '';
	this._$managers = new Map();

	this.initTable = function () {
		var root = "Manager_" + this._$api;
		var className = this.className().replace(root, "");
		console.log(className);
		this._$classeTable = className;
	}

	this.getManagerOf = function (module) {
		if (!this._$managers.has(module)) {
			var cManager = require("../../AppliLib/Models/" + module + "Manager_" + this._$api + ".class");
			this._$managers.set(module, new cManager(this._$api, this._$dao));
		}

		return this._$managers.get(module);
	}

	this.dao = function () {
		return this._$dao;
	}

	this.classeTable = function () {
		// this.initTable();
		return this._$classeTable;
	}

	this.initTable();
}