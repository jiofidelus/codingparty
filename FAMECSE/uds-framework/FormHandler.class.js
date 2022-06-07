const Form = require("uds-framework/Form.class");
const HTTPRequest = require("uds-framework/HTTPRequest.class");
const Managers_api = require("uds-framework/Managers_api.class");
/**
 * @abstract @class
 */
const FormHandler = module.exports = function (form, managers, httpRequest) {
	this._$form;
	this._$manager;
	this._$request;

	/**
	 * @returns bool
	 */
	this.process = async function () {
		if (this._$request.method() == 'POST' && this._$form.isValid()) {
			// console.log("PROCESSSSSSSSSSS");
			await this._$form.entity().setId(this._$manager.save(this._$form.entity()));
			return true;
		}

		return false;
	}

	this.setForm = function (form) {
		this._$form = form;
	}

	this.setManager = function (manager) {
		this._$manager = manager;
	}

	this.setRequest = function (request) {
		this._$request = request;
	}

	/**
	 * 
	 * @returns @returns Form
	 */
	this.form = function () {
		return this._$form;
	}

	this.setManager(managers);
	this.setForm(form);
	this.setRequest(httpRequest);
}