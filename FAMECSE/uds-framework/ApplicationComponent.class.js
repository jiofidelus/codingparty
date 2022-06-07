const PObject = require("uds-framework/PObject.class");
/**
 * @class ApplicationComponent
 * @param {Application} app 
 */
const ApplicationComponent = module.exports = function (app) {
	PObject.call(this);
	this._$app = app;

	this.app = function () {
		return this._$app;
	}
}