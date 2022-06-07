const Application = require('uds-framework/Application.class');
/**
 * @class
 */
const FrontendApplication = module.exports = function () {
	Application.call(this);
	this._$name = "Frontend";
}