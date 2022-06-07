const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 */
const Validator = module.exports = function Validator(errorMessage) {
	PObject.call(this);
	this._$errorMessage;

	/**
	 * @abstract
	 * @param {String} value 
	 */
	this.isValid = function (value) { }

	this.setErrorMessage = function (errorMessage) {
		this._$errorMessage = errorMessage.toString();
	}

	this.errorMessage = function () {
		return this._$errorMessage;
	}

	this.setErrorMessage(errorMessage);
}