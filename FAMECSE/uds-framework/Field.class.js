const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 * @param {Object} options
 */
const Field = module.exports = function (options = {}) {
	PObject.call(this);

	this._$errorMessage = "";
	this._$label = "";
	this._$placeholder = "";
	this._$name;
	this._$validators = [];
	this._$value = "";
	this._$length = "";
	this._$icon = "";
	this._$class = "";
	this._$disable = "";

	/**
	 * @abstract @function
	 */
	this.buildWidget = function () { }

	this.hydrate = function (options) {
		for (const type in options) {
			const method = 'set' + type.charAt(0).toUpperCase() + type.slice(1);
			if (Object.hasOwnProperty.call(this, method)) {
				const value = options[type];
				this[method](value);
			}
		}
	}

	this.isValid = function () {
		for (const key in this._$validators) {
			if (Object.hasOwnProperty.call(this._$validators, key)) {
				const validator = this._$validators[key];
				if (!validator.isValid(this._$value)) {
					this._$errorMessage = validator.errorMessage();
					return false;
				}
			}
		}
		return true;
	}

	this.errorBuildMessage = function () {
		var widget = "";
		if (this._$errorMessage.toString().trim() != '') {
			widget += '<label class="label label-warning">';
			widget += this._$errorMessage;
			widget += '</label>';
		}
		return widget;
	}

	this.label = function () {
		return this._$label;
	}

	this.length = function () {
		return this._$length;
	}

	this.name = function () {
		return this._$name;
	}

	this.validators = function () {
		return this._$validators;
	}

	this.value = function () {
		return typeof this._$value === "string" ? this._$value : "";
	}

	this.getIcon = function () {
		return this._$value;
	}

	this.placeholder = function () {
		return this._$placeholder;
	}

	this.class = function () {
		return this._$class;
	}

	this.disable = function () {
		return this._$disable;
	}

	this.setLabel = function (label) {
		this._$label = label;
	}

	this.setLength = function (length) {
		length = parseInt(length);
		if (length > 0) {
			this; _$length = length;
		}
	}

	this.setName = function (name) {
		if (typeof name === 'string') {
			this._$name = name
		}
	}

	this.setValidators = function (validators) {
		for (let i = 0; i < validators.length; i++) {
			const validator = validators[i];
			// console.log();
			if (validator.constructor.name.indexOf("Validator") !== -1) {
				this._$validators.push(validator);
			}
		}
	}

	this.setValue = function (value) {
		this._$value = value;
	}

	this.setIcon = function (icon) {
		if (typeof icon === "string") {
			this._$icon = icon;
		}
	}

	this.setPlaceholder = function (placeholder) {
		if (typeof placeholder === "string") {
			this._$placeholder = placeholder;
		}
	}

	this.setClass = function (_class) {
		if (typeof _class === "string") {
			this._$class = _class;
		}
	}

	this.setDisable = function (disable) {
		if (typeof disable === "string") {
			this._$disable = disable;
		}
	}

	this.hydrate(options);
}	