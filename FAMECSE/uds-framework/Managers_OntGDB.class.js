const Managers_api = require("uds-framework/Managers_api.class");
const Entity_ONTO = require("uds-framework/Dao/Queries/Entity_ONTO.class");
const groupBy = require('lodash.groupby');
const omit = require('lodash.omit');
/**
 * @abstract @class Managers_api
 * @param {String} api 
 * @param {*} dao 
 */
const Managers_OntGDB = module.exports = function (api, dao) {
	Managers_api.call(this, api, dao);

	/**
	 * @protected @function
	 * Méthode permettant d'ajouter une entité
	 * @param {Entity} entity L'entité à ajouter
	 * @returns Int
	 */
	this._$add = async function (entity) {
		const entity_PDO = new Entity_ONTO(entity);
		// console.log(entity_PDO.entityListqlSave());
		const queries = entity_PDO.entityListqlSaveTab();

		for (var i = 0; i < queries.length; i++) {
			const result = await this.$update(queries[i]);

		}

		// console.log(Object.values(id[0]));
		return entity.id();
	}

	/**
	 * @abstract @function
	 * Méthode retournant une liste d'entités demandée
	 * @param {Int} id La première enité à selectionner
	 * @returns array La liste des entités. chaque entrée est une instance de Entity
	 */
	this.getUnique = async function (id) {
		const cEntity = require('../../AppliLib/Entities/' + this.classeTable() + '.class');
		const entity = new cEntity();
		entity.setId(id);
		// console.log(this.classeTable());
		const entity_PDO = new Entity_ONTO(entity);
		const result = await this.$query(entity_PDO.entityqlGetUnique());
		// console.log(this.$bindArrayEntity(result));
		entity.hydrate(this.$bindArrayEntity(result));
		// console.log(entity);
		return entity;
		// return 1;
	}

	/**
	 * @abstract @function
	 * Méthode retournant une liste d'entités demandée
	 * @param {Int} debut La première enité à selectionner
	 * @param {Int} limit Le nombre d'entité à selectionner
	 * @returns array La liste des entités. chaque entrée est une instance de Entity
	 */
	this.getList = async function (debut = -1, limit = -1) {
		const cEntity = require('../../AppliLib/Entities/' + this.classeTable() + '.class');
		var entity = new cEntity();
		// entity.setId(id);
		// console.log(this.classeTable());
		const entity_PDO = new Entity_ONTO(entity);
		var result = await this.$query(entity_PDO.entityqlGetList());
		// console.log(this.$bindArrayEntities(result));
		result = this.$bindArrayEntities(result);
		// entity.hydrate(this.$bindArrayEntities(result));
		// console.log(entity);
		var entities = [];
		for (const id in result) {
			if (Object.hasOwnProperty.call(result, id)) {
				// const obj = result[id];
				const entity = new cEntity();
				// console.log(result[id]);
				entity.hydrate(result[id]);
				entities.push(entity);
			}
		}
		return entities;
	}

	/**
	 * @protected @function
	 * Méthode perméttant de modifier une entité
	 * @param {Entity} entity L'entité à modifier
	 * @returns Int
	 */
	this._$modify = async function (entity) {
		// console.log("jdksj");
	}

	this.$query = async function (message) {
		try {
			let result = await this.dao()
				.query(message,
					{ transform: 'toJSON' }
				);
			// console.log(result);
			return result;
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	this.$update = async function (message) {
		// console.log(message);
		try {
			let result = await this.dao()
				.update(message,
					{ transform: 'toJSON' });
			return result;
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	this.$bindArrayEntity = function (dataQuery) {
		var
			records = dataQuery.records,
			result = {};

		for (var i = 0; i < records.length; i++) {
			var
				attribName = records[i].a.replace("http://example/framework/entity/atributs/", ""),
				attribValue = records[i].v;
			// console.log(attribName);
			result[attribName] = attribValue;
			result["id"] = records[i].id.replace("http://example/framework/entity/instance/", "");
		}

		return result;
	}

	this.$bindArrayEntities = function (dataQuery) {
		var
			records = dataQuery.records,
			result = {};

		for (var i = 0; i < records.length; i++) {
			var
				id_ = records[i].id.replace("http://example/framework/entity/instance/", ""),
				attribName = records[i].a.replace("http://example/framework/entity/atributs/", ""),
				attribValue = records[i].v;
			// console.log(attribName);
			if (result[id_] === undefined) {
				result[id_] = { id: id_ };
			}
			result[id_][attribName] = attribValue
		}

		return result;
	}

	this._$normalizeSparqlResults = (results) =>
		omit(
			groupBy(results, (x) => x.predicat.split('#')[1]),
			[
				'topObjectProperty',
				'first',
				'someValuesFrom',
				'allValuesFrom',
				'topDataProperty',
			]
		);
}