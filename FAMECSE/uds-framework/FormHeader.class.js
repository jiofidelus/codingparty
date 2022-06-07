const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 */
const FormHeader = module.exports = function (request, entity) {
	PObject.call(this);
	this._$request = request;
	this._$entity = entity;
	// console.log(entity);
	/**
	 * @returns Array
	 */
	this.dataForm = function () {
		const properties = this._$entity.propertiesNames();
		var data = {};

		for (let i = 0; i < properties.length; i++) {
			const name = properties[i];
			data[name.slice(2)] = request.getParam(name.slice(2));
			// console.log(name.slice(2));
		}
		// console.log(request.getParams());
		// console.log(data);
		return data;
	}

	/**
	 * @returns Entity
	 */
	this.entity = function () {
		this._$entity.hydrate(this.dataForm());
		return this._$entity;
	}
}