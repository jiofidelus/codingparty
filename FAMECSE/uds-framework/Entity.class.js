const ArrayEntity = require('uds-framework/ArrayEntity.class');
const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 */
const Entity = module.exports = function (donnees) {
	ArrayEntity.call(this, donnees);
	this._$id = null;

	this.id = function () {
		return this._$id;
	}

	this.setId = function (id) {
		return this._$id = id;
	}

	this.isNew = function () {
		// console.log();
		return parseInt(this._$id) + "" == "NaN" || parseInt(this._$id) < 1;
	}

	this.arrayDescriptions = function () {

	}

	this.arrayDescriptions = function () {

	}

	this.propertiesNames = function () {
		var result = [], i = 0;
		const properties = Object.keys(this);

		for (const key in properties) {
			if (Object.hasOwnProperty.call(properties, key)) {
				const propertyName = properties[key];
				if (!this.isFunction(this[propertyName]) && i++ > 4) {
					// console.log(typeof propertyName);
					result.push(propertyName);
				}
			}
		}

		return result;
	}
}