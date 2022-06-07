const Entity = require('uds-framework/Entity.class');
const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 * @param {Entity} entity
 */
const Entity_NEO4J = module.exports = function (entity) {
	PObject.call(this);
	this._$entity = entity;

	this.entityListqlSave = function () {
		var properties = this._$entity.properties();
		var classeName = this._$entity.className();

		var result = 'MERGE (a:' + classeName + '{';

		for (const prop in properties) {
			if (Object.hasOwnProperty.call(properties, prop)) {
				const value = properties[prop];
				result += prop.slice(2) + ':"' + value + '",';
			}
		}
		const dateNow = this.currentStringDate();
		result += 'dateInsert: "' + dateNow + '"}) ON CREATE SET a.id = ID(a) RETURN a.id AS id;';
		return result;
	}

	this.entitiesqlAddAssociation = function (entityFrom, entityTo) {
		// var bodyQLFrom = this._$cypherBodyQL(entityFrom);
		// var bodyQLTo = this._$cypherBodyQL(entityTo);
		var bodyQLAssoc = this._$cypherBodyQLInner(this._$entity);

		// var classeName = this._$entity.className();
		var classeNameFrom = entityFrom.className();
		var classeNameTo = entityTo.className();

		var result = "MERGE (j:" + classeNameFrom + " {id: '" + entityFrom.id() + "'})-[r:" + bodyQLAssoc + "]->(m:" + classeNameTo + " {id: '" + entityTo.id() + "'})";
		return result;
	} 
	

	this._$cypherBodyQL = function (entity) {
		var properties = entity.properties();
		var classeName = entity.className();

		var result = '(a:' + classeName + '{';

		for (const prop in properties) {
			if (Object.hasOwnProperty.call(properties, prop)) {
				const value = properties[prop];
				result += prop.slice(2) + ':"' + value + '",';
			}
		}
		const dateNow = this.currentStringDate();
		result += 'dateInsert: "' + dateNow + '"})';
		return result;
	}

	this._$cypherBodyQLInner = function (entity) {
		var properties = entity.properties();
		var classeName = entity.className();

		var result = classeName + '{';

		for (const prop in properties) {
			if (Object.hasOwnProperty.call(properties, prop)) {
				const value = properties[prop];
				result += prop.slice(2) + ':"' + value + '",';
			}
		}
		const dateNow = this.currentStringDate();
		result += 'dateInsert: "' + dateNow + '"}';
		return result;
	}

}