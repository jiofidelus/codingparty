const Validator = require('uds-framework/Validator.class');
/**
 * @class
 */
const NotNullValidator = module.exports = function NotNullValidator(errorMessage) {
	Validator.call(this, errorMessage);
	this._$id = null;

	this.isValid = function (value) {
		// console.log(value);
		// console.log(!this.emptyString(value));
		return !this.emptyString(value);
	}

}