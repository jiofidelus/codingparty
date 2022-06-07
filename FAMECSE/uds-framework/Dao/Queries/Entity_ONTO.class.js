const Entity = require('uds-framework/Entity.class');
const PObject = require('uds-framework/PObject.class');
/**
 * @abstract @class
 * @param {Entity} entity
 */
const Entity_ONTO = module.exports = function (entity) {
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

	this.entityqlGetList = function () {
		var classeName = this._$entity.className();

		var result = this.prefixHeader() + " ";
		result += "select ?id ?a ?v ";
		result += "where { ";
		result += "?id rdfs:domain entity:" + classeName + ". ";
		result += "?id ?a ?v. ";
		result += "FILTER(STRSTARTS(STR(?id), \"http://example/framework/entity/instance/\")). ";
		result += "FILTER(STRSTARTS(STR(?a), \"http://example/framework/entity/atributs/\")). ";
		result += "}";

		return result;
	}

	this.entityqlGetUnique = function () {
		var classeName = this._$entity.className();

		var result = this.prefixHeader() + " ";
		result += "select ?id ?a ?v ";
		result += "where { ";
		result += "?id rdfs:domain entity:" + classeName + ". ";
		result += "?id ?a ?v. ";
		result += "FILTER(STRSTARTS(STR(?id), \"http://example/framework/entity/instance/" + this._$entity.id() + "\")). ";
		result += "FILTER(STRSTARTS(STR(?a), \"http://example/framework/entity/atributs/\")). ";
		result += "}";

		return result;
	}

	this.entityListqlSaveTab = function () {
		var properties = this._$entity.properties();
		var classeName = this._$entity.className();
		var uniq = (new Date()).getTime();

		var result = [
			this.prefixHeader() + " INSERT DATA { instance:" + uniq + " rdf:type rdfs:Class.}",
			this.prefixHeader() + " INSERT DATA { instance:" + uniq + " rdfs:domain entity:" + classeName + ".}",
		];

		for (const prop in properties) {
			if (Object.hasOwnProperty.call(properties, prop)) {
				const value = properties[prop];
				result.push(
					this.prefixHeader() + " INSERT DATA { instance:" + uniq + " atrib:" + prop.slice(2) + " '" + value + "'. }"
				)
			}
		}

		const dateNow = this.currentStringDate();
		result.push(
			this.prefixHeader() + " INSERT DATA { instance:" + uniq + " atrib:dateInsert '" + dateNow + "'. }"
		);

		this._$entity.setId(uniq);
		return result;
	}

	this.prefixHeader = function () {
		return `
		PREFIX entity: <http://example/framework/entity/> 
		PREFIX atrib: <http://example/framework/entity/atributs/> 
		PREFIX instance: <http://example/framework/entity/instance/> 
	  `;
	}

}