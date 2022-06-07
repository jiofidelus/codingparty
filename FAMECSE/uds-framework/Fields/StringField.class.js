const Field = require("uds-framework/Field.class");
const FieldUtilitary = require("uds-framework/FieldUtilitary.class");
/**
 * @class
 */
const StringField = module.exports = function (options = {}) {
	Field.call(this, options);
	this._$fieldUtilitary = new FieldUtilitary();

	/**
	 * @returns string
	 */
	this.buildWidget = function () {
		const widget = this.errorBuildMessage();
		return widget + "" + this._$fieldUtilitary.motifInput(this.name(), this._$fieldUtilitary._$$TYPE_TEXT, this.value(), this.class(), this.label(), this.placeholder(), this.disable());
	}

}