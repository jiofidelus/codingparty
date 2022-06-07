const FormHandler = require("uds-framework/FormHandler.class");
/**
 * @abstract @class
 */
const FormHandlerFactory = module.exports = function (managers, entity, request, options = {}) {
	this._$managers = managers;
	this._$request = request;
	this._$entity = entity;

	this._$options = options;
	this._$form = null;
	this._$formHandler = null;

	this.build = function () {
		const classeName = this._$entity.className().charAt(0).toUpperCase() + this._$entity.className().slice(1);
		var builder = '../../AppliLib/FormBuilder/' + classeName + 'FormBuilder.class';
		var cClass = require(builder);

		const formBuilder = new cClass(this._$managers, this._$entity, this._$options);
		formBuilder.build();

		this._$form = formBuilder.form();
		this._$formHandler = new FormHandler(this._$form, this._$managers.getManagerOf(classeName), this._$request);
	}

	this.formHandler = function () {
		return this._$formHandler;
	}
}