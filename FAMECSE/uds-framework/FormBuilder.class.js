const Managers = require("uds-framework/Managers.class");
const Entity = require("uds-framework/Entity.class");
const Form = require("uds-framework/Form.class");
/**
 * @abstract @class
 * @param {Managers} managers 
 * @param {Entity} entity 
 * @param {Array} options 
 */
const FormBuilder = module.exports = function (managers, entity, options = {}) {
	this._$form;
	this._$options = options;
	this._$managers = managers;

	/**
	 * @abstract @function
	 */
	this.build = function () { }

	/**
	 * @param {Form} form 
	 */
	this.setForm = function (form) {
		this._$form = form;
	}

	/**
	 * @returns Form
	 */
	this.form = function () {
		return this._$form;
	}

	this.setForm(new Form(entity));
}