const Field = require("uds-framework/Field.class");
const Entity = require("uds-framework/Entity.class");
/**
 * @abstract @class
 */
const Form = module.exports = function (entity, file_upload = "") {
	this._$entitty;
	this._$fields = [];
	this._$fileUpload;

	/**
	 * @param {Field} field 
	 */
	this.add = function (field) {
		var
			attrib = field.name(),
			value = null;

		if (this._$entitty[attrib] !== undefined) {
			value = this._$entitty[attrib]();
		}

		field.setValue(value);
		this._$fields.push(field);
		return this;
	}

	this.createView = function () {
		var view = "";
		for (const key in this._$fields) {
			if (Object.hasOwnProperty.call(this._$fields, key)) {
				const field = this._$fields[key];
				view += '<div class="col-12 mb-3">';
				view += field.buildWidget();
				view += '</div>';
			}
		}
		return view;
	}

	this.isValid = function () {
		var valid = true;
		for (const key in this._$fields) {
			if (Object.hasOwnProperty.call(this._$fields, key)) {
				const field = this._$fields[key];
				if (!field.isValid()) {
					valid = false;
				}
			}
		}
		return valid;
	}

	/**
	 * @returns Entity
	 */
	this.entity = function () {
		return this._$entitty;
	}

	/**
	 * 
	 * @param {Entity} entity 
	 */
	this.setEntity = function (entity) {
		this._$entitty = entity;
	}

	this.setEntity(entity);
}