const PObject = require('uds-framework/PObject.class');
const HTTPRequest = require('uds-framework/HTTPRequest.class');
/**
 * @abstract @class
 * @param {HTTPRequest} request
 */
const FormHeaderFactory = module.exports = function (request) {
	PObject.call(this);
	this._$request = request;

	this.get = function (classeName) {
		const build = "../../AppliLib/FormHeaders/" + classeName + "FormHeader.class";
		const entity = "../../AppliLib/Entities/" + classeName + ".class";

		const buildClass = require(build);
		const entityClass = require(entity);

		var formHeader = new buildClass(this._$request, new entityClass);
		// console.log(formHeader);
		return formHeader.entity();
	}

}